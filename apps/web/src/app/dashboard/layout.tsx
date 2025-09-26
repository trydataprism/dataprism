"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import { DashboardHeader } from "@/components/header/dashboard-header";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { SessionState } from "@/components/ui/session-state";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, isPending, error } = useSession();

  if (isPending) {
    return <LoadingState message="Loading your dashboard..." />;
  }

  if (error) {
    return (
      <ErrorState
        message="We encountered an issue while loading your session"
        error={error}
        onRetry={() => window.location.reload()}
        onGoHome={() => (window.location.href = "/sign-in")}
      />
    );
  }

  if (!session) {
    return <SessionState />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader session={session} />
      <div className="rounded-t-xl flex-1 bg-black">{children}</div>
    </div>
  );
}
