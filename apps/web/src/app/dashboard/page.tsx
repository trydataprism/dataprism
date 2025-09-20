"use client";
import React, { useState } from "react";
import {
  Globe,
  RefreshCw,
  Plus,
  ArrowUpRight,
  Grid3X3,
  List,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartLineInteractive } from "@/components/ui/chart-line-interactive";

// Mock data - replace with real data from your API
const websites = [
  {
    id: 1,
    name: "spadey",
    url: "spadey.ninja",
    views: 12450,
    change: 24,
    icon: "globe",
    isActive: true,
    chartData: [
      { date: "2024-09-01", views: 8200 },
      { date: "2024-09-02", views: 8500 },
      { date: "2024-09-03", views: 9100 },
      { date: "2024-09-04", views: 0 },
      { date: "2024-09-05", views: 0 },
      { date: "2024-09-06", views: 10800 },
      { date: "2024-09-07", views: 0 },
      { date: "2024-09-08", views: 0 },
      { date: "2024-09-09", views: 0 },
      { date: "2024-09-10", views: 12100 },
      { date: "2024-09-11", views: 12300 },
      { date: "2024-09-12", views: 0 },
    ],
  },
  {
    id: 2,
    name: "portfolio",
    url: "chefharun.ninja",
    views: 8320,
    change: -12,
    icon: "user",
    isActive: true,
    chartData: [
      { date: "2024-09-01", views: 0 },
      { date: "2024-09-02", views: 100 },
      { date: "2024-09-03", views: 9000 },
      { date: "2024-09-04", views: 8800 },
      { date: "2024-09-05", views: 8700 },
      { date: "2024-09-06", views: 8600 },
      { date: "2024-09-07", views: 8500 },
      { date: "2024-09-08", views: 8450 },
      { date: "2024-09-09", views: 8400 },
      { date: "2024-09-10", views: 8380 },
      { date: "2024-09-11", views: 83050 },
      { date: "2024-09-12", views: 8320 },
    ],
  },
  {
    id: 3,
    name: "blog",
    url: "myblog.com",
    views: 0,
    change: 0,
    icon: "edit",
    isActive: true,
    chartData: [
      { date: "2024-09-01", views: 0 },
      { date: "2024-09-01", views: 0 },
      { date: "2024-09-03", views: 0 },
      { date: "2024-09-04", views: 0 },
      { date: "2024-09-05", views: 0 },
      { date: "2024-09-06", views: 0 },
      { date: "2024-09-07", views: 0 },
      { date: "2024-09-08", views: 0 },
      { date: "2024-09-09", views: 0 },
      { date: "2024-09-10", views: 0 },
      { date: "2024-09-11", views: 0 },
      { date: "2024-09-12", views: 0 },
    ],
  },
];

function page() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("name");
  const [isNewWebsiteModalOpen, setIsNewWebsiteModalOpen] = useState(false);
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const filterOptions = [
    { value: "name", label: "Name" },
    { value: "created", label: "Created" },
    { value: "views", label: "Views" },
    { value: "status", label: "Status" },
  ];

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
            <div className="flex items-center gap-2">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="bg-card/50 border border-border/50 rounded-lg w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-card/70 transition-all duration-200 cursor-pointer"
                >
                  <Filter className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {filterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg min-w-[120px] z-50"
                    >
                      <div className="p-1">
                        <div className="px-3 py-2 text-xs font-medium text-gray-500">
                          Filter By
                        </div>
                        <div className="border-t border-border/50 my-1"></div>
                        {filterOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setFilterBy(option.value);
                              setFilterOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors duration-200 cursor-pointer ${
                              filterBy === option.value
                                ? "bg-white text-black"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View Toggle */}
              <div className="relative bg-card/50 border border-border/50 rounded-lg p-1 flex">
                <motion.div
                  className="absolute inset-1 w-8 h-8 bg-white rounded-md"
                  initial={false}
                  animate={{
                    x: viewMode === "grid" ? 0 : 32,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
                <button
                  onClick={() => setViewMode("grid")}
                  className={`relative z-10 w-8 h-8 flex items-center justify-center transition-colors duration-200 rounded-md cursor-pointer ${
                    viewMode === "grid" ? "text-black" : "text-gray-400"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`relative z-10 w-8 h-8 flex items-center justify-center transition-colors duration-200 rounded-md cursor-pointer ${
                    viewMode === "list" ? "text-black" : "text-gray-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <Button
                className="bg-white hover:bg-gray-100 text-black text-xs px-2.5 py-1.5 cursor-pointer"
                onClick={() => setIsNewWebsiteModalOpen(true)}
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                New Website
              </Button>
            </div>
          </div>

          {/* Tracking Bar */}
          <div className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-400 text-xs">
                Tracking <span className="font-semibold text-white">3</span>{" "}
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

        {/* Website Cards */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              : "space-y-3"
          }
        >
          {websites.map((website) => (
            <Card
              key={website.id}
              className={`group bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200 cursor-pointer ${
                viewMode === "list"
                  ? "flex items-center p-4"
                  : "flex flex-col"
              }`}
              onClick={() => router.push(`/dashboard/website/${website.id}`)}
            >
                {viewMode === "list" ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold text-white text-base">
                          {website.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <span>{website.url}</span>
                          <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">
                          {website.views.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm font-medium ${
                            website.change >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {website.change >= 0 ? "+" : ""}
                          {website.change}%
                        </div>
                        <div className="text-xs text-gray-400">change</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-base">
                          {website.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <span>{website.url}</span>
                          <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      {website.change !== 0 && (
                        <div
                          className={`flex items-center gap-1 text-xs font-medium ${
                            website.change > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {website.change > 0 ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowUpRight className="w-3 h-3 rotate-180" />
                          )}
                          <span>{Math.abs(website.change)}%</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                )}
                {viewMode === "grid" && (
                  <CardContent className="pt-0 pb-4 px-4 flex-1 flex flex-col justify-between">
                    <div className="text-sm font-bold text-white">
                      {website.views.toLocaleString()}
                    </div>
                    <div className="mt-1">
                      <ChartLineInteractive
                        data={website.chartData}
                        className="border-0 bg-transparent p-0"
                      />
                    </div>
                  </CardContent>
                )}
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

        {/* New Website Modal */}
        <Dialog
          open={isNewWebsiteModalOpen}
          onOpenChange={setIsNewWebsiteModalOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Website</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Website Name</Label>
                <Input
                  id="name"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  placeholder="My Website"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">Website URL</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none select-none">
                    https://
                  </span>
                  <Input
                    id="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="example.com"
                    className="pl-[70px] cursor-text"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  setIsNewWebsiteModalOpen(false);
                  setWebsiteName("");
                  setWebsiteUrl("");
                }}
              >
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => {
                  // TODO: Add website logic here
                  console.log("Adding website:", {
                    name: websiteName,
                    url: websiteUrl,
                  });
                  setIsNewWebsiteModalOpen(false);
                  setWebsiteName("");
                  setWebsiteUrl("");
                }}
              >
                Add Website
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default page;
