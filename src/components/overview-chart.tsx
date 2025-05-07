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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function OverviewChart({
  data,
  percentageChange,
}: {
  data: { date: string; count: number }[];
  percentageChange: number;
}) {
  const chartConfig = {
    date: {
      label: "Date",
    },
    count: {
      label: "Users Joined",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-black border-zinc-900">
      <CardHeader>
        <CardTitle>New Members</CardTitle>
        <CardDescription>Showing user joins over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px] dark">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={Math.floor(data.length / 10)}
              minTickGap={10}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="count"
              type="natural"
              fill="var(--color-count)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {percentageChange > 0 && (
          <div className="flex gap-2 font-medium leading-none">
            Trending {percentageChange >= 0 ? "up" : "down"} by{" "}
            {Math.abs(percentageChange).toFixed(1)}% this week{" "}
            {percentageChange >= 0 && <TrendingUp className="h-4 w-4" />}
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Based on members who joined in the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
