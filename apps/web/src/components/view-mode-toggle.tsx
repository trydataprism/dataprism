"use client";

import { Grid3X3, List } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
  return (
    <div className="relative h-8 w-18 bg-background border rounded-md">
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-primary rounded-md transition-all duration-200 ease-in-out"
        style={{
          transform: viewMode === "grid" ? "translateX(0%)" : "translateX(100%)",
        }}
      />
      <div className="relative flex h-full">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`flex-1 flex items-center justify-center rounded-sm transition-colors duration-200 cursor-pointer ${
            viewMode === "grid"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Grid3X3 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`flex-1 flex items-center justify-center rounded-sm transition-colors duration-200 cursor-pointer ${
            viewMode === "list"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}