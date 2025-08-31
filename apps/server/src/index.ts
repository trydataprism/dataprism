import "dotenv/config";
import { tracking } from "./routers/tracking";
import auth from "./routers/auth";
import { Hono } from "hono";
import {
  corsMiddleware,
  loggerMiddleware,
  errorMiddleware,
  generalRateLimit,
} from "./lib/middleware";

const app = new Hono();

// Apply global middleware
app.use("*", loggerMiddleware);
app.use("*", errorMiddleware);

// Mount better-auth routes (with CORS handled in auth router)
app.route("/api", auth);

// Apply CORS middleware to non-auth routes
app.use("/api/track/*", corsMiddleware);

// Apply general rate limiting to all non-auth routes
app.use("/api/track/*", generalRateLimit);

// Mount tracking routes
app.route("/api/track", tracking);

// Static file serving will be handled separately if needed

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
