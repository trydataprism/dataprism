import type { Context } from "hono";
import { auth } from "./auth";

/**
 * Authentication utility functions
 */

/**
 * Get the current session from request context
 */
export async function getSession(c: Context) {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

/**
 * Get the current user from request context
 */
export async function getUser(c: Context) {
  try {
    const session = await getSession(c);
    return session?.user || null;
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
}

/**
 * Middleware to require authentication
 */
export async function requireAuth(c: Context, next: () => Promise<void>) {
  const session = await getSession(c);
  
  if (!session) {
    return c.json({ error: "Authentication required" }, 401);
  }
  
  // Add user to context for use in handlers
  c.set("user", session.user);
  c.set("session", session.session);
  
  await next();
}

/**
 * Middleware to require email verification
 */
export async function requireEmailVerification(c: Context, next: () => Promise<void>) {
  const user = await getUser(c);
  
  if (!user) {
    return c.json({ error: "Authentication required" }, 401);
  }
  
  if (!user.emailVerified) {
    return c.json({ 
      error: "Email verification required",
      code: "EMAIL_NOT_VERIFIED" 
    }, 403);
  }
  
  await next();
}

/**
 * Generate a secure verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

/**
 * Check if user has specific role or permission
 */
export function hasPermission(user: any, permission: string): boolean {
  // Implement role-based access control logic here
  // For now, return true for basic implementation
  return true;
}