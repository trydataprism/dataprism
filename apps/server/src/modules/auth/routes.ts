import { Hono } from "hono";
import { auth } from "../../lib/auth";
import {
  authRateLimit,
  passwordResetRateLimit,
  emailVerificationRateLimit,
  corsMiddleware,
} from "../../lib/middleware";
import { withErrorHandling } from "../../utils";

const authRouter = new Hono();

/**
 * Apply CORS middleware for all auth endpoints.
 */
authRouter.use("*", corsMiddleware);

/**
 * Apply general auth rate limiting to every auth route.
 */
authRouter.use("*", authRateLimit);

/**
 * Apply stricter rate limits to sensitive auth endpoints.
 */
authRouter.use("/reset-password", passwordResetRateLimit);
authRouter.use("/send-verification-email", emailVerificationRateLimit);
authRouter.use("/verify-email", emailVerificationRateLimit);

/**
 * OAuth callback handler. Delegates to the Better Auth handler and redirects to
 * the frontend dashboard, preserving any `Set-Cookie` headers from the auth provider.
 */
authRouter.get(
  "/callback/:provider",
  withErrorHandling(async (c) => {
    try {
      const response = await auth.handler(c.req.raw);

      const frontendUrl = `${
        process.env.CORS_ORIGIN || "http://localhost:3001"
      }/dashboard`;

      const newResponse = Response.redirect(frontendUrl, 302);

      const cookieHeader = response.headers.get("set-cookie");
      if (cookieHeader) {
        newResponse.headers.set("set-cookie", cookieHeader);
      }

      return newResponse;
    } catch (error) {
      console.error("OAuth callback error:", error);
      const errorUrl = `${
        process.env.CORS_ORIGIN || "http://localhost:3001"
      }/sign-in?error=oauth_callback_failed`;
      return c.redirect(errorUrl, 302);
    }
  })
);

/**
 * Catch-all handler for Better Auth routes. Forwards the request to the auth
 * handler and ensures CORS and cookie headers are exposed as needed.
 */
authRouter.all(
  "*",
  withErrorHandling(async (c) => {
    try {
      const response = await auth.handler(c.req.raw);

      const setCookieHeader = response.headers.get("set-cookie");

      const newResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...Object.fromEntries(response.headers.entries()),
          "Access-Control-Allow-Origin": "http://localhost:3001",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-Requested-With",
          "Access-Control-Expose-Headers": "Set-Cookie",
        },
      });

      if (setCookieHeader) {
        const cookies = setCookieHeader
          .split(",")
          .map((cookie) => cookie.trim());
        cookies.forEach((cookie) => {
          newResponse.headers.append("set-cookie", cookie);
        });
      }

      return newResponse;
    } catch (error) {
      console.error("Auth handler error:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  })
);

export { authRouter };
