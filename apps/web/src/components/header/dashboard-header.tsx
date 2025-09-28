"use client";

import React, { useState } from "react";
import { Logo } from "./logo";
import { TeamSelector } from "./team-selector";
import { ProjectSelector } from "./project-selector";
import { SearchBar } from "./search-bar";
import { UserDropdown } from "./user-dropdown";
import { Navigation } from "./navigation";
import { CommandPalette } from "./command-palette";

interface UserSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface DashboardHeaderProps {
  session: UserSession | null;
  onOrganizationChange?: (organizationId: string) => void;
}

export function DashboardHeader({
  session,
  onOrganizationChange,
}: DashboardHeaderProps) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <>
      {/* Top Header */}
      <div className="flex items-center justify-between py-4 px-6 bg-zinc-950/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="w-px h-4 bg-zinc-700/60"></div>
          <TeamSelector onOrganizationChange={onOrganizationChange} />
          <div className="w-px h-3 bg-zinc-700/60"></div>
          <ProjectSelector />
        </div>

        <div className="flex items-center gap-3">
          <SearchBar onSearchClick={() => setIsCommandOpen(true)} />
          <UserDropdown session={session} />
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}
