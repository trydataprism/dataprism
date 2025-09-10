"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronsUpDown,
  User,
  Settings,
  LogOut,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Search,
  Globe,
  Activity,
  Users,
  Target,
  Brain,
  Monitor,
  UserCircle,
  Palette,
  Building2,
  Navigation,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";

function page() {
  const { data: session, isPending, error } = useSession();
  const [selectedTeam, setSelectedTeam] = useState({
    name: "Team Name",
    initial: "TN",
  });
  const [selectedProject, setSelectedProject] = useState("Analytics Dashboard");
  const [activeTab, setActiveTab] = useState("Websites");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = [
    "Websites",
    "Events",
    "Sessions",
    "Goals",
    "AI",
    "Monitoring",
    "Settings",
  ];

  const teams = [
    { name: "Team Name", initial: "TN" },
    { name: "Development Team", initial: "DT" },
    { name: "Production Team", initial: "PT" },
  ];

  const projects = [
    { name: "Analytics Dashboard", initial: "AD", status: "active" },
    { name: "E-commerce Platform", initial: "EP", status: "active" },
    { name: "Mobile App", initial: "MA", status: "building" },
    { name: "Marketing Site", initial: "MS", status: "inactive" },
  ];

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
        setIsCommandOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsCommandOpen(false);
        setSearchValue("");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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

  if (isPending) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-red-600 mb-4">Session Error</h2>
        <p className="text-red-500 mb-2">Error: {error.message}</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-yellow-600 mb-4">
          Not Authenticated
        </h2>
        <p>Please sign in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between py-4 px-6 bg-zinc-950/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/dark_logo.svg"
              width={18}
              height={18}
              alt="Dataprism"
              className="opacity-90"
            />
          </div>

          <div className="w-px h-4 bg-zinc-700/60"></div>

          {/* Team Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-zinc-100 hover:bg-zinc-800/50 px-2 py-1 rounded-lg text-sm focus:outline-none transition-colors cursor-pointer group">
              <div className="w-5 h-5 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-900 text-[10px] font-semibold">
                {selectedTeam.initial}
              </div>
              <span className="font-medium">{selectedTeam.name}</span>
              <ChevronsUpDown className="w-3 h-3 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-1 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-2xl ring-1 ring-white/5">
              <div className="px-2 py-2 mb-1">
                <h3 className="text-xs font-medium text-zinc-500">
                  Organizations
                </h3>
              </div>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setSelectedTeam(team)}
                  className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1"
                >
                  <div className="w-5 h-5 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-900 text-[10px] font-semibold">
                    {team.initial}
                  </div>
                  <span className="text-sm font-medium">{team.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-3 bg-zinc-700/60"></div>

          {/* Project Selector */}
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
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center justify-between w-72 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800/60 rounded-lg text-left hover:bg-zinc-800/50 hover:border-zinc-700/70 focus:outline-none transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
              <span className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">
                Search...
              </span>
            </div>
            <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded bg-zinc-800/60 border border-zinc-700/60 px-2 font-mono text-xs font-medium text-zinc-500 group-hover:bg-zinc-700/60 group-hover:text-zinc-400 transition-all">
              <span className="text-base">⌘</span>K
            </kbd>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="w-8 h-8 hover:cursor-pointer bg-neutral-950 rounded-full hover:border-gray-400 transition-colors focus:outline-none focus:ring-0 overflow-hidden">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-black text-sm font-semibold">
                  {session?.user?.name?.charAt(0).toUpperCase() ||
                    session?.user?.email?.charAt(0).toUpperCase() ||
                    "U"}
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 p-1 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/50 rounded-xl shadow-2xl ring-1 ring-white/5"
              align="end"
            >
              {/* User Info Section */}
              <div className="px-2 py-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-semibold overflow-hidden">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      session?.user?.name?.charAt(0).toUpperCase() ||
                      session?.user?.email?.charAt(0).toUpperCase() ||
                      "U"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-100 truncate">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {session?.user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Actions */}
              <div className="space-y-0.5 mb-1">
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1">
                  <User className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm">Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1">
                  <Settings className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1">
                  <CreditCard className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm">Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1">
                  <Building2 className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm">Teams</span>
                </DropdownMenuItem>
              </div>

              {/* Secondary Actions */}
              <div className="space-y-0.5 pt-1 border-t border-zinc-800/50">
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1">
                  <HelpCircle className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm">Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1">
                  <MessageCircle className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm">Feedback</span>
                </DropdownMenuItem>
              </div>

              {/* Sign Out */}
              <div className="pt-1 border-t border-zinc-800/50 mt-1">
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 text-zinc-100 hover:bg-zinc-800/50 rounded-md cursor-pointer focus:bg-zinc-800/50 transition-colors mx-1">
                  <LogOut className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm">Sign out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-[#0a0a0a] border-b border-border/50 relative pt-1.5">
        <nav className="flex items-center px-5 pb-2">
          <div className="flex items-center space-x-8 relative">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-colors pb-2 cursor-pointer ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}

            {/* Animated Underline */}
            <motion.div
              className="absolute -bottom-2 h-0.5 bg-white"
              initial={{
                x: 0,
                width: 65, // approximate width of "Websites" text
              }}
              animate={{
                x: (() => {
                  const activeIndex = tabs.indexOf(activeTab);

                  if (activeIndex === -1) return 0;

                  let x = 0;
                  for (let i = 0; i < activeIndex; i++) {
                    x += (tabRefs.current[i]?.offsetWidth || 0) + 32; // 32px is space-x-8
                  }
                  return x;
                })(),
                width: (() => {
                  const activeIndex = tabs.indexOf(activeTab);
                  return tabRefs.current[activeIndex]?.offsetWidth || 65; // fallback to initial width
                })(),
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
              }}
            />
          </div>
        </nav>
      </div>

      <div className="rounded-t-xl flex-1 bg-black"></div>

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
            onClick={() => {
              setIsCommandOpen(false);
              setSearchValue("");
            }}
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
                        tabs.some((tab) => tab.toLowerCase() === item.id)
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
                                setActiveTab(item.title);
                                setIsCommandOpen(false);
                                setSearchValue("");
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
                          !tabs.some((tab) => tab.toLowerCase() === item.id)
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
                                setIsCommandOpen(false);
                                setSearchValue("");
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
    </div>
  );
}

export default page;
