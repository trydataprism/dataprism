"use client";

import React from "react";
import Image from "next/image";
import {
  User,
  Settings,
  LogOut,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Building2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface UserDropdownProps {
  session: UserSession | null;
}

export function UserDropdown({ session }: UserDropdownProps) {
  if (!session) return null;

  return (
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
  );
}