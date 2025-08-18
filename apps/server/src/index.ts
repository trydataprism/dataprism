import "dotenv/config";
import { auth } from "./lib/auth";
import { appRouter } from "./routers";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: process.env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

// Mount API routes
app.route('/api', appRouter);

// Serve static files from public folder
app.get('/tracker.js', serveStatic({ path: './public/tracker.js' }));
app.get('/test.html', serveStatic({ path: './public/test.html' }));

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
