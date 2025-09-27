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

// Last used provider tracking
const LAST_USED_PROVIDER_KEY = "dataprism_last_used_provider";

export const setLastUsedProvider = (provider: "google" | "github") => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LAST_USED_PROVIDER_KEY, provider);
  }
};

export const getLastUsedProvider = (): "google" | "github" | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LAST_USED_PROVIDER_KEY) as
      | "google"
      | "github"
      | null;
  }
  return null;
};

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
