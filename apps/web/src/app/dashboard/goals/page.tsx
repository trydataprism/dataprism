import React from "react";
import { Target } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Goals",
  description: "Set up and monitor conversion goals, funnels, and key performance indicators.",
};

export default function GoalsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Target className="w-8 h-8 text-purple-500" />
        <h1 className="text-3xl font-bold text-white">Goals</h1>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <p className="text-zinc-300 text-lg">Track conversion goals</p>
        <p className="text-zinc-500 mt-2">Set up and monitor conversion goals, funnels, and key performance indicators.</p>
      </div>
    </div>
  );
}