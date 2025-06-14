"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InteractiveCard } from "@/components/interactive-card";
import { useRef, useState, useEffect } from "react";
import { LiquidGlassCard } from "./beta/liquid-glass-card";
import LiquidGlass from "./beta/liquid-glass/card";

interface OverviewChartProps {
  data: { date: string; count: number }[];
  percentageChange: number;
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function OverviewChart({
  data,
  percentageChange,
}: OverviewChartProps) {
  const chartConfig = {
    date: {
      label: "Date",
    },
    count: {
      label: "Users Joined",
      color: "#FFFFFF"
    },
  } satisfies ChartConfig;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 300 });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mutedColor, setMutedColor] = useState("hsl(var(--muted))");
  const [mutedForegroundColor, setMutedForegroundColor] = useState("hsl(var(--background))");

  return (
    <LiquidGlass className="w-full h-full rounded-[999px] justify-start text-foreground" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0}>
      <div className="p-6">
        <CardHeader className="text-foreground">
          <CardTitle>New Members</CardTitle>
          <CardDescription className="text-foreground">Showing user joins over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer ref={chartContainerRef} config={chartConfig} className="w-full h-[300px] mt-4 relative">
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
                bottom: 40,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ stroke: mutedForegroundColor }}
                tickLine={{ stroke: "var(--foreground)" }}
                axisLine={false}
                tickMargin={10}
                interval={Math.floor(data?.length / 10)}
                minTickGap={10}
                tickFormatter={(value) => {
                  return value;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" className="lgBtn bg-background/70 backdrop-blur-2xl!" />}
                animationDuration={200}
              />
              <Bar
                dataKey="count"
                type="natural"
                fill="var(--color-count)"
                fillOpacity={0.6}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {percentageChange > 0 && (
            <div className="flex gap-2 font-medium leading-none text-foreground">
              Trending {percentageChange >= 0 ? "up" : "down"} by{" "}
              {Math.abs(percentageChange).toFixed(1)}% this week{" "}
              {percentageChange >= 0 && <TrendingUp className="h-4 w-4" />}
            </div>
          )}
          <div className="leading-none text-foreground">
            Based on members who joined in the last 7 days
          </div>
        </CardFooter>
      </div>
    </LiquidGlass>
  );
}
