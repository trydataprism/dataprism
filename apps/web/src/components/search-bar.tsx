"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddNewButton } from "@/components/add-new-button";
import { ViewModeToggle } from "@/components/view-mode-toggle";
import { useState } from "react";

export function SearchBar() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center gap-3 w-full max-w-3xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search websites..." className="pl-10 h-8 border-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0" maxLength={50} />
        </div>

        <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />

        <AddNewButton />
      </div>
    </div>
  );
}
