/** Asosiy profil — to'g'ri GitHub */
export const GITHUB_URL = "https://github.com/Yusufkhan05";
export const GITHUB_HANDLE = "Yusufkhan05";
export const TELEGRAM_URL = "https://t.me/YusufxonJalolxojayev";
export const EMAIL = "yusufxonjalolxojayev95@gmail.com";
export const PHONE = "+998939542524";
export const PHONE_DISPLAY = "+998 93 954 25 24";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/jalolxojayev-yusufxon/";

/** SEO — Vercel domain yoki custom domain (.env da o'zgartiring) */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://portfolio.interevolution.uz"
).replace(/\/$/, "");
export const SITE_NAME = "Jalolxojayev Yusufxon";
export const SITE_TITLE =
  "Jalolxojayev Yusufxon | Mobile Developer — Flutter, Dart, Portfolio";
export const SITE_DESCRIPTION =
  "Jalolxojayev Yusufxon — Mobil dasturchi. Flutter, Dart. Portfolio: mobil ilovalar, cross-platform loyihalar. Mobile developer portfolio.";
export const SITE_KEYWORDS = [
  "Jalolxojayev Yusufxon",
  "Mobile Developer",
  "Mobil dasturchi",
  "Flutter developer",
  "Dart developer",
  "portfolio",
  "mobil ilova",
  "cross-platform",
  "iOS",
  "Android",
  "O'zbekiston Mobile",
  "Yusufkhan05",
].join(", ");
export const SITE_LOGO = "/icon.png";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/icon.png`;

/** Web3Forms public access key (client-side OK) */
export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY ||
  "bfd7231f-54f0-4183-a53b-8d992f43ae37";

/**
 * Admin panel login (UI)
 * Login: admin
 * Parol: yusufxon2005
 * Supabase Auth ichida email sifatida saqlanadi
 */
export const ADMIN_LOGIN = "admin";
export const ADMIN_PASSWORD = "yusufxon2005";
/** Supabase haqiqiy email format talab qiladi */
export const ADMIN_AUTH_EMAIL =
  import.meta.env.VITE_ADMIN_EMAIL || "admin@jalolxojayev.dev";
