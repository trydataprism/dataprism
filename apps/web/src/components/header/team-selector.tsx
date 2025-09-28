"use client";

import React, { useState, useEffect } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  useOrganizationSelection,
  useCreateDefaultOrganization,
} from "@/hooks/use-organizations";
import { useSession } from "@/lib/auth-client";

interface Organization {
  id: string;
  name: string;
  slug?: string;
}

interface TeamSelectorProps {
  onOrganizationChange?: (organizationId: string) => void;
}

export function TeamSelector({ onOrganizationChange }: TeamSelectorProps) {
  const { data: session } = useSession();
  const { organizations, selectedOrganization, setSelectedOrganizationId } =
    useOrganizationSelection();
  const createDefaultOrg = useCreateDefaultOrganization();

  const [selectedTeam, setSelectedTeam] = useState<{
    id: string;
    name: string;
    initial: string;
  } | null>(null);
  const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = useState(false);

  // Set default organization when data loads
  useEffect(() => {
    if (selectedOrganization && !selectedTeam) {
      const team = {
        id: selectedOrganization.id,
        name: selectedOrganization.name,
        initial: getInitials(selectedOrganization.name),
      };
      setSelectedTeam(team);
      onOrganizationChange?.(selectedOrganization.id);
    }
  }, [selectedOrganization, selectedTeam, onOrganizationChange]);

  // Create default organization if user has no organizations
  useEffect(() => {
    if (
      session?.user &&
      organizations.length === 0 &&
      !createDefaultOrg.isPending
    ) {
      createDefaultOrg.mutate();
    }
  }, [session?.user, organizations.length, createDefaultOrg]);

  const handleTeamSelect = (team: {
    id: string;
    name: string;
    initial: string;
  }) => {
    setSelectedTeam(team);
    setSelectedOrganizationId(team.id);
    onOrganizationChange?.(team.id);
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Show default state if no team selected yet
  if (!selectedTeam) {
    return (
      <div className="flex items-center gap-2 text-zinc-100 px-2 py-1 rounded-lg text-sm">
        <div className="w-5 h-5 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-900 text-[10px] font-semibold">
          ?
        </div>
        <span className="font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <>
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
          {organizations.map((org) => {
            const team = {
              id: org.id,
              name: org.name,
              initial: getInitials(org.name),
            };
            return (
              <DropdownMenuItem
                key={org.id}
                onClick={() => handleTeamSelect(team)}
                className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1"
              >
                <div className="w-5 h-5 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-900 text-[10px] font-semibold">
                  {team.initial}
                </div>
                <span className="text-sm font-medium">{team.name}</span>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator className="my-1 bg-zinc-800/50" />
          <DropdownMenuItem
            onClick={() => setIsCreateOrgModalOpen(true)}
            className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1"
          >
            <div className="w-5 h-5 bg-zinc-700/50 rounded-md flex items-center justify-center text-zinc-300">
              <Plus className="w-3 h-3" />
            </div>
            <span className="text-sm font-medium">Create Organization</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
