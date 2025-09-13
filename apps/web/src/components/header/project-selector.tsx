"use client";

import React, { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  name: string;
  initial: string;
  status: string;
}

interface ProjectSelectorProps {
  projects?: Project[];
}

export function ProjectSelector({ projects: propProjects }: ProjectSelectorProps) {
  const [selectedProject, setSelectedProject] = useState("Analytics Dashboard");

  const projects = propProjects || [
    { name: "Analytics Dashboard", initial: "AD", status: "active" },
    { name: "E-commerce Platform", initial: "EP", status: "active" },
    { name: "Mobile App", initial: "MA", status: "building" },
    { name: "Marketing Site", initial: "MS", status: "inactive" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-zinc-100 hover:bg-zinc-800/50 px-2 py-1 rounded-lg text-sm focus:outline-none transition-colors cursor-pointer group">
        <span className="font-medium">{selectedProject}</span>
        <ChevronsUpDown className="w-3 h-3 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-1 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-2xl ring-1 ring-white/5">
        <div className="px-2 py-2 mb-1">
          <h3 className="text-xs font-medium text-zinc-500">Projects</h3>
        </div>
        {projects.map((project, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => setSelectedProject(project.name)}
            className="flex items-center justify-between px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1"
          >
            <span className="text-sm font-medium">{project.name}</span>
            {project.name === selectedProject && (
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}