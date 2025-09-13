import React from "react";
import { Settings } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account preferences, notifications, and application settings.",
};

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-gray-500" />
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <p className="text-zinc-300 text-lg">Account settings</p>
        <p className="text-zinc-500 mt-2">Manage your account preferences, notifications, and application settings.</p>
      </div>
    </div>
  );
}