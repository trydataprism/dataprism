"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient, type Session } from "@/lib/auth-client";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth provider component that wraps the app and provides authentication state
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    try {
      const sessionData = await authClient.getSession();
      setSession(sessionData?.data || null);
    } catch (error) {
      console.error("Failed to get session:", error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setSession(null);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const value = {
    session,
    loading,
    signOut: handleSignOut,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}