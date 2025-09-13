import React from "react";
import { Activity } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "View analytics events and track user interactions and custom events across your websites.",
};

export default function EventsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-white">Events</h1>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <p className="text-zinc-300 text-lg">View analytics events</p>
        <p className="text-zinc-500 mt-2">Track and analyze user interactions and custom events across your websites.</p>
      </div>
    </div>
  );
}