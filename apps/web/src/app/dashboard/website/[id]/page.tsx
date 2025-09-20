"use client";
import React from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";
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
    deviceBreakdown: {
      desktop: 65,
      mobile: 30,
      tablet: 5
    },
    browserBreakdown: {
      chrome: 68,
      safari: 18,
      firefox: 10,
      edge: 4
    },
    topPages: [
      { path: "/", views: 4520, title: "Home" },
      { path: "/about", views: 2340, title: "About Us" },
      { path: "/contact", views: 1890, title: "Contact" },
      { path: "/blog", views: 1650, title: "Blog" },
      { path: "/pricing", views: 1230, title: "Pricing" }
    ],
    topCountries: [
      { country: "United States", code: "US", visitors: 3250, percentage: 39.1 },
      { country: "United Kingdom", code: "GB", visitors: 1680, percentage: 20.2 },
      { country: "Germany", code: "DE", visitors: 1120, percentage: 13.5 },
      { country: "France", code: "FR", visitors: 890, percentage: 10.7 },
      { country: "Canada", code: "CA", visitors: 650, percentage: 7.8 },
      { country: "Australia", code: "AU", visitors: 420, percentage: 5.0 },
      { country: "Netherlands", code: "NL", visitors: 310, percentage: 3.7 }
    ],
    recentEvents: [
      { type: "CLICK", element: "signup-button", timestamp: "14:30:25", user: "user_123" },
      { type: "PAGEVIEW", path: "/pricing", timestamp: "14:28:12", user: "user_456" },
      { type: "FORM_SUBMIT", element: "contact-form", timestamp: "14:25:45", user: "user_789" }
    ],
    chartData: [
      { date: "2024-09-01", views: 8200 },
      { date: "2024-09-02", views: 8500 },
      { date: "2024-09-03", views: 9100 },
      { date: "2024-09-04", views: 0 },
      { date: "2024-09-05", views: 0 },
      { date: "2024-09-06", views: 10800 },
      { date: "2024-09-07", views: 0 },
      { date: "2024-09-08", views: 0 },
      { date: "2024-09-09", views: 0 },
      { date: "2024-09-10", views: 12100 },
      { date: "2024-09-11", views: 12300 },
      { date: "2024-09-12", views: 0 },
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
    deviceBreakdown: {
      desktop: 45,
      mobile: 50,
      tablet: 5
    },
    browserBreakdown: {
      chrome: 55,
      safari: 35,
      firefox: 8,
      edge: 2
    },
    topPages: [
      { path: "/", views: 3200, title: "Portfolio" },
      { path: "/projects", views: 2100, title: "Projects" },
      { path: "/skills", views: 1420, title: "Skills" },
      { path: "/contact", views: 980, title: "Contact" },
      { path: "/blog", views: 620, title: "Blog" }
    ],
    topCountries: [
      { country: "Turkey", code: "TR", visitors: 2100, percentage: 40.1 },
      { country: "United States", code: "US", visitors: 1050, percentage: 20.0 },
      { country: "Germany", code: "DE", visitors: 680, percentage: 13.0 },
      { country: "United Kingdom", code: "GB", visitors: 520, percentage: 9.9 },
      { country: "Netherlands", code: "NL", visitors: 420, percentage: 8.0 },
      { country: "France", code: "FR", visitors: 310, percentage: 5.9 },
      { country: "Spain", code: "ES", visitors: 160, percentage: 3.1 }
    ],
    recentEvents: [
      { type: "CLICK", element: "project-link", timestamp: "13:45:12", user: "user_234" },
      { type: "PAGEVIEW", path: "/projects", timestamp: "13:42:30", user: "user_567" },
      { type: "CLICK", element: "contact-button", timestamp: "13:40:15", user: "user_890" }
    ],
    chartData: [
      { date: "2024-09-01", views: 0 },
      { date: "2024-09-02", views: 100 },
      { date: "2024-09-03", views: 9000 },
      { date: "2024-09-04", views: 8800 },
      { date: "2024-09-05", views: 8700 },
      { date: "2024-09-06", views: 8600 },
      { date: "2024-09-07", views: 8500 },
      { date: "2024-09-08", views: 8450 },
      { date: "2024-09-09", views: 8400 },
      { date: "2024-09-10", views: 8380 },
      { date: "2024-09-11", views: 83050 },
      { date: "2024-09-12", views: 8320 },
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
    deviceBreakdown: {
      desktop: 0,
      mobile: 0,
      tablet: 0
    },
    browserBreakdown: {
      chrome: 0,
      safari: 0,
      firefox: 0,
      edge: 0
    },
    topPages: [],
    topCountries: [],
    recentEvents: [],
    chartData: [
      { date: "2024-09-01", views: 0 },
      { date: "2024-09-02", views: 0 },
      { date: "2024-09-03", views: 0 },
      { date: "2024-09-04", views: 0 },
      { date: "2024-09-05", views: 0 },
      { date: "2024-09-06", views: 0 },
      { date: "2024-09-07", views: 0 },
      { date: "2024-09-08", views: 0 },
      { date: "2024-09-09", views: 0 },
      { date: "2024-09-10", views: 0 },
      { date: "2024-09-11", views: 0 },
      { date: "2024-09-12", views: 0 },
    ],
  },
};

export default function WebsiteDetailPage() {
  const params = useParams();
  const websiteId = Number(params.id);
  const website = mockWebsiteData[websiteId as keyof typeof mockWebsiteData];

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
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div
        aria-hidden
        className="z-[1] absolute inset-0 pointer-events-none isolate opacity-30 contain-strict"
      >
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
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
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
                <Filter className="w-4 h-4" />
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
          <div className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">{website.activeSessions}</span> active sessions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">{website.totalEvents}</span> events today
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">{website.conversionRate}</span> conversion rate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 font-medium">
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

          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 font-medium">
                Unique Visitors
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-white">
                {website.uniqueVisitors.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <Users className="w-3 h-3" />
                Active users
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 font-medium">
                Avg. Session Duration
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-white">
                {website.avgSessionDuration}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <Clock className="w-3 h-3" />
                Time on site
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 font-medium">
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

        {/* Views Overview Chart */}
        <Card className="bg-card/50 border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                views: {
                  label: "Views",
                  color: "rgb(255, 255, 255)",
                },
              }}
              className="h-[300px]"
            >
              <AreaChart data={website.chartData}>
                <defs>
                  <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
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
                </defs>
                <XAxis 
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: 'rgb(156, 163, 175)' }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: 'rgb(156, 163, 175)' }}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <ChartTooltip
                  cursor={{ stroke: 'rgb(75, 85, 99)', strokeWidth: 1 }}
                  content={<ChartTooltipContent />}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="rgb(255, 255, 255)"
                  strokeWidth={2}
                  fill="url(#fillViews)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Country Analytics & Device/Browser */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Top Countries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {website.topCountries.map((country) => (
                <div key={country.code} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-white">{country.percentage}%</div>
                    <div className="text-xs text-gray-400">{country.visitors.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Device Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white">Desktop</span>
                </div>
                <span className="text-sm font-medium text-white">{website.deviceBreakdown.desktop}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white">Mobile</span>
                </div>
                <span className="text-sm font-medium text-white">{website.deviceBreakdown.mobile}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tablet className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white">Tablet</span>
                </div>
                <span className="text-sm font-medium text-white">{website.deviceBreakdown.tablet}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Browsers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Chrome</span>
                <span className="text-sm font-medium text-white">{website.browserBreakdown.chrome}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Safari</span>
                <span className="text-sm font-medium text-white">{website.browserBreakdown.safari}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Firefox</span>
                <span className="text-sm font-medium text-white">{website.browserBreakdown.firefox}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Edge</span>
                <span className="text-sm font-medium text-white">{website.browserBreakdown.edge}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages */}
        <Card className="bg-card/50 border-border/50 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Top Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {website.topPages.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs text-white font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{page.title}</h3>
                    <p className="text-gray-400 text-xs">{page.path}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    {page.views.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">views</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-white">Recent Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {website.recentEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{event.type}</h3>
                    <p className="text-gray-400 text-xs">{event.element || event.path}</p>
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
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}