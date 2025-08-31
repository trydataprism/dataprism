import { Hono } from "hono";
import { auth } from "../lib/auth";
import { authRateLimit, passwordResetRateLimit, emailVerificationRateLimit, corsMiddleware } from "../lib/middleware";

/**
 * Authentication router with Better Auth integration
 * Handles all auth-related endpoints with proper rate limiting
 */
const authRouter = new Hono();

// Apply CORS middleware for auth endpoints
authRouter.use("*", corsMiddleware);

// Apply rate limiting to all auth endpoints
authRouter.use("*", authRateLimit);

// Special rate limits for sensitive endpoints
authRouter.use("/reset-password", passwordResetRateLimit);
authRouter.use("/send-verification-email", emailVerificationRateLimit);
authRouter.use("/verify-email", emailVerificationRateLimit);

/**
 * Handle OAuth callbacks with redirect to frontend
 */
authRouter.get("/callback/:provider", async (c) => {
  try {
    const response = await auth.handler(c.req.raw);
    
    // OAuth callback sonrası her durumda frontend'e yönlendir
    const frontendUrl = `${process.env.CORS_ORIGIN || "http://localhost:3001"}/dashboard`;
    
    // Response'dan cookie'leri kopyala ve frontend redirect ekle
    const newResponse = Response.redirect(frontendUrl, 302);
    
    // Session cookie'lerini kopyala
    const cookieHeader = response.headers.get('set-cookie');
    if (cookieHeader) {
      newResponse.headers.set('set-cookie', cookieHeader);
    }
    
    return newResponse;
  } catch (error) {
    console.error("OAuth callback error:", error);
    const errorUrl = `${process.env.CORS_ORIGIN || "http://localhost:3001"}/sign-in?error=oauth_callback_failed`;
    return c.redirect(errorUrl, 302);
  }
});

/**
 * Handle all Better Auth routes
 */
authRouter.all("*", async (c) => {
  try {
    const response = await auth.handler(c.req.raw);
    
    // Ensure CORS headers are present in response
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers.entries()),
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      },
    });
    
    return newResponse;
  } catch (error) {
    console.error('Auth handler error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});

export { authRouter };