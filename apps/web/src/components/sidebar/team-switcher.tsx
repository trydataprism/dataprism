import * as React from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Dark Logo */}
          <div className="flex items-center justify-center w-8 h-8">
            <Image
              src="/dark_logo.svg"
              alt="Logo"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </div>

          {/* Separator */}
          <span className="text-muted-foreground text-xl">/</span>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="sm"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-8 px-2 gap-1"
              >
                <span className="text-sm font-medium text-white">Dokedu</span>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 rounded-lg bg-gray-900 border-gray-700"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              {teams.map((team) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="text-white hover:bg-gray-800"
                >
                  {team.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
