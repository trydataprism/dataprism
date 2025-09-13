import React from "react";
import { Globe } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Websites",
  description: "Manage your tracked websites and monitor analytics for all your registered websites and applications.",
};

function page() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Globe className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-white">Websites</h1>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <p className="text-zinc-300 text-lg">Manage your tracked websites</p>
        <p className="text-zinc-500 mt-2">
          Monitor and track analytics for all your registered websites and applications.
        </p>
      </div>
    </div>
  );
}

export default page;
