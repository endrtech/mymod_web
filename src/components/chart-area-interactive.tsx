"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { getAllStats } from "@/app/actions/getAllStats";
import { TrendingUp, RefreshCw } from "lucide-react";

// Helper to get the max Y value
function getMaxValue(data: { users: number; guilds: number }[]) {
  let max = 0;
  data.forEach((item) => {
    const highest = Math.max(item.users, item.guilds);
    if (highest > max) {
      max = highest;
    }
  });
  return max;
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d">("7d");
  const [data, setData] = React.useState<
    { date: string; users: number; guilds: number }[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

  async function fetchData() {
    setLoading(true);

    const res = await getAllStats();
    const { usersGrouped, guildsGrouped } = res;

    const today = new Date();
    let pastDate = new Date();

    if (timeRange === "7d") {
      pastDate.setDate(today.getDate() - 7);
    } else if (timeRange === "30d") {
      pastDate.setDate(today.getDate() - 30);
    } else {
      pastDate.setDate(today.getDate() - 90);
    }

    const fullData: { date: string; users: number; guilds: number }[] = [];
    let current = new Date(pastDate);

    while (current <= today) {
      const dateStr = current.toISOString().slice(0, 10);
      fullData.push({
        date: dateStr,
        users: usersGrouped[dateStr] || 0,
        guilds: guildsGrouped[dateStr] || 0,
      });
      current.setDate(current.getDate() + 1);
    }

    setData(fullData);
    setLastUpdated(new Date());
    setLoading(false);
  }

  React.useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000); // refresh every 60 seconds

    return () => clearInterval(interval);
  }, [timeRange]);

  const chartConfig = {
    users: {
      label: "Users",
      color: "hsl(var(--chart-1))",
    },
    guilds: {
      label: "Guilds",
      color: "hsl(var(--chart-2))",
    },
  } as const;

  const hasData = data.some((d) => d.users > 0 || d.guilds > 0);

  function getTimeAgo(date: Date | null) {
    if (!date) return "";
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  }

  return (
    <Card className="@container/card flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription>
              {timeRange === "90d"
                ? "Total for the last 3 months"
                : timeRange === "30d"
                  ? "Total for the last 30 days"
                  : "Total for the last 7 days"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin-slow" />
            Updated {getTimeAgo(lastUpdated)}
          </div>
        </div>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => {
              if (val) setTimeRange(val as "7d" | "30d" | "90d");
            }}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(val) => setTimeRange(val as "7d" | "30d" | "90d")}
          >
            <SelectTrigger
              className="flex w-40 @[767px]/card:hidden"
              size="sm"
              aria-label="Select a range"
            >
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full items-center justify-center text-muted-foreground"
            >
              Loading...
            </motion.div>
          ) : !hasData ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full items-center justify-center text-muted-foreground"
            >
              No data to display
            </motion.div>
          ) : (
            <motion.div
              key="chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
              whileHover={{
                filter: "drop-shadow(0px 0px 8px hsl(var(--primary)))",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ChartContainer config={chartConfig} className="dark">
                <AreaChart data={data} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    domain={[0, Math.max(2, getMaxValue(data))]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="users"
                    type="monotone"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.2}
                    isAnimationActive
                    animationDuration={800}
                  />
                  <Area
                    dataKey="guilds"
                    type="monotone"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.2}
                    isAnimationActive
                    animationDuration={800}
                  />
                </AreaChart>
              </ChartContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing{" "}
              {timeRange === "90d"
                ? "last 3 months"
                : timeRange === "30d"
                  ? "last 30 days"
                  : "last 7 days"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
