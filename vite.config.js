import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function devApiPlugin() {
  return {
    name: "dev-api-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url === "/api/contact") {
          let bodyStr = "";
          req.on("data", (chunk) => {
            bodyStr += chunk;
          });
          req.on("end", async () => {
            try {
              req.body = JSON.parse(bodyStr || "{}");
            } catch {
              req.body = {};
            }
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
              return res;
            };
            try {
              const { default: handler } = await import("./api/contact.js");
              await handler(req, res);
            } catch (err) {
              console.error("[dev-api] Error executing /api/contact:", err);
              res.status(500).json({ error: "Internal server error" });
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (env.TELEGRAM_BOT_TOKEN && !process.env.TELEGRAM_BOT_TOKEN) {
    process.env.TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
  }
  if (env.TELEGRAM_CHAT_ID && !process.env.TELEGRAM_CHAT_ID) {
    process.env.TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID;
  }

  return {
    plugins: [react(), devApiPlugin()],
    server: {
      port: 5173,
      strictPort: false,
    },
    optimizeDeps: {
      include: ["sonner", "react", "react-dom", "react-router-dom"],
    },
  };
});
