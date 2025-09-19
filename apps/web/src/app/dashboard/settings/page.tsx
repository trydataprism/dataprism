"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SettingsSidebar } from "@/components/settings/settings-sidebar";

export default function SettingsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-card/95 backdrop-blur-sm border-r border-border/50">
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Settings</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <SettingsSidebar
              isMobile={true}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto flex min-h-screen">
        {/* Left Sidebar - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0 sticky top-0 self-start">
          <SettingsSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Background Effects */}
          <div
            aria-hidden
            className="z-[1] absolute inset-0 pointer-events-none isolate opacity-30 contain-strict"
          >
            <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
            <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          </div>

          <div className="relative z-10 p-6 w-full">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <div>
                    <h1 className="text-xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 text-xs">
                      Manage your account preferences and application settings
                    </p>
                  </div>
                </div>
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
              {/* Account Settings */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <User className="w-4 h-4 text-gray-400" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <Bell className="w-4 h-4 text-gray-400" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Email Notifications
                      </p>
                      <p className="text-xs text-gray-400">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Push Notifications
                      </p>
                      <p className="text-xs text-gray-400">
                        Get notified about important updates
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Analytics Reports
                      </p>
                      <p className="text-xs text-gray-400">
                        Weekly analytics summaries
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <Shield className="w-4 h-4 text-gray-400" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="current-password"
                      className="text-sm text-gray-300"
                    >
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter current password"
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="new-password"
                        className="text-sm text-gray-300"
                      >
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="confirm-password"
                        className="text-sm text-gray-300"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Appearance */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <Palette className="w-4 h-4 text-gray-400" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Dark Mode
                      </p>
                      <p className="text-xs text-gray-400">Use dark theme</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Compact Mode
                      </p>
                      <p className="text-xs text-gray-400">
                        Use compact interface
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* API Settings */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-white text-lg">
                    <Globe className="w-4 h-4 text-gray-400" />
                    API Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key" className="text-sm text-gray-300">
                      API Key
                    </Label>
                    <Input
                      id="api-key"
                      placeholder="Your API key"
                      className="bg-background/50 border-border/50 font-mono text-sm"
                      readOnly
                    />
                    <p className="text-xs text-gray-400">
                      Use this key to access the Dataprism API
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button className="bg-white hover:bg-gray-100 text-black text-sm px-4 py-2">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
