import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

/**
 * Better Auth client configuration for frontend
 * Handles authentication state and API calls with proper session persistence
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  
  // Plugin configurations
  plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

// Enhanced helper functions for social authentication
export const signInWithGoogle = () =>
  authClient.signIn.social({ 
    provider: "google", 
    callbackURL: "http://localhost:3001/dashboard"
  });

export const signInWithGithub = () =>
  authClient.signIn.social({ 
    provider: "github", 
    callbackURL: "http://localhost:3001/dashboard"
  });

// Enhanced sign out with cleanup
export const signOutUser = async () => {
  try {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Clear any client-side state
          window.location.href = "/sign-in";
        }
      }
    });
  } catch (error) {
    console.error("Sign out error:", error);
    // Force redirect even if sign out fails
    window.location.href = "/sign-in";
  }
};

// Session validation helper
export const validateSession = async () => {
  try {
    const session = await authClient.getSession();
    return session.data?.session || null;
  } catch (error) {
    console.error("Session validation error:", error);
    return null;
  }
};

// Re-export types
export type Session = typeof authClient.$Infer.Session;
