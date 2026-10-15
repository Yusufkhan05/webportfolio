// Rate limiting map: IP -> { count, resetTime }
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Periodically clean up stale rate limit entries
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref?.();

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function handler(req, res) {
  // 1. CORS / Preflight check
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Only POST is accepted." });
  }

  // 2. Client IP & Rate limiting
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket?.remoteAddress || "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Juda ko'p so'rov yuborildi. Iltimos, 1 daqiqadan so'ng qayta urinib ko'ring." });
  }

  // 3. Parse and validate body
  const body = req.body || {};

  // Honeypot check (anti-bot)
  if (body.botcheck) {
    return res.status(200).json({ success: true, message: "OK" });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length < 1 || name.length > 100) {
    return res.status(400).json({ error: "Ism noto'g'ri kiritilgan (1-100 belgi)" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 200) {
    return res.status(400).json({ error: "Email manzili noto'g'ri kiritilgan" });
  }

  if (!subject || subject.length < 1 || subject.length > 200) {
    return res.status(400).json({ error: "Mavzu kiritilishi shart (1-200 belgi)" });
  }

  if (!message || message.length < 2 || message.length > 4000) {
    return res.status(400).json({ error: "Xabar matni kamida 2 va ko'pi bilan 4000 belgi bo'lishi kerak" });
  }

  // 4. Telegram dispatch
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[contact-api] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment variables.");
    return res.status(200).json({
      success: true,
      delivered: false,
      notice: "Telegram credentials are not set on server.",
    });
  }

  try {
    const text = [
      "🔔 <b>Yangi xabar (Portfolio)</b>",
      "",
      `👤 <b>Ism:</b> ${escapeHtml(name)}`,
      `📧 <b>Email:</b> ${escapeHtml(email)}`,
      `📌 <b>Mavzu:</b> ${escapeHtml(subject)}`,
      "",
      "💬 <b>Xabar:</b>",
      escapeHtml(message),
      "",
      `⏰ <i>${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}</i>`,
    ].join("\n");

    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const tgResponse = await fetch(tgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const tgResult = await tgResponse.json().catch(() => ({}));

    if (!tgResponse.ok || !tgResult.ok) {
      console.error("[contact-api] Telegram send failed with HTTP status:", tgResponse.status);
      return res.status(502).json({
        error: "Telegramga xabar yetkazishda xatolik yuz berdi.",
      });
    }

    return res.status(200).json({
      success: true,
      delivered: true,
      message: "Xabar muvaffaqiyatli yuborildi.",
    });
  } catch {
    console.error("[contact-api] Internal error processing request.");
    return res.status(500).json({
      error: "Xabarni jo'natishda server xatosi yuz berdi.",
    });
  }
}
