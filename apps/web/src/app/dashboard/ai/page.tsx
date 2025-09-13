import React from "react";
import { Brain } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI",
  description: "Get intelligent analytics insights, predictions, and automated recommendations.",
};

export default function AIPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Brain className="w-8 h-8 text-pink-500" />
        <h1 className="text-3xl font-bold text-white">AI</h1>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <p className="text-zinc-300 text-lg">AI-powered insights</p>
        <p className="text-zinc-500 mt-2">Get intelligent analytics insights, predictions, and automated recommendations.</p>
      </div>
    </div>
  );
}