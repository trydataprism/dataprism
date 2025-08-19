import "dotenv/config";
import { authRouter } from "./routers/auth";
import { tracking } from "./routers/tracking";
import { Hono } from "hono";
import {
  corsMiddleware,
  loggerMiddleware,
  errorMiddleware,
  generalRateLimit,
} from "./lib/middleware";

const app = new Hono();

// Apply global middleware - CORS must come first
app.use("*", corsMiddleware);
app.use("*", loggerMiddleware);
app.use("*", errorMiddleware);

// Apply general rate limiting to all non-auth routes
app.use("/api/*", generalRateLimit);

// Mount auth router with specific rate limiting
app.route("/api/auth", authRouter);

// Mount tracking routes
app.route("/api/track", tracking);

// Static file serving will be handled separately if needed

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
