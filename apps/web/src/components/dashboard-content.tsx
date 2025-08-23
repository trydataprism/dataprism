"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Activity, MoreHorizontal, GitBranch } from "lucide-react";

interface Project {
  id: string;
  name: string;
  domain: string;
  repository: string;
  lastActivity: string;
  lastCommit: string;
  icon: string;
}

interface DashboardContentProps {
  viewMode: "grid" | "list";
}

const projects: Project[] = [
  {
    id: "1",
    name: "code-fix",
    domain: "code-fix.vercel.app",
    repository: "chefHarun/code.fix",
    lastActivity: "Update index.html",
    lastCommit: "Aug 20 on main",
    icon: "🚀",
  },
  {
    id: "2",
    name: "v0-marketing-website",
    domain: "v0-marketing-website-one-zeta-92.vercel.app",
    repository: "Connect Git Repository",
    lastActivity: "Connect Git Repository",
    lastCommit: "Aug 17",
    icon: "📄",
  },
  {
    id: "3",
    name: "snipffy",
    domain: "snipffy.vercel.app",
    repository: "chefHarun/snipffy",
    lastActivity: "Update TagList.tsx",
    lastCommit: "Aug 19 on main",
    icon: "✂️",
  },
  {
    id: "4",
    name: "git-cow",
    domain: "git-cow.vercel.app",
    repository: "chefHarun/git.cow",
    lastActivity: "Update Nav.tsx",
    lastCommit: "Jun 29 on main",
    icon: "🐄",
  },
];

export function DashboardContent({ viewMode }: DashboardContentProps) {
  return (
    <div className="flex flex-1 p-6">
      {/* Projects Section */}
      <div className="w-full space-y-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-neutral-950 border-muted/60 hover:border-muted/80 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{project.icon}</span>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">
                          {project.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {project.domain}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3 text-muted-foreground" />
                      <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">📁</span>
                      <span className="text-xs text-muted-foreground">
                        {project.repository}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">🔄</span>
                      <span className="text-xs text-muted-foreground">
                        {project.lastActivity}, {project.lastCommit}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-neutral-950 border-muted/60">
            <CardContent className="p-0">
              {projects.map((project, index) => (
                <div key={project.id}>
                  <div className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-lg">{project.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground text-sm">
                            {project.name}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {project.domain}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-foreground">
                            {project.lastActivity}
                          </span>
                          <div className="flex items-center gap-1">
                            <GitBranch className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {project.lastCommit}
                            </span>
                          </div>
                          {project.repository !== "Connect Git Repository" && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-foreground">
                                📁
                              </span>
                              <span className="text-xs text-foreground">
                                {project.repository}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted/30 flex items-center justify-center">
                        <Activity className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  {index < projects.length - 1 && (
                    <div className="border-b border-muted/30" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
