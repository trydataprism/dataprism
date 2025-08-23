"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardContent } from "@/components/dashboard-content";
import { useState } from "react";

export default function Page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      <DashboardHeader viewMode={viewMode} onViewModeChange={setViewMode} />
      <DashboardContent viewMode={viewMode} />
    </>
  );
}
