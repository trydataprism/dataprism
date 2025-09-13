"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Activity,
  Users,
  Target,
  Brain,
  Monitor,
  Settings,
  UserCircle,
  CreditCard,
  HelpCircle,
  Building2,
  Palette,
  Navigation,
  Zap,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";

interface Tab {
  name: string;
  path: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  tabs?: Tab[];
}

export function CommandPalette({ isOpen, onClose, tabs: propTabs }: CommandPaletteProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const defaultTabs = [
    { name: "Websites", path: "/dashboard" },
    { name: "Events", path: "/dashboard/events" },
    { name: "Sessions", path: "/dashboard/sessions" },
    { name: "Goals", path: "/dashboard/goals" },
    { name: "AI", path: "/dashboard/ai" },
    { name: "Monitoring", path: "/dashboard/monitoring" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  const tabs = propTabs || defaultTabs;

  const searchData = [
    {
      id: "websites",
      title: "Websites",
      description: "Manage your tracked websites",
      icon: Globe,
    },
    {
      id: "events",
      title: "Events",
      description: "View analytics events",
      icon: Activity,
    },
    {
      id: "sessions",
      title: "Sessions",
      description: "User sessions overview",
      icon: Users,
    },
    {
      id: "goals",
      title: "Goals",
      description: "Track conversion goals",
      icon: Target,
    },
    { id: "ai", title: "AI", description: "AI-powered insights", icon: Brain },
    {
      id: "monitoring",
      title: "Monitoring",
      description: "System monitoring",
      icon: Monitor,
    },
    {
      id: "settings",
      title: "Settings",
      description: "Account settings",
      icon: Settings,
    },
    {
      id: "profile",
      title: "Profile",
      description: "Manage your profile",
      icon: UserCircle,
    },
    {
      id: "billing",
      title: "Billing",
      description: "Manage billing and subscriptions",
      icon: CreditCard,
    },
    {
      id: "support",
      title: "Support",
      description: "Get help and support",
      icon: HelpCircle,
    },
    {
      id: "team-switcher",
      title: "Switch Team",
      description: "Change active team",
      icon: Building2,
    },
    {
      id: "env-switcher",
      title: "Switch Environment",
      description: "Change environment",
      icon: Palette,
    },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") {
        onClose();
        setSearchValue("");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onClose]);

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-zinc-700 text-zinc-200 rounded px-0.5">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleClose = () => {
    onClose();
    setSearchValue("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl"
          >
            <Command
              className="w-full bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-zinc-800">
                <CommandInput
                  placeholder="Type a command or search..."
                  value={searchValue}
                  onValueChange={setSearchValue}
                  className="border-none bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:ring-0 focus:outline-none px-4 py-4 w-full"
                />
              </div>
              <CommandList className="max-h-[400px] overflow-y-auto px-2 pb-2">
                <CommandEmpty className="py-8 text-center text-zinc-500">
                  No results found.
                </CommandEmpty>

                <CommandGroup>
                  <div className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    <Navigation className="w-3 h-3" />
                    Navigation
                  </div>
                  {searchData
                    .filter((item) =>
                      tabs.some((tab) => tab.name.toLowerCase() === item.id)
                    )
                    .map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <CommandItem
                            onSelect={() => {
                              const targetTab = tabs.find(tab => tab.name.toLowerCase() === item.id);
                              if (targetTab) {
                                router.push(targetTab.path);
                              }
                              handleClose();
                            }}
                            className="group flex items-center gap-3 px-3 py-3 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 focus:outline-none transition-all duration-200"
                          >
                            <IconComponent className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 group-hover:scale-105 transition-all duration-200" />
                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="font-medium text-sm">
                                {highlightMatch(item.title, searchValue)}
                              </span>
                              <span className="text-zinc-500 text-xs truncate">
                                {highlightMatch(
                                  item.description,
                                  searchValue
                                )}
                              </span>
                            </div>
                          </CommandItem>
                        </motion.div>
                      );
                    })}
                </CommandGroup>

                <CommandGroup>
                  <div className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-zinc-600 uppercase tracking-wider">
                    <Zap className="w-3 h-3" />
                    Actions
                  </div>
                  {searchData
                    .filter(
                      (item) =>
                        !tabs.some((tab) => tab.name.toLowerCase() === item.id)
                    )
                    .map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: (index + 7) * 0.05,
                            duration: 0.2,
                          }}
                        >
                          <CommandItem
                            onSelect={() => {
                              if (item.id === "team-switcher") {
                                // Handle team switching logic
                              } else if (item.id === "env-switcher") {
                                // Handle environment switching logic
                              }
                              handleClose();
                            }}
                            className="group flex items-center gap-3 px-3 py-3 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 focus:outline-none transition-all duration-200"
                          >
                            <IconComponent className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 group-hover:scale-105 transition-all duration-200" />
                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="font-medium text-sm">
                                {highlightMatch(item.title, searchValue)}
                              </span>
                              <span className="text-zinc-500 text-xs truncate">
                                {highlightMatch(
                                  item.description,
                                  searchValue
                                )}
                              </span>
                            </div>
                          </CommandItem>
                        </motion.div>
                      );
                    })}
                </CommandGroup>
              </CommandList>

              {/* Footer */}
              <div className="border-t border-zinc-800 px-4 py-3 bg-zinc-950/50">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
                        ↑↓
                      </kbd>
                      <span className="text-zinc-500">Navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
                        ↵
                      </kbd>
                      <span className="text-zinc-500">Select</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
                      esc
                    </kbd>
                    <span className="text-zinc-500">Close</span>
                  </div>
                </div>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}