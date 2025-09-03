"use client";

import React, { useState, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronsUpDown,
  User,
  Settings,
  LogOut,
  CreditCard,
  HelpCircle,
  Bell,
  MessageCircle,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

function page() {
  const { data: session, isPending, error } = useSession();
  const [selectedOrg, setSelectedOrg] = useState({
    name: "Acme Corp",
    initial: "AC",
  });
  const [selectedProject, setSelectedProject] = useState("Web Analytics");
  const [activeTab, setActiveTab] = useState("Overview");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const organizations = [
    { name: "Acme Corp", initial: "AC" },
    { name: "Tech Solutions", initial: "TS" },
    { name: "Digital Agency", initial: "DA" },
  ];

  const projects = ["Web Analytics", "Mobile App", "E-commerce Site"];

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
      <div className="flex items-center justify-between py-4 px-6 bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <Image src="/dark_logo.svg" width={18} height={18} alt="Dataprism" />

          <ChevronRight className="w-4 h-4 text-gray-400" />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-white hover:bg-neutral-950/70 px-2 py-1.5 rounded text-[13px] focus:outline-none focus:ring-0 cursor-pointer">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-[10px] font-semibold">
                {selectedOrg.initial}
              </div>
              <span className="font-semibold">{selectedOrg.name}</span>
              <ChevronsUpDown className="w-3 h-3 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="px-2 py-2">
                <h3 className="text-xs font-medium text-gray-300">
                  Organizations
                </h3>
              </div>
              {organizations.map((org, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setSelectedOrg(org)}
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-[10px] font-semibold mr-2">
                    {org.initial}
                  </div>
                  <span className="text-[13px]">{org.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ChevronRight className="w-4 h-4 text-gray-400" />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-white hover:bg-neutral-950/70 px-2 py-1.5 rounded text-[13px] focus:outline-none focus:ring-0 cursor-pointer">
              <span className="font-semibold">{selectedProject}</span>
              <ChevronsUpDown className="w-3 h-3 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="px-2 py-2">
                <h3 className="text-xs font-medium text-gray-300">Projects</h3>
              </div>
              {projects.map((project, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setSelectedProject(project)}
                >
                  <span className="text-[13px]">{project}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              className="w-64 pl-10 bg-black border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-400"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="w-9 h-9 border border-gray-700 bg-neutral-950 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors focus:outline-none focus:ring-0">
              <Bell className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-0 w-80" align="end">
              <div className="px-3 py-2 border-b border-gray-700">
                <h3 className="font-semibold text-white">Notifications</h3>
              </div>
              <DropdownMenuItem>
                <div className="flex items-start gap-3 p-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      New user registered
                    </p>
                    <p className="text-xs text-gray-400">
                      john@example.com joined your organization
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-start gap-3 p-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Payment successful
                    </p>
                    <p className="text-xs text-gray-400">
                      Monthly subscription renewed
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-start gap-3 p-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      System update
                    </p>
                    <p className="text-xs text-gray-400">
                      New features available in dashboard
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="w-9 h-9 border border-gray-700 bg-neutral-950 rounded-full hover:border-gray-400 transition-colors focus:outline-none focus:ring-0 overflow-hidden">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
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
            <DropdownMenuContent className="border-0 w-48" align="end">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="w-4 h-4 mr-2" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-[#0a0a0a] border-b border-border relative">
        <nav className="flex items-center px-5 pb-2">
          <div className="flex items-center space-x-8 relative">
            {[
              "Overview",
              "Integrations",
              "Deployments",
              "Activity",
              "Domains",
              "Usage",
              "Observability",
              "Storage",
              "Flags",
              "AI Gateway",
              "Support",
              "Settings",
            ].map((tab, index) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-colors pb-2 ${
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
              initial={false}
              animate={{
                x: (() => {
                  const activeIndex = [
                    "Overview",
                    "Integrations",
                    "Deployments",
                    "Activity",
                    "Domains",
                    "Usage",
                    "Observability",
                    "Storage",
                    "Flags",
                    "AI Gateway",
                    "Support",
                    "Settings",
                  ].indexOf(activeTab);

                  if (activeIndex === -1) return 0;

                  let x = 0;
                  for (let i = 0; i < activeIndex; i++) {
                    x += (tabRefs.current[i]?.offsetWidth || 0) + 32; // 32px is space-x-8
                  }
                  return x;
                })(),
                width: (() => {
                  const activeIndex = [
                    "Overview",
                    "Integrations",
                    "Deployments",
                    "Activity",
                    "Domains",
                    "Usage",
                    "Observability",
                    "Storage",
                    "Flags",
                    "AI Gateway",
                    "Support",
                    "Settings",
                  ].indexOf(activeTab);

                  return tabRefs.current[activeIndex]?.offsetWidth || 0;
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
    </div>
  );
}

export default page;
