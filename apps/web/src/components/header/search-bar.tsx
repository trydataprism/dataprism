"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearchClick: () => void;
}

export function SearchBar({ onSearchClick }: SearchBarProps) {
  return (
    <button
      onClick={onSearchClick}
      className="flex items-center justify-between w-72 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800/60 rounded-lg text-left hover:bg-zinc-800/50 hover:border-zinc-700/70 focus:outline-none transition-all duration-200 group cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
        <span className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">
          Search...
        </span>
      </div>
      <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded bg-zinc-800/60 border border-zinc-700/60 px-2 font-mono text-xs font-medium text-zinc-500 group-hover:bg-zinc-700/60 group-hover:text-zinc-400 transition-all">
        <span className="text-base">⌘</span>K
      </kbd>
    </button>
  );
}