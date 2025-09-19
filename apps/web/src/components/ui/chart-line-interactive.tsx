"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartLineInteractiveProps {
  data?: Array<{ date: string; views: number }>;
  className?: string;
}

const defaultChartData = [
  { date: "2024-09-01", views: 186 },
  { date: "2024-09-02", views: 305 },
  { date: "2024-09-03", views: 237 },
  { date: "2024-09-04", views: 273 },
  { date: "2024-09-05", views: 209 },
  { date: "2024-09-06", views: 214 },
  { date: "2024-09-07", views: 290 },
  { date: "2024-09-08", views: 320 },
  { date: "2024-09-09", views: 180 },
  { date: "2024-09-10", views: 380 },
  { date: "2024-09-11", views: 420 },
  { date: "2024-09-12", views: 290 },
  { date: "2024-09-13", views: 340 },
  { date: "2024-09-14", views: 220 },
  { date: "2024-09-15", views: 170 },
  { date: "2024-09-16", views: 190 },
  { date: "2024-09-17", views: 360 },
  { date: "2024-09-18", views: 410 },
  { date: "2024-09-19", views: 180 },
];

const chartConfig = {
  views: {
    label: "Views",
    color: "#ffffff",
  },
} satisfies ChartConfig;

export function ChartLineInteractive({
  data = defaultChartData,
  className,
}: ChartLineInteractiveProps) {
  return (
    <div className={className}>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[56px] w-full"
      >
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            top: 20,
            left: 8,
            right: 8,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={false}
          />
          <YAxis
            hide
            domain={[
              (dataMin: number) =>
                Math.floor(dataMin - Math.abs(dataMin) * 0.05),
              (dataMax: number) =>
                Math.ceil(dataMax + Math.abs(dataMax) * 0.05),
            ]}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[140px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />
          <Line
            dataKey="views"
            type="linear"
            stroke="#ffffff"
            strokeWidth={1.75}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
