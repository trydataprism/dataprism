import React from "react";
import {
  Globe,
  RefreshCw,
  Plus,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Websites",
  description:
    "Manage your tracked websites and monitor analytics for all your registered websites and applications.",
};

// Mock data - replace with real data from your API
const websites = [
  {
    id: 1,
    name: "spadey",
    url: "spadey.ninja",
    views: 0,
    change: 0,
    icon: "globe",
    isActive: true,
  },
  {
    id: 2,
    name: "portfolio",
    url: "chefharun.ninja",
    views: 0,
    change: 0,
    icon: "user",
    isActive: true,
  },
];

function page() {
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
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Websites</h1>
                <p className="text-gray-400 text-xs">
                  Track analytics for all your websites
                </p>
              </div>
            </div>
            <Button className="bg-white hover:bg-gray-100 text-black text-xs px-2.5 py-1.5">
              <Plus className="w-3.5 h-3.5 mr-1" />
              New Website
            </Button>
          </div>

          {/* Tracking Bar */}
          <div className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-400 text-xs">
                Tracking <span className="font-semibold text-white">2</span>{" "}
                websites
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Website Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {websites.map((website) => (
            <Card
              key={website.id}
              className="group bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200 cursor-pointer"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-white text-base">
                        {website.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <ExternalLink className="w-3 h-3" />
                        <span>{website.url}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="text-xl font-bold text-white">
                    {website.views.toLocaleString()} views
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-gray-800 rounded-full h-1">
                      <div
                        className="bg-gray-500 h-1 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (website.views / 1000) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-gray-400">
                        {website.change >= 0 ? "+" : ""}
                        {website.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (when no websites) */}
        {websites.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No websites yet
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Get started by adding your first website to track analytics
            </p>
            <Button className="bg-white hover:bg-gray-100 text-black text-sm px-3 py-1.5">
              <Plus className="w-4 h-4 mr-1.5" />
              Add Your First Website
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
