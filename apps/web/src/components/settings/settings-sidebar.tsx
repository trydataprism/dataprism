"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, ChevronRight } from "lucide-react";

interface SettingsItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SettingsSidebarProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const settingsItems: SettingsItem[] = [
  { name: "General", path: "/dashboard/settings", icon: User },
  { name: "Billing", path: "/dashboard/settings/billing", icon: Globe },
  { name: "Invoices", path: "/dashboard/settings/invoices", icon: Globe },
  { name: "Members", path: "/dashboard/settings/members", icon: User },
  {
    name: "Access Groups",
    path: "/dashboard/settings/access-groups",
    icon: Shield,
  },
  { name: "Drains", path: "/dashboard/settings/drains", icon: Globe },
  { name: "Webhooks", path: "/dashboard/settings/webhooks", icon: Globe },
  {
    name: "Security & Privacy",
    path: "/dashboard/settings/security",
    icon: Shield,
  },
  {
    name: "Deployment Protection",
    path: "/dashboard/settings/deployment",
    icon: Shield,
  },
  {
    name: "Microfrontends",
    path: "/dashboard/settings/microfrontends",
    icon: Globe,
  },
  {
    name: "Secure Compute",
    path: "/dashboard/settings/secure-compute",
    icon: Shield,
  },
  {
    name: "Environment Variables",
    path: "/dashboard/settings/env-vars",
    icon: Globe,
  },
  {
    name: "My Notifications",
    path: "/dashboard/settings/notifications",
    icon: Bell,
  },
];

export function SettingsSidebar({
  isMobile = false,
  onItemClick,
}: SettingsSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveItem = () => {
    if (pathname === "/dashboard/settings") return "General";
    return (
      settingsItems.find((item) => pathname.startsWith(item.path))?.name ||
      "General"
    );
  };

  const activeItem = getActiveItem();

  return (
    <div
      className={`w-64 bg-card/30 mt-5 rounded-lg ${
        isMobile ? "block border-r border-border/50 h-full" : "hidden lg:block"
      }`}
    >
      {/* Navigation Items */}
      <nav className="p-4">
        <div className="space-y-1">
          {settingsItems.map((item) => {
            const isActive = activeItem === item.name;
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => {
                  router.push(item.path);
                  onItemClick?.();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
