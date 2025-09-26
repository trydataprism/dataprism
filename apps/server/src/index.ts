import "dotenv/config";
import { Hono } from "hono";
import {
  corsMiddleware,
  errorMiddleware,
  generalRateLimit,
} from "./lib/middleware";
import { authRouter } from "./modules/auth/routes";
import { tracking } from "./modules/tracking/routes";
import { organizationRouter } from "./modules/organization/routes";

const app = new Hono();

// Middleware
app.use("*", corsMiddleware);
app.use("*", errorMiddleware);

// Rate limiting
app.use("/api/*", generalRateLimit);

// Routes
app.route("/api/auth", authRouter);
app.route("/api/track", tracking);
app.route("/api/organizations", organizationRouter);

// Health check
app.get("/", (c) => {
  return c.text("OK");
});

export default app;
