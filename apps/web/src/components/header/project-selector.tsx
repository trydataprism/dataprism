"use client";

import React, { useState, useEffect } from "react";
import { ChevronsUpDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWebsitesByOrganization } from "@/hooks/use-websites";
import { useOrganizationSelection } from "@/hooks/use-organizations";

interface ProjectSelectorProps {
  onWebsiteChange?: (websiteId: string) => void;
}

export function ProjectSelector({ onWebsiteChange }: ProjectSelectorProps) {
  const { selectedOrganization } = useOrganizationSelection();
  const { data: websitesData, isLoading } = useWebsitesByOrganization(
    selectedOrganization?.id || null
  );

  const [selectedWebsite, setSelectedWebsite] = useState<{
    id: string;
    name: string;
    domain: string;
    initial: string;
  } | null>(null);

  const websites = websitesData?.websites || [];

  // Set default website when data loads
  useEffect(() => {
    if (websites.length > 0 && !selectedWebsite) {
      const website = websites[0];
      const project = {
        id: website.id,
        name: website.name,
        domain: website.domain,
        initial: getInitials(website.name),
      };
      setSelectedWebsite(project);
      onWebsiteChange?.(website.id);
    }
  }, [websites, selectedWebsite, onWebsiteChange]);

  const handleWebsiteSelect = (website: {
    id: string;
    name: string;
    domain: string;
    initial: string;
  }) => {
    setSelectedWebsite(website);
    onWebsiteChange?.(website.id);
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Don't render if no websites or still loading
  if (isLoading || websites.length === 0) {
    return null;
  }

  // Show loading state if no website selected yet
  if (!selectedWebsite) {
    return (
      <div className="flex items-center gap-2 text-zinc-100 px-2 py-1 rounded-lg text-sm">
        <div className="w-5 h-5 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-900 text-[10px] font-semibold">
          <Globe className="w-3 h-3" />
        </div>
        <span className="font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-zinc-100 hover:bg-zinc-800/50 px-2 py-1 rounded-lg text-sm focus:outline-none transition-colors cursor-pointer group">
        <div className="w-5 h-5 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-900 text-[10px] font-semibold">
          {selectedWebsite.initial}
        </div>
        <span className="font-medium">{selectedWebsite.name}</span>
        <ChevronsUpDown className="w-3 h-3 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-1 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-2xl ring-1 ring-white/5">
        <div className="px-2 py-2 mb-1">
          <h3 className="text-xs font-medium text-zinc-500">Websites</h3>
        </div>
        {websites.map((website) => {
          const project = {
            id: website.id,
            name: website.name,
            domain: website.domain,
            initial: getInitials(website.name),
          };
          return (
            <DropdownMenuItem
              key={website.id}
              onClick={() => handleWebsiteSelect(project)}
              className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1"
            >
              <div className="w-5 h-5 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-900 text-[10px] font-semibold">
                {project.initial}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{project.name}</span>
                <span className="text-xs text-zinc-500">{project.domain}</span>
              </div>
              {project.id === selectedWebsite.id && (
                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full ml-auto"></div>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
