"use client";

import React, { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Team {
  name: string;
  initial: string;
}

interface TeamSelectorProps {
  teams?: Team[];
}

export function TeamSelector({ teams: propTeams }: TeamSelectorProps) {
  const [selectedTeam, setSelectedTeam] = useState({
    name: "Team Name",
    initial: "TN",
  });

  const teams = propTeams || [
    { name: "Team Name", initial: "TN" },
    { name: "Development Team", initial: "DT" },
    { name: "Production Team", initial: "PT" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-zinc-100 hover:bg-zinc-800/50 px-2 py-1 rounded-lg text-sm focus:outline-none transition-colors cursor-pointer group">
        <div className="w-5 h-5 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-900 text-[10px] font-semibold">
          {selectedTeam.initial}
        </div>
        <span className="font-medium">{selectedTeam.name}</span>
        <ChevronsUpDown className="w-3 h-3 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-1 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-2xl ring-1 ring-white/5">
        <div className="px-2 py-2 mb-1">
          <h3 className="text-xs font-medium text-zinc-500">Organizations</h3>
        </div>
        {teams.map((team, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => setSelectedTeam(team)}
            className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1"
          >
            <div className="w-5 h-5 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-900 text-[10px] font-semibold">
              {team.initial}
            </div>
            <span className="text-sm font-medium">{team.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}