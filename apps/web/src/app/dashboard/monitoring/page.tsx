import React from "react";
import {
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Activity,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Monitoring",
  description:
    "Monitor system health, uptime, performance metrics, and alerts.",
};

// Mock data - replace with real data from your API
const metrics = [
  {
    id: 1,
    name: "CPU Usage",
    value: "23%",
    status: "healthy",
    trend: "+2%",
    website: "spadey.ninja",
  },
  {
    id: 2,
    name: "Memory Usage",
    value: "67%",
    status: "warning",
    trend: "+5%",
    website: "chefharun.ninja",
  },
  {
    id: 3,
    name: "Response Time",
    value: "145ms",
    status: "healthy",
    trend: "-12ms",
    website: "spadey.ninja",
  },
  {
    id: 4,
    name: "Uptime",
    value: "99.9%",
    status: "healthy",
    trend: "stable",
    website: "chefharun.ninja",
  },
];

const alerts = [
  {
    id: 1,
    title: "High Memory Usage",
    description: "Memory usage exceeded 80% threshold",
    severity: "warning",
    timestamp: "2 minutes ago",
    website: "chefharun.ninja",
  },
  {
    id: 2,
    title: "Slow Response Time",
    description: "Average response time increased by 200ms",
    severity: "info",
    timestamp: "15 minutes ago",
    website: "spadey.ninja",
  },
];

export default function MonitoringPage() {
  return (
    <div className="bg-background">
      {/* Background Effects */}
      <div
        aria-hidden
        className="z-[1] absolute inset-0 pointer-events-none isolate opacity-30 contain-strict"
      >
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Monitoring</h1>
                <p className="text-gray-400 text-xs">
                  System health and performance metrics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8"
              >
                <Zap className="w-3.5 h-3.5" />
              </Button>
              <Button className="bg-white hover:bg-gray-100 text-black text-xs px-2.5 py-1.5">
                <Activity className="w-3.5 h-3.5 mr-1" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">2</span> websites
                  monitored
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">99.9%</span> uptime
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">1</span> active
                  alert
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric) => (
            <Card
              key={metric.id}
              className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm">
                    {metric.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {metric.status === "healthy" && (
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    )}
                    {metric.status === "warning" && (
                      <AlertTriangle className="w-3 h-3 text-yellow-400" />
                    )}
                    {metric.status === "error" && (
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                    )}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {metric.value}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{metric.website}</span>
                  <span
                    className={`${
                      metric.trend.startsWith("+")
                        ? "text-red-400"
                        : metric.trend.startsWith("-")
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    {metric.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Alerts
          </h2>
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {alert.severity === "warning" && (
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    )}
                    {alert.severity === "error" && (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    )}
                    {alert.severity === "info" && (
                      <Clock className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white text-sm">
                        {alert.title}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {alert.website}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          alert.severity === "warning"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : alert.severity === "error"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {alerts.length === 0 && (
          <div className="text-center py-12">
            <Monitor className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">No alerts</h3>
            <p className="text-gray-400 mb-4 text-sm">
              All systems are running smoothly
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
