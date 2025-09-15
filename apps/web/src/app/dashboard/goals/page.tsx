import React from "react";
import { Target, Plus, TrendingUp, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Goals",
  description: "Set up and monitor conversion goals, funnels, and key performance indicators.",
};

// Mock data - replace with real data from your API
const goals = [
  {
    id: 1,
    name: "Newsletter Signup",
    description: "Get users to subscribe to newsletter",
    target: 100,
    current: 67,
    status: "active",
    type: "conversion",
    website: "spadey.ninja",
  },
  {
    id: 2,
    name: "Contact Form Submission",
    description: "Increase contact form completions",
    target: 50,
    current: 23,
    status: "active",
    type: "conversion",
    website: "chefharun.ninja",
  },
  {
    id: 3,
    name: "Product Purchase",
    description: "Complete purchase funnel",
    target: 25,
    current: 25,
    status: "completed",
    type: "revenue",
    website: "spadey.ninja",
  },
];

export default function GoalsPage() {
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
              <Target className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Goals</h1>
                <p className="text-gray-400 text-xs">
                  Track conversion goals and KPIs
                </p>
              </div>
            </div>
            <Button className="bg-white hover:bg-gray-100 text-black text-xs px-2.5 py-1.5">
              <Plus className="w-3.5 h-3.5 mr-1" />
              New Goal
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">3</span> active goals
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">67%</span> avg completion
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 w-7 h-7"
              >
                <BarChart3 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {goal.name}
                      </h3>
                      <p className="text-gray-400 text-xs">{goal.website}</p>
                    </div>
                  </div>
                  {goal.status === "completed" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <p className="text-gray-300 text-xs">{goal.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-medium">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (goal.current / goal.target) * 100)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        {Math.round((goal.current / goal.target) * 100)}% complete
                      </span>
                      <span className="text-gray-400">
                        {goal.type === "revenue" ? "$" : ""}{goal.target - goal.current} remaining
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No goals yet
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Create your first goal to start tracking conversions
            </p>
            <Button className="bg-white hover:bg-gray-100 text-black text-sm px-4 py-2">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Goal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}