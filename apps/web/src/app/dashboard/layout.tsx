"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import { DashboardHeader } from "@/components/header/dashboard-header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, isPending, error } = useSession();

  if (isPending) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-red-600 mb-4">Session Error</h2>
        <p className="text-red-500 mb-2">Error: {error.message}</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-yellow-600 mb-4">
          Not Authenticated
        </h2>
        <p>Please sign in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader session={session} />
      <div className="rounded-t-xl flex-1 bg-black">
        {children}
      </div>
    </div>
  );
}