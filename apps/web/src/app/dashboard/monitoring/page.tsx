import React from "react";
import { Monitor } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitoring",
  description: "Monitor system health, uptime, performance metrics, and alerts.",
};

export default function MonitoringPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Monitor className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold text-white">Monitoring</h1>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <p className="text-zinc-300 text-lg">System monitoring</p>
        <p className="text-zinc-500 mt-2">Monitor system health, uptime, performance metrics, and alerts.</p>
      </div>
    </div>
  );
}