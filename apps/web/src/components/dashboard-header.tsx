"use client";

import { Input } from "@/components/ui/input";
import { Search, Webhook } from "lucide-react";
import { AddNewButton } from "@/components/add-new-button";
import { ViewModeToggle } from "@/components/view-mode-toggle";

interface DashboardHeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function DashboardHeader({
  viewMode,
  onViewModeChange,
}: DashboardHeaderProps) {
  return (
    <div className="w-full rounded-t-xl p-3 border-b border-muted/60 shadow-sm bg-neutral-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Webhook className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold text-foreground text-sm">
            Websites
          </span>
          <span className="text-muted-foreground text-sm">
            Track and analyze your website performance
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search websites..."
              className="pl-10 h-8 w-64 border-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
              maxLength={50}
            />
          </div>

          <ViewModeToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />

          <AddNewButton />
        </div>
      </div>
    </div>
  );
}
