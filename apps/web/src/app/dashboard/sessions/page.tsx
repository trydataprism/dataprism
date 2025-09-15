import React from "react";
import { Users, Clock, Globe, MousePointer, Eye, Filter, Download } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sessions",
  description: "Monitor active sessions, session duration, and user engagement patterns.",
};

// Mock data - replace with real data from your API
const sessions = [
  {
    id: 1,
    user: "user_123",
    website: "spadey.ninja",
    startTime: "14:30:25",
    duration: "5m 23s",
    pages: 3,
    actions: 12,
    location: "New York, US",
    device: "Desktop",
    browser: "Chrome",
    status: "active",
  },
  {
    id: 2,
    user: "user_456",
    website: "chefharun.ninja",
    startTime: "14:28:12",
    duration: "2m 45s",
    pages: 1,
    actions: 5,
    location: "London, UK",
    device: "Mobile",
    browser: "Safari",
    status: "completed",
  },
  {
    id: 3,
    user: "user_789",
    website: "spadey.ninja",
    startTime: "14:25:45",
    duration: "8m 12s",
    pages: 5,
    actions: 23,
    location: "Tokyo, JP",
    device: "Desktop",
    browser: "Firefox",
    status: "completed",
  },
];

export default function SessionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div
        aria-hidden
        className="z-[1] absolute inset-0 pointer-events-none isolate opacity-30 contain-strict"
      >
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Sessions</h1>
                <p className="text-gray-400 text-xs">
                  Monitor user sessions and engagement
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8"
              >
                <Download className="w-3.5 h-3.5" />
              </Button>
              <Button className="bg-white hover:bg-gray-100 text-black text-xs px-2.5 py-1.5">
                <Filter className="w-3.5 h-3.5 mr-1" />
                Filter
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">3</span> total sessions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">5m 23s</span> avg duration
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">1</span> active now
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card
              key={session.id}
              className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      session.status === "active" ? "bg-green-500" : "bg-gray-500"
                    }`}></div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {session.user}
                      </h3>
                      <p className="text-gray-400 text-xs">{session.website}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{session.startTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MousePointer className="w-3 h-3" />
                      <span>{session.actions} actions</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400">Duration:</span>
                    <p className="text-white font-medium">{session.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Pages:</span>
                    <p className="text-white font-medium">{session.pages}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Location:</span>
                    <p className="text-white font-medium">{session.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Device:</span>
                    <p className="text-white font-medium">{session.device} • {session.browser}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sessions.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No sessions yet
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              User sessions will appear here once visitors start browsing your websites
            </p>
          </div>
        )}
      </div>
    </div>
  );
}