import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

/**
 * Better Auth client configuration for frontend
 * Handles authentication state and API calls
 */
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  basePath: "/api/auth",
  plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;

// Helper functions for social authentication
export const signInWithGoogle = () =>
  authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3001/dashboard",
  });
export const signInWithGithub = () =>
  authClient.signIn.social({
    provider: "github",
    callbackURL: "http://localhost:3001/dashboard",
  });

// Re-export types
export type Session = typeof authClient.$Infer.Session;
