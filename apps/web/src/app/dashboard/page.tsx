"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardContent } from "@/components/dashboard-content";
import { useState } from "react";

export default function Page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-1 flex-col pt-0 bg-muted/25 rounded-xl border border-muted/60 mb-5 mr-5">
      <DashboardHeader viewMode={viewMode} onViewModeChange={setViewMode} />
      <DashboardContent viewMode={viewMode} />
    </div>
  );
}
