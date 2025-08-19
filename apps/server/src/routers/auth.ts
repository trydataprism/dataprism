import { Hono } from "hono";
import { auth } from "../lib/auth";
import { authRateLimit, passwordResetRateLimit, emailVerificationRateLimit, corsMiddleware } from "../lib/middleware";

/**
 * Authentication router with Better Auth integration
 * Handles all auth-related endpoints with proper rate limiting
 */
const authRouter = new Hono();

// Apply CORS middleware first for auth endpoints
authRouter.use("*", corsMiddleware);

// Apply rate limiting to all auth endpoints
authRouter.use("*", authRateLimit);

// Special rate limits for sensitive endpoints
authRouter.use("/reset-password", passwordResetRateLimit);
authRouter.use("/send-verification-email", emailVerificationRateLimit);
authRouter.use("/verify-email", emailVerificationRateLimit);

/**
 * Handle all Better Auth routes
 * This includes: sign-in, sign-up, sign-out, forgot-password, reset-password, etc.
 */
authRouter.all("*", async (c) => {
  const response = await auth.handler(c.req.raw);
  
  // Ensure CORS headers are preserved in the response
  const corsHeaders = {
    'Access-Control-Allow-Origin': c.res.headers.get('Access-Control-Allow-Origin') || 'http://localhost:3001',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
  };
  
  // Create new response with CORS headers
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...Object.fromEntries(response.headers.entries()),
      ...corsHeaders,
    },
  });
  
  return newResponse;
});

export { authRouter };