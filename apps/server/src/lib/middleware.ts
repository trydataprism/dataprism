import type { Context, Next } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { RATE_LIMITS, CORS_CONFIG } from "../constants";

/**
 * Rate limiting middleware factory
 * Creates different rate limits for different endpoint types
 */
export function createRateLimit(options: {
  windowMs: number;
  max: number;
  message?: string;
}) {
  return rateLimiter({
    windowMs: options.windowMs,
    limit: options.max,
    message: options.message || "Too many requests, please try again later.",
    keyGenerator: (c: Context) => {
      // Use IP address as the key for rate limiting
      const forwarded = c.req.header("x-forwarded-for");
      const ip = forwarded
        ? forwarded.split(",")[0]
        : c.env?.remoteAddr || "unknown";
      return ip;
    },
  });
}

/**
 * Strict rate limiting for authentication endpoints
 */
export const authRateLimit = createRateLimit(RATE_LIMITS.AUTH);

/**
 * Moderate rate limiting for password reset endpoints
 */
export const passwordResetRateLimit = createRateLimit(
  RATE_LIMITS.PASSWORD_RESET
);

/**
 * General API rate limiting
 */
export const generalRateLimit = createRateLimit(RATE_LIMITS.GENERAL);

/**
 * Email verification rate limiting
 */
export const emailVerificationRateLimit = createRateLimit(
  RATE_LIMITS.EMAIL_VERIFICATION
);

/**
 * CORS middleware with security headers
 */
export const corsMiddleware = async (c: Context, next: Next) => {
  const origin = c.req.header("origin");

  // Always set CORS headers for preflight requests
  c.header("Access-Control-Allow-Methods", CORS_CONFIG.allowedMethods);
  c.header("Access-Control-Allow-Headers", CORS_CONFIG.allowedHeaders);
  c.header(
    "Access-Control-Allow-Credentials",
    CORS_CONFIG.credentials.toString()
  );
  c.header("Access-Control-Max-Age", CORS_CONFIG.maxAge.toString());

  // In development, be completely permissive with CORS
  if (process.env.NODE_ENV === "development") {
    // Allow any localhost origin in development
    if (origin?.includes("localhost")) {
      c.header("Access-Control-Allow-Origin", origin);
    } else if (!origin) {
      // For requests with no origin, allow localhost:3001
      c.header("Access-Control-Allow-Origin", "http://localhost:3001");
    } else {
      // Fallback for development - allow all
      c.header("Access-Control-Allow-Origin", "*");
    }
  } else {
    // Production CORS logic - strict
    if (origin && CORS_CONFIG.allowedOrigins.includes(origin)) {
      c.header("Access-Control-Allow-Origin", origin);
    } else if (!origin) {
      c.header("Access-Control-Allow-Origin", "*");
    }
  }

  // Handle preflight OPTIONS request
  if (c.req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: c.res.headers,
    });
  }

  // Security headers - less strict in development
  if (process.env.NODE_ENV === "development") {
    c.header("X-Content-Type-Options", "nosniff");
    c.header("X-Frame-Options", "SAMEORIGIN");
    c.header("X-XSS-Protection", "1");
  } else {
    c.header("X-Content-Type-Options", "nosniff");
    c.header("X-Frame-Options", "DENY");
    c.header("X-XSS-Protection", "1; mode=block");
    c.header("Referrer-Policy", "strict-origin-when-cross-origin");
    c.header(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  await next();
};

/**
 * Request logging middleware
 */
export const loggerMiddleware = async (c: Context, next: Next) => {
  const start = Date.now();
  const method = c.req.method;
  const url = c.req.url;
  const userAgent = c.req.header("user-agent") || "";
  const ip = c.req.header("x-forwarded-for") || "unknown";

  await next();

  const duration = Date.now() - start;
  const status = c.res.status;

  console.log(
    `${method} ${url} ${status} ${duration}ms - ${ip} - ${userAgent}`
  );
};

/**
 * Error handling middleware
 */
export const errorMiddleware = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error("Request error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      method: c.req.method,
      url: c.req.url,
      headers: Object.fromEntries(c.req.raw.headers.entries()),
    });

    if (error instanceof Error) {
      return c.json(
        {
          error: "Internal server error",
          message:
            process.env.NODE_ENV === "development"
              ? error.message
              : "Something went wrong",
        },
        500
      );
    }

    return c.json({ error: "Internal server error" }, 500);
  }
};
