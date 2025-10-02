import React from "react";
import {
  Activity,
  Filter,
  Download,
  Search,
  Calendar,
  Clock,
  Eye,
} from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Events",
  description:
    "View analytics events and track user interactions and custom events across your websites.",
};

// Mock data - replace with real data from your API
const events = [
  {
    id: 1,
    name: "page_view",
    website: "spadey.ninja",
    timestamp: "2024-01-15 14:30:25",
    user: "user_123",
    properties: { page: "/home", referrer: "google.com" },
    count: 1,
  },
  {
    id: 2,
    name: "button_click",
    website: "chefharun.ninja",
    timestamp: "2024-01-15 14:28:12",
    user: "user_456",
    properties: { button: "cta-signup", location: "header" },
    count: 1,
  },
  {
    id: 3,
    name: "form_submit",
    website: "spadey.ninja",
    timestamp: "2024-01-15 14:25:45",
    user: "user_789",
    properties: { form: "contact", fields: 3 },
    count: 1,
  },
];

export default function EventsPage() {
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
              <Activity className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Events</h1>
                <p className="text-gray-400 text-xs">
                  Track user interactions and custom events
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
                <Activity className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">3</span> events
                  today
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">1.2k</span> total
                  views
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search events..."
                className="w-48 h-7 text-xs bg-background/50 border-border/50"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 w-7 h-7"
              >
                <Search className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card
              key={event.id}
              className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {event.name}
                      </h3>
                      <p className="text-gray-400 text-xs">{event.website}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{event.user}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-background/30 rounded border border-border/30">
                  <pre className="text-xs text-gray-300 font-mono">
                    {JSON.stringify(event.properties, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No events yet
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Events will appear here once users start interacting with your
              websites
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
