"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Globe,
  ArrowLeft,
  RefreshCw,
  ArrowUpRight,
  TrendingUp,
  Users,
  Clock,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Filter,
  Download,
  Activity,
  BarChart3,
  MapPin,
  Flag,
  Calendar,
  Settings,
  MoreHorizontal,
  ExternalLink,
  ChevronDown,
  Zap,
  Target,
  MousePointer,
  MousePointerClick,
  FileText,
  Search,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const mockWebsiteData = {
  1: {
    id: 1,
    name: "spadey",
    url: "spadey.ninja",
    views: 12450,
    change: 24,
    uniqueVisitors: 8320,
    avgSessionDuration: "2m 45s",
    bounceRate: "34%",
    activeSessions: 12,
    totalEvents: 1247,
    conversionRate: "4.2%",
    pageViews: 18920,
    newVisitors: 5230,
    returningVisitors: 3090,
    avgPageViews: 2.3,
    deviceBreakdown: {
      desktop: 65,
      mobile: 30,
      tablet: 5,
    },
    browserBreakdown: {
      chrome: 68,
      safari: 18,
      firefox: 10,
      edge: 4,
    },
    topPages: [
      { path: "/", views: 4520, title: "Home", change: 12 },
      { path: "/about", views: 2340, title: "About Us", change: -5 },
      { path: "/contact", views: 1890, title: "Contact", change: 8 },
      { path: "/blog", views: 1650, title: "Blog", change: 15 },
      { path: "/pricing", views: 1230, title: "Pricing", change: 22 },
    ],
    topCountries: [
      {
        country: "United States",
        code: "US",
        visitors: 3250,
        percentage: 39.1,
        flag: "🇺🇸",
      },
      {
        country: "United Kingdom",
        code: "GB",
        visitors: 1680,
        percentage: 20.2,
        flag: "🇬🇧",
      },
      {
        country: "Germany",
        code: "DE",
        visitors: 1120,
        percentage: 13.5,
        flag: "🇩🇪",
      },
      {
        country: "France",
        code: "FR",
        visitors: 890,
        percentage: 10.7,
        flag: "🇫🇷",
      },
      {
        country: "Canada",
        code: "CA",
        visitors: 650,
        percentage: 7.8,
        flag: "🇨🇦",
      },
      {
        country: "Australia",
        code: "AU",
        visitors: 420,
        percentage: 5.0,
        flag: "🇦🇺",
      },
      {
        country: "Netherlands",
        code: "NL",
        visitors: 310,
        percentage: 3.7,
        flag: "🇳🇱",
      },
    ],
    recentEvents: [
      {
        type: "CLICK",
        element: "signup-button",
        timestamp: "14:30:25",
        user: "user_123",
        page: "/pricing",
      },
      {
        type: "PAGEVIEW",
        path: "/pricing",
        timestamp: "14:28:12",
        user: "user_456",
        page: "/pricing",
      },
      {
        type: "FORM_SUBMIT",
        element: "contact-form",
        timestamp: "14:25:45",
        user: "user_789",
        page: "/contact",
      },
      {
        type: "SCROLL",
        element: "page",
        timestamp: "14:22:18",
        user: "user_101",
        page: "/blog",
      },
      {
        type: "CLICK",
        element: "read-more",
        timestamp: "14:20:33",
        user: "user_202",
        page: "/blog",
      },
    ],
    chartData: [
      { date: "2024-09-01", views: 8200, visitors: 5200, sessions: 4800 },
      { date: "2024-09-02", views: 8500, visitors: 5400, sessions: 5000 },
      { date: "2024-09-03", views: 9100, visitors: 5800, sessions: 5400 },
      { date: "2024-09-04", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-05", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-06", views: 10800, visitors: 6800, sessions: 6200 },
      { date: "2024-09-07", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-08", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-09", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-10", views: 12100, visitors: 7600, sessions: 7000 },
      { date: "2024-09-11", views: 12300, visitors: 7800, sessions: 7200 },
      { date: "2024-09-12", views: 0, visitors: 0, sessions: 0 },
    ],
    hourlyData: [
      { hour: "00:00", views: 45, visitors: 30 },
      { hour: "02:00", views: 23, visitors: 15 },
      { hour: "04:00", views: 12, visitors: 8 },
      { hour: "06:00", views: 67, visitors: 45 },
      { hour: "08:00", views: 234, visitors: 156 },
      { hour: "10:00", views: 456, visitors: 304 },
      { hour: "12:00", views: 678, visitors: 452 },
      { hour: "14:00", views: 789, visitors: 526 },
      { hour: "16:00", views: 567, visitors: 378 },
      { hour: "18:00", views: 345, visitors: 230 },
      { hour: "20:00", views: 234, visitors: 156 },
      { hour: "22:00", views: 123, visitors: 82 },
    ],
    referrers: [
      { source: "Direct", visitors: 3200, percentage: 38.5 },
      { source: "Google", visitors: 2100, percentage: 25.3 },
      { source: "Social Media", visitors: 1200, percentage: 14.4 },
      { source: "Email", visitors: 890, percentage: 10.7 },
      { source: "Other", visitors: 930, percentage: 11.1 },
    ],
  },
  2: {
    id: 2,
    name: "portfolio",
    url: "chefharun.ninja",
    views: 8320,
    change: -12,
    uniqueVisitors: 5240,
    avgSessionDuration: "3m 12s",
    bounceRate: "28%",
    activeSessions: 5,
    totalEvents: 892,
    conversionRate: "2.8%",
    pageViews: 12480,
    newVisitors: 3140,
    returningVisitors: 2100,
    avgPageViews: 2.4,
    deviceBreakdown: {
      desktop: 45,
      mobile: 50,
      tablet: 5,
    },
    browserBreakdown: {
      chrome: 55,
      safari: 35,
      firefox: 8,
      edge: 2,
    },
    topPages: [
      { path: "/", views: 3200, title: "Portfolio", change: -8 },
      { path: "/projects", views: 2100, title: "Projects", change: 15 },
      { path: "/skills", views: 1420, title: "Skills", change: 3 },
      { path: "/contact", views: 980, title: "Contact", change: -2 },
      { path: "/blog", views: 620, title: "Blog", change: 12 },
    ],
    topCountries: [
      {
        country: "Turkey",
        code: "TR",
        visitors: 2100,
        percentage: 40.1,
        flag: "🇹🇷",
      },
      {
        country: "United States",
        code: "US",
        visitors: 1050,
        percentage: 20.0,
        flag: "🇺🇸",
      },
      {
        country: "Germany",
        code: "DE",
        visitors: 680,
        percentage: 13.0,
        flag: "🇩🇪",
      },
      {
        country: "United Kingdom",
        code: "GB",
        visitors: 520,
        percentage: 9.9,
        flag: "🇬🇧",
      },
      {
        country: "Netherlands",
        code: "NL",
        visitors: 420,
        percentage: 8.0,
        flag: "🇳🇱",
      },
      {
        country: "France",
        code: "FR",
        visitors: 310,
        percentage: 5.9,
        flag: "🇫🇷",
      },
      {
        country: "Spain",
        code: "ES",
        visitors: 160,
        percentage: 3.1,
        flag: "🇪🇸",
      },
    ],
    recentEvents: [
      {
        type: "CLICK",
        element: "project-link",
        timestamp: "13:45:12",
        user: "user_234",
        page: "/projects",
      },
      {
        type: "PAGEVIEW",
        path: "/projects",
        timestamp: "13:42:30",
        user: "user_567",
        page: "/projects",
      },
      {
        type: "CLICK",
        element: "contact-button",
        timestamp: "13:40:15",
        user: "user_890",
        page: "/contact",
      },
      {
        type: "SCROLL",
        element: "page",
        timestamp: "13:38:22",
        user: "user_111",
        page: "/",
      },
      {
        type: "CLICK",
        element: "github-link",
        timestamp: "13:35:45",
        user: "user_333",
        page: "/projects",
      },
    ],
    chartData: [
      { date: "2024-09-01", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-02", views: 100, visitors: 80, sessions: 70 },
      { date: "2024-09-03", views: 9000, visitors: 7200, sessions: 6800 },
      { date: "2024-09-04", views: 8800, visitors: 7040, sessions: 6600 },
      { date: "2024-09-05", views: 8700, visitors: 6960, sessions: 6500 },
      { date: "2024-09-06", views: 8600, visitors: 6880, sessions: 6400 },
      { date: "2024-09-07", views: 8500, visitors: 6800, sessions: 6300 },
      { date: "2024-09-08", views: 8450, visitors: 6760, sessions: 6250 },
      { date: "2024-09-09", views: 8400, visitors: 6720, sessions: 6200 },
      { date: "2024-09-10", views: 8380, visitors: 6704, sessions: 6180 },
      { date: "2024-09-11", views: 83050, visitors: 66440, sessions: 61200 },
      { date: "2024-09-12", views: 8320, visitors: 6656, sessions: 6140 },
    ],
    hourlyData: [
      { hour: "00:00", views: 12, visitors: 8 },
      { hour: "02:00", views: 8, visitors: 5 },
      { hour: "04:00", views: 5, visitors: 3 },
      { hour: "06:00", views: 15, visitors: 10 },
      { hour: "08:00", views: 45, visitors: 30 },
      { hour: "10:00", views: 78, visitors: 52 },
      { hour: "12:00", views: 95, visitors: 63 },
      { hour: "14:00", views: 120, visitors: 80 },
      { hour: "16:00", views: 85, visitors: 57 },
      { hour: "18:00", views: 65, visitors: 43 },
      { hour: "20:00", views: 45, visitors: 30 },
      { hour: "22:00", views: 25, visitors: 17 },
    ],
    referrers: [
      { source: "Direct", visitors: 2100, percentage: 40.1 },
      { source: "LinkedIn", visitors: 1050, percentage: 20.0 },
      { source: "GitHub", visitors: 680, percentage: 13.0 },
      { source: "Google", visitors: 520, percentage: 9.9 },
      { source: "Other", visitors: 890, percentage: 17.0 },
    ],
  },
  3: {
    id: 3,
    name: "blog",
    url: "myblog.com",
    views: 0,
    change: 0,
    uniqueVisitors: 0,
    avgSessionDuration: "0s",
    bounceRate: "0%",
    activeSessions: 0,
    totalEvents: 0,
    conversionRate: "0%",
    pageViews: 0,
    newVisitors: 0,
    returningVisitors: 0,
    avgPageViews: 0,
    deviceBreakdown: {
      desktop: 0,
      mobile: 0,
      tablet: 0,
    },
    browserBreakdown: {
      chrome: 0,
      safari: 0,
      firefox: 0,
      edge: 0,
    },
    topPages: [],
    topCountries: [],
    recentEvents: [],
    chartData: [
      { date: "2024-09-01", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-02", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-03", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-04", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-05", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-06", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-07", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-08", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-09", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-10", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-11", views: 0, visitors: 0, sessions: 0 },
      { date: "2024-09-12", views: 0, visitors: 0, sessions: 0 },
    ],
    hourlyData: [],
    referrers: [],
  },
};

export default function WebsiteDetailPage() {
  const params = useParams();
  const websiteId = Number(params.id);
  const website = mockWebsiteData[websiteId as keyof typeof mockWebsiteData];
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [filterOpen, setFilterOpen] = useState(false);

  const timeRanges = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "traffic", label: "Traffic", icon: Activity },
    { id: "audience", label: "Audience", icon: Users },
    { id: "behavior", label: "Behavior", icon: MousePointer },
    { id: "realtime", label: "Real-time", icon: Zap },
  ];

  if (!website) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Website not found
          </h3>
          <p className="text-gray-400 mb-4 text-sm">
            The website you're looking for doesn't exist.
          </p>
          <Link href="/dashboard">
            <Button className="bg-white hover:bg-gray-100 text-black text-sm px-3 py-1.5">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Background Effects */}
      <div
        aria-hidden
        className="z-[1] absolute inset-0 pointer-events-none isolate opacity-30 contain-strict"
      >
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-xl font-bold text-white">{website.name}</h1>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <span>{website.url}</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Time Range Selector */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 flex items-center gap-2 text-gray-400 hover:text-white hover:bg-card/70 transition-all duration-200 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">
                    {timeRanges.find((t) => t.value === timeRange)?.label}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                <AnimatePresence>
                  {filterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 bg-card border border-border rounded-lg shadow-lg min-w-[120px] z-50"
                    >
                      <div className="p-1">
                        {timeRanges.map((range) => (
                          <button
                            key={range.value}
                            onClick={() => {
                              setTimeRange(range.value);
                              setFilterOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors duration-200 cursor-pointer ${
                              timeRange === range.value
                                ? "bg-white text-black"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-card/50 border border-border/50 rounded-lg px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">
                    {website.activeSessions}
                  </span>{" "}
                  active sessions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">
                    {website.totalEvents}
                  </span>{" "}
                  events today
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">
                    {website.conversionRate}
                  </span>{" "}
                  conversion rate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">
                    {website.avgSessionDuration}
                  </span>{" "}
                  avg session
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-1 bg-card/30 border border-border/30 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400 font-medium flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Total Views
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-white">
                      {website.views.toLocaleString()}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs mt-1 ${
                        website.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {website.change >= 0 ? "+" : ""}
                      {website.change}% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400 font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Unique Visitors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-white">
                      {website.uniqueVisitors.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Activity className="w-3 h-3" />
                      {website.newVisitors.toLocaleString()} new,{" "}
                      {website.returningVisitors.toLocaleString()} returning
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400 font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Avg. Session Duration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-white">
                      {website.avgSessionDuration}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <FileText className="w-3 h-3" />
                      {website.avgPageViews} pages per session
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400 font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Bounce Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-white">
                      {website.bounceRate}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Activity className="w-3 h-3" />
                      Single page visits
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Views Chart */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Views Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      views: {
                        label: "Views",
                        color: "rgb(255, 255, 255)",
                      },
                      visitors: {
                        label: "Visitors",
                        color: "rgb(156, 163, 175)",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <AreaChart data={website.chartData}>
                      <defs>
                        <linearGradient
                          id="fillViews"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="rgb(255, 255, 255)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="rgb(255, 255, 255)"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="fillVisitors"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="rgb(156, 163, 175)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="rgb(156, 163, 175)"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "rgb(156, 163, 175)" }}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          });
                        }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "rgb(156, 163, 175)" }}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <ChartTooltip
                        cursor={{ stroke: "rgb(75, 85, 99)", strokeWidth: 1 }}
                        content={<ChartTooltipContent />}
                      />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="rgb(255, 255, 255)"
                        strokeWidth={2}
                        fill="url(#fillViews)"
                      />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        stroke="rgb(156, 163, 175)"
                        strokeWidth={2}
                        fill="url(#fillVisitors)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Top Pages & Countries */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Top Pages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {website.topPages.map((page, index) => (
                      <div
                        key={page.path}
                        className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/30 hover:border-border/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs text-white font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-sm">
                              {page.title}
                            </h3>
                            <p className="text-gray-400 text-xs">{page.path}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">
                            {page.views.toLocaleString()}
                          </div>
                          <div
                            className={`text-xs ${
                              page.change >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {page.change >= 0 ? "+" : ""}
                            {page.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Top Countries
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {website.topCountries.map((country) => (
                      <div
                        key={country.code}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{country.flag}</span>
                          <span className="text-sm text-white">
                            {country.country}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium text-white">
                            {country.percentage}%
                          </div>
                          <div className="text-xs text-gray-400">
                            {country.visitors.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "traffic" && (
            <motion.div
              key="traffic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Traffic Sources */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Traffic Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {website.referrers.map((referrer, index) => (
                      <div
                        key={referrer.source}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs text-white font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm text-white">
                            {referrer.source}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-bold text-white">
                              {referrer.percentage}%
                            </div>
                            <div className="text-xs text-gray-400">
                              {referrer.visitors.toLocaleString()} visitors
                            </div>
                          </div>
                          <div className="w-20 h-2 bg-background/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-500"
                              style={{ width: `${referrer.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Hourly Traffic */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Hourly Traffic (Today)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      views: {
                        label: "Views",
                        color: "rgb(255, 255, 255)",
                      },
                      visitors: {
                        label: "Visitors",
                        color: "rgb(156, 163, 175)",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <BarChart data={website.hourlyData}>
                      <XAxis
                        dataKey="hour"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "rgb(156, 163, 175)" }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "rgb(156, 163, 175)" }}
                      />
                      <ChartTooltip
                        cursor={{ fill: "rgb(75, 85, 99)", opacity: 0.3 }}
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey="views"
                        fill="rgb(255, 255, 255)"
                        radius={[2, 2, 0, 0]}
                      />
                      <Bar
                        dataKey="visitors"
                        fill="rgb(156, 163, 175)"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "audience" && (
            <motion.div
              key="audience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Device & Browser Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Monitor className="w-5 h-5" />
                      Device Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-white">Desktop</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-white">
                            {website.deviceBreakdown.desktop}%
                          </span>
                          <div className="w-16 h-2 bg-background/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-500"
                              style={{
                                width: `${website.deviceBreakdown.desktop}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-white">Mobile</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-white">
                            {website.deviceBreakdown.mobile}%
                          </span>
                          <div className="w-16 h-2 bg-background/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-500"
                              style={{
                                width: `${website.deviceBreakdown.mobile}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Tablet className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-white">Tablet</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-white">
                            {website.deviceBreakdown.tablet}%
                          </span>
                          <div className="w-16 h-2 bg-background/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-500"
                              style={{
                                width: `${website.deviceBreakdown.tablet}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Browsers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Chrome</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-white">
                            {website.browserBreakdown.chrome}%
                          </span>
                          <div className="w-16 h-2 bg-background/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-500"
                              style={{
                                width: `${website.browserBreakdown.chrome}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Safari</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-white">
                            {website.browserBreakdown.safari}%
                          </span>
                          <div className="w-16 h-2 bg-background/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-500"
                              style={{
                                width: `${website.browserBreakdown.safari}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Firefox</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-white">
                            {website.browserBreakdown.firefox}%
                          </span>
                          <div className="w-16 h-2 bg-background/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-500"
                              style={{
                                width: `${website.browserBreakdown.firefox}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Edge</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-white">
                            {website.browserBreakdown.edge}%
                          </span>
                          <div className="w-16 h-2 bg-background/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-500"
                              style={{
                                width: `${website.browserBreakdown.edge}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "behavior" && (
            <motion.div
              key="behavior"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Recent Events */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MousePointerClick className="w-5 h-5" />
                    Recent Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {website.recentEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/30 hover:border-border/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div>
                          <h3 className="font-semibold text-white text-sm">
                            {event.type}
                          </h3>
                          <p className="text-gray-400 text-xs">
                            {event.element || event.path}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{event.user}</span>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {event.page}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "realtime" && (
            <motion.div
              key="realtime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Real-time Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400 font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Active Now
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-white">
                      {website.activeSessions}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Users currently on site
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400 font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Events Today
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-white">
                      {website.totalEvents}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Total interactions
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400 font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Conversion Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-white">
                      {website.conversionRate}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Goal completions
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Activity Feed */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Live Activity Feed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {website.recentEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-background/30 rounded-lg border border-border/30"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="text-sm text-white">
                          {event.type} on {event.page}
                        </div>
                        <div className="text-xs text-gray-400">
                          {event.timestamp} • {event.user}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
