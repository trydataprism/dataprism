import React from "react";
import { Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sessions",
  description: "Monitor active sessions, session duration, and user engagement patterns.",
};

export default function SessionsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-8 h-8 text-green-500" />
        <h1 className="text-3xl font-bold text-white">Sessions</h1>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <p className="text-zinc-300 text-lg">User sessions overview</p>
        <p className="text-zinc-500 mt-2">Monitor active sessions, session duration, and user engagement patterns.</p>
      </div>
    </div>
  );
}