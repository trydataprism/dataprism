"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { Line, LineChart, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface Project {
  id: string;
  name: string;
  domain: string;
  repository: string;
  lastActivity: string;
  lastCommit: string;
  icon: string;
  views: number;
  changePercent: number;
  chartData: { day: string; views: number }[];
}

interface DashboardContentProps {
  viewMode: "grid" | "list";
}

const projects: Project[] = [
  {
    id: "1",
    name: "e-commerce-pro",
    domain: "shopify-store.vercel.app",
    repository: "company/ecommerce-pro",
    lastActivity: "Add payment integration",
    lastCommit: "Aug 23 on main",
    icon: "🛒",
    views: 15247,
    changePercent: 28.4,
    chartData: [
      { day: "Mon", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Wed", views: 0 },
      { day: "Thu", views: 15000 },
      { day: "Fri", views: 5800 },
      { day: "Sat", views: 18500 },
      { day: "Sun", views: 15247 },
      { day: "Sun", views: 15247 },
      { day: "Sun", views: 15247 },
      { day: "Tue", views: 0 },
      { day: "Sun", views: 15247 },
      { day: "Sun", views: 15247 },
      { day: "Tue", views: 0 },
      { day: "Sun", views: 15247 },
      { day: "Tue", views: 0 },
      { day: "Sun", views: 15247 },
      { day: "Sun", views: 15247 },
      { day: "Sun", views: 15247 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
    ],
  },
  {
    id: "2",
    name: "ai-dashboard",
    domain: "ai-analytics.com",
    repository: "startup/ai-dashboard",
    lastActivity: "ML model optimization",
    lastCommit: "Aug 22 on develop",
    icon: "🤖",
    views: 8934,
    changePercent: -12.7,
    chartData: [
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Thu", views: 2600 },
      { day: "Fri", views: 11200 },
      { day: "Sat", views: 1500 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Sun", views: 8934 },
    ],
  },
  {
    id: "3",
    name: "crypto-tracker",
    domain: "cryptowatch.app",
    repository: "fintech/crypto-tracker",
    lastActivity: "Real-time price feeds",
    lastCommit: "Aug 23 on main",
    icon: "₿",
    views: 0,
    changePercent: 0,
    chartData: [
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
      { day: "Tue", views: 0 },
    ],
  },
];

export function DashboardContent({ viewMode }: DashboardContentProps) {
  return (
    <div className="flex flex-1 p-6">
      {/* Projects Section */}
      <div className="w-full space-y-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-neutral-950 border-muted/60 hover:border-muted/80 hover:bg-neutral-900 transition-all duration-200 cursor-pointer h-44 relative"
              >
                <CardContent className="h-full py-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground mb-0.5">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-0.5">
                        {project.domain}
                      </p>
                      <div className="flex items-center gap-1 pt-3">
                        <span className="text-xs font-medium text-foreground">
                          {project.views.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                    {project.changePercent !== 0 && (
                      <div className="flex items-center gap-1">
                        {project.changePercent > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span
                          className={`text-xs font-medium ${
                            project.changePercent > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {project.changePercent > 0 ? "+" : ""}
                          {project.changePercent}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-0 right-0 h-10 px-2">
                    <ChartContainer
                      config={{
                        views: {
                          label: "Views",
                          color: "var(--chart-1)",
                        },
                      }}
                      className="h-full w-full"
                    >
                      <LineChart
                        accessibilityLayer
                        data={project.chartData}
                        margin={{
                          left: 0,
                          right: 0,
                          top: 4,
                          bottom: 4,
                        }}
                      >
                        <YAxis
                          hide
                          domain={
                            project.chartData.every((d) => d.views === 0)
                              ? [0, 1]
                              : [0, "dataMax"]
                          }
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <defs>
                          <linearGradient
                            id={`gradient-${project.id}`}
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#6b7280" />
                          </linearGradient>
                        </defs>
                        <Line
                          dataKey="views"
                          type="linear"
                          stroke={
                            project.chartData.every((d) => d.views === 0)
                              ? "#9ca3af"
                              : `url(#gradient-${project.id})`
                          }
                          strokeWidth={2}
                          dot={false}
                          connectNulls={false}
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-neutral-950 border-muted/60 hover:border-muted/80 hover:bg-neutral-900 transition-all duration-200 cursor-pointer"
              >
                <CardContent className="px-4 py-1.5">
                  <div className="group flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="min-w-0 flex-1">
                        <div>
                          <h3 className="font-medium text-foreground text-sm">
                            {project.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {project.domain}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground tabular-nums">
                            {project.views.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            views
                          </div>
                        </div>

                        {project.changePercent !== 0 && (
                          <div className="text-right min-w-[70px]">
                            <div
                              className={`flex items-center justify-end gap-1 text-xs font-medium ${
                                project.changePercent > 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {project.changePercent > 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              <span className="tabular-nums">
                                {project.changePercent > 0 ? "+" : ""}
                                {project.changePercent}%
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              change
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-8">
                      <div className="h-12 w-32 opacity-60 group-hover:opacity-100 transition-opacity">
                        <ChartContainer
                          config={{
                            views: {
                              label: "Views",
                              color: "var(--chart-1)",
                            },
                          }}
                          className="h-full w-full"
                        >
                          <LineChart
                            accessibilityLayer
                            data={project.chartData}
                            margin={{
                              left: 0,
                              right: 0,
                              top: 4,
                              bottom: 4,
                            }}
                          >
                            <YAxis
                              hide
                              domain={
                                project.chartData.every((d) => d.views === 0)
                                  ? [0, 1]
                                  : [0, "dataMax"]
                              }
                            />
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent hideLabel />}
                            />
                            <defs>
                              <linearGradient
                                id={`gradient-list-${project.id}`}
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                              >
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#6b7280" />
                              </linearGradient>
                            </defs>
                            <Line
                              dataKey="views"
                              type="linear"
                              stroke={
                                project.chartData.every((d) => d.views === 0)
                                  ? "#9ca3af"
                                  : `url(#gradient-list-${project.id})`
                              }
                              strokeWidth={2}
                              dot={false}
                              connectNulls={false}
                            />
                          </LineChart>
                        </ChartContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
