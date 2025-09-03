"use client";

import React, { useState } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
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
      <div className="flex items-center justify-between py-4 px-5 bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <Image src="/dark_logo.svg" width={20} height={20} alt="Dataprism" />

          <ChevronRight className="w-4 h-4 text-gray-400" />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-white hover:bg-neutral-950/70 px-2 py-1.5 rounded text-sm focus:outline-none focus:ring-0">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-black text-[10px] font-semibold">
                {selectedOrg.initial}
              </div>
              <span className="font-semibold">{selectedOrg.name}</span>
              <ChevronsUpDown className="w-4 h-4 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-0">
              {organizations.map((org, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setSelectedOrg(org)}
                >
                  <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center text-black text-[10px] font-semibold mr-2">
                    {org.initial}
                  </div>
                  {org.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ChevronRight className="w-4 h-4 text-gray-400" />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-white hover:bg-neutral-950/70 px-2 py-1.5 rounded text-sm focus:outline-none focus:ring-0">
              <span className="font-semibold">{selectedProject}</span>
              <ChevronsUpDown className="w-4 h-4 text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-0">
              {projects.map((project, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setSelectedProject(project)}
                >
                  {project}
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
      <div className="bg-[#0a0a0a] border-b border-gray-800">
        <nav className="flex items-center px-5 py-3">
          <div className="flex items-center space-x-8">
            <a
              href="#"
              className="text-white text-sm font-medium border-b-2 border-white pb-1"
            >
              Overview
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Integrations
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Deployments
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Activity
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Domains
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Usage
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Observability
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Storage
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Flags
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              API Gateway
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
            >
              Settings
            </a>
          </div>
        </nav>
      </div>

      <div className="rounded-t-xl flex-1 bg-black"></div>
    </div>
  );
}

export default page;
