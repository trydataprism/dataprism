"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { SearchBar } from "@/components/search-bar";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex flex-1 flex-col min-h-0">
        <div className="flex-1"></div>
        <SearchBar />
      </div>
    </div>
  );
}
