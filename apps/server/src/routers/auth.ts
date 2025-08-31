import { Hono } from "hono";
import { auth } from "../lib/auth";
import { cors } from "hono/cors";
import { CORS_CONFIG } from "../constants/cors";

const app = new Hono();

// Apply CORS using Hono's built-in CORS middleware for better compatibility
app.use(
  "*",
  cors({
    origin: (origin) => {
      if (process.env.NODE_ENV === "development") {
        // Allow any localhost origin in development
        if (origin?.includes("localhost")) return origin;
        return "http://localhost:3001"; // default fallback
      }
      return CORS_CONFIG.allowedOrigins.includes(origin || "") 
        ? origin 
        : null;
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: [
      "Content-Type",
      "Authorization", 
      "X-Requested-With",
      "X-CSRF-Token",
      "Origin",
      "Accept",
      "Cache-Control"
    ],
    credentials: true,
    maxAge: 86400,
  })
);

app.on(["POST", "GET"], "/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

export default app;
