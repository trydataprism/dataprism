"use client";

import React, { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface Tab {
  name: string;
  path: string;
}

interface NavigationProps {
  tabs?: Tab[];
}

export function Navigation({ tabs: propTabs }: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  const getActiveTab = () => {
    if (pathname === "/dashboard") return "Websites";
    if (pathname === "/dashboard/events") return "Events";
    if (pathname === "/dashboard/sessions") return "Sessions";
    if (pathname === "/dashboard/goals") return "Goals";
    if (pathname === "/dashboard/ai") return "AI";
    if (pathname === "/dashboard/monitoring") return "Monitoring";
    if (pathname === "/dashboard/settings") return "Settings";
    return "Websites";
  };

  const activeTab = getActiveTab();

  return (
    <div className="bg-[#0a0a0a] border-b border-border/50 relative pt-1.5">
      <nav className="flex items-center px-5 pb-2">
        <div className="flex items-center space-x-8 relative">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => router.push(tab.path)}
              className={`text-sm font-medium transition-colors pb-2 cursor-pointer ${
                activeTab === tab.name
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.name}
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
                const activeIndex = tabs.findIndex(tab => tab.name === activeTab);

                if (activeIndex === -1) return 0;

                let x = 0;
                for (let i = 0; i < activeIndex; i++) {
                  x += (tabRefs.current[i]?.offsetWidth || 0) + 32; // 32px is space-x-8
                }
                return x;
              })(),
              width: (() => {
                const activeIndex = tabs.findIndex(tab => tab.name === activeTab);
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
  );
}