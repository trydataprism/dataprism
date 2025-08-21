"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Search, ChevronDown, Bell, BookOpen } from "lucide-react";

export function DashboardHeader() {
  const tabs = [
    "Overview",
    "Integrations",
    "Deployments",
    "Activity",
    "Domains",
    "Usage",
    "Observability",
    "Storage",
    "Flags",
    "AI Gateway",
    "Support",
    "Settings",
  ];

  return (
    <div className="w-full">
      {/* Main Header */}
      <header className="flex h-16 items-center justify-between px-6 border-b border-border">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-black"></div>
            </div>
            <span className="text-muted-foreground">/</span>
            <Avatar className="h-6 w-6">
              <AvatarImage src="/api/placeholder/24/24" />
              <AvatarFallback className="text-xs">CB</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">chefberke's projects</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-6 px-2 gap-1">
                <span className="text-xs">Hobby</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Hobby</DropdownMenuItem>
              <DropdownMenuItem>Pro</DropdownMenuItem>
              <DropdownMenuItem>Enterprise</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Find..." className="pl-9 w-64 h-8" />
          </div>

          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            F
          </Button>

          <Button variant="outline" size="sm" className="h-8">
            Feedback
          </Button>

          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <BookOpen className="h-4 w-4" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/api/placeholder/32/32" />
            <AvatarFallback className="text-xs">CB</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Secondary Navigation Tabs */}
      <nav className="flex items-center gap-6 px-6 border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              index === 0
                ? "border-white text-white"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
