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
import { useCurrentOrganization } from "@/hooks/use-organizations";
import { useWebsitesByOrganization } from "@/hooks/use-websites";

// Note: Websites data is now loaded from API via useWebsitesByOrganization hook

function page() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("name");
  const [isNewWebsiteModalOpen, setIsNewWebsiteModalOpen] = useState(false);
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const currentOrganization = useCurrentOrganization();
  const { data: websitesData } = useWebsitesByOrganization(
    currentOrganization?.id || null
  );

  const websites = websitesData?.websites || [];

  const filterOptions = [
    { value: "name", label: "Name" },
    { value: "domain", label: "Domain" },
    { value: "status", label: "Status" },
    { value: "isActive", label: "Active Status" },
  ];

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
                Tracking{" "}
                <span className="font-semibold text-white">
                  {websites.length}
                </span>{" "}
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
                viewMode === "list" ? "flex items-center p-4" : "flex flex-col"
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
                        <span>{website.domain}</span>
                        <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">
                        {website.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-medium ${
                          website.isActive ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {website.isActive ? "Active" : "Inactive"}
                      </div>
                      <div className="text-xs text-gray-400">status</div>
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
                        <span>{website.domain}</span>
                        <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium ${
                        website.isActive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      <span>{website.isActive ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                </CardHeader>
              )}
              {viewMode === "grid" && (
                <CardContent className="pt-0 pb-4 px-4 flex-1 flex flex-col justify-between">
                  <div className="text-sm font-bold text-white">
                    {website.status}
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    Created: {new Date(website.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Empty State (when no websites) */}
        {websites.length === 0 && (
          <div className="text-center py-16">
            <div className="relative"></div>
            <div className="space-y-3 max-w-md mx-auto">
              <h3 className="font-medium text-neutral-200">
                No websites added yet
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Start tracking analytics by connecting your first website. Your
                data will appear here once you add a website to monitor.
              </p>
            </div>
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
