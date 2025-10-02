import React from "react";
import {
  Brain,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "AI",
  description:
    "Get intelligent analytics insights, predictions, and automated recommendations.",
};

// Mock data - replace with real data from your API
const insights = [
  {
    id: 1,
    title: "Traffic Spike Detected",
    description: "Your website traffic increased by 45% in the last 24 hours",
    type: "trend",
    confidence: 92,
    impact: "high",
    recommendation: "Consider scaling your infrastructure",
  },
  {
    id: 2,
    title: "Bounce Rate Optimization",
    description: "Homepage bounce rate is 15% higher than industry average",
    type: "optimization",
    confidence: 87,
    impact: "medium",
    recommendation: "Improve page load speed and content relevance",
  },
  {
    id: 3,
    title: "Conversion Opportunity",
    description: "Users from mobile devices have 30% lower conversion rate",
    type: "opportunity",
    confidence: 78,
    impact: "high",
    recommendation: "Optimize mobile user experience and checkout flow",
  },
];

export default function AIPage() {
  return (
    <div className="bg-background">
      {/* Background Effects */}
      <div
        aria-hidden
        className="z-[1] absolute inset-0 pointer-events-none isolate opacity-30 contain-strict"
      >
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-gray-400" />
              <div>
                <h1 className="text-xl font-bold text-white">AI Insights</h1>
                <p className="text-gray-400 text-xs">
                  Intelligent analytics and recommendations
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 w-8 h-8"
              >
                <Zap className="w-3.5 h-3.5" />
              </Button>
              <Button className="bg-white hover:bg-gray-100 text-black text-xs px-2.5 py-1.5">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Brain className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">3</span> active
                  insights
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-xs">
                  <span className="font-semibold text-white">92%</span> avg
                  confidence
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

        {/* AI Insights */}
        <div className="space-y-4">
          {insights.map((insight) => (
            <Card
              key={insight.id}
              className="bg-card/50 border-border/50 hover:border-border hover:bg-card/70 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {insight.type === "trend" && (
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                    )}
                    {insight.type === "optimization" && (
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                    )}
                    {insight.type === "opportunity" && (
                      <AlertCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white text-sm">
                        {insight.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            insight.impact === "high"
                              ? "bg-red-500/20 text-red-400"
                              : insight.impact === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {insight.impact}
                        </span>
                        <span className="text-xs text-gray-400">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs mb-3">
                      {insight.description}
                    </p>
                    <div className="bg-background/30 rounded p-2 border border-border/30">
                      <p className="text-xs text-gray-300">
                        <span className="font-medium text-white">
                          Recommendation:
                        </span>{" "}
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {insights.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No insights yet
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              AI will analyze your data and provide insights once you have
              enough traffic
            </p>
            <Button className="bg-white hover:bg-gray-100 text-black text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Initial Insights
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
