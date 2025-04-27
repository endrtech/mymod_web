"use client";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { getKpis } from "@/app/actions/getKpis";

export function SectionCards() {
  const [kpis, setKpis] = React.useState<{
    clerkTotal: number;
    clerkThisMonth: number;
    clerkLastMonth: number;
    guildTotal: number;
    guildThisMonth: number;
    guildLastMonth: number;
  } | null>(null);

  React.useEffect(() => {
    async function loadKpis() {
      const data = await getKpis();
      setKpis(data);
    }
    loadKpis();
  }, []);

  const clerkGrowth = kpis
    ? ((kpis.clerkThisMonth - kpis.clerkLastMonth) /
        Math.max(kpis.clerkLastMonth, 1)) *
      100
    : 0;
  const guildGrowth = kpis
    ? ((kpis.guildThisMonth - kpis.guildLastMonth) /
        Math.max(kpis.guildLastMonth, 1)) *
      100
    : 0;
  const growthRate = kpis
    ? ((kpis.guildThisMonth -
        kpis.guildLastMonth +
        (kpis.clerkThisMonth - kpis.clerkLastMonth)) /
        Math.max(kpis.guildLastMonth + kpis.clerkLastMonth, 1)) *
      100
    : 0;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/*<Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>*/}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis?.clerkTotal.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className={clerkGrowth >= 0 ? "text-green-500" : "text-red-500"}
            >
              {clerkGrowth >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {clerkGrowth >= 0 ? "+" : ""}
              {clerkGrowth.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {clerkGrowth >= 0 ? "Trending up" : "Trending down"}{" "}
            {clerkGrowth.toFixed(1)}%
            {clerkGrowth >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {clerkGrowth >= 0
              ? "User growth exceeds targets"
              : "Acquisition needs attention"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Guilds</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis?.guildTotal.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className={guildGrowth >= 0 ? "text-green-500" : "text-red-500"}
            >
              {guildGrowth >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {guildGrowth >= 0 ? "+" : ""}
              {guildGrowth.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {guildGrowth >= 0 ? "Trending up" : "Trending down"}{" "}
            {clerkGrowth.toFixed(1)}%
            {guildGrowth >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {guildGrowth >= 0
              ? "User growth exceeds targets"
              : "Acquisition needs attention"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {growthRate.toLocaleString()}%
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className={growthRate >= 0 ? "text-green-500" : "text-red-500"}
            >
              {growthRate >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {growthRate >= 0 ? "+" : ""}
              {growthRate.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {growthRate >= 0 ? "Trending up" : "Trending down"}{" "}
            {growthRate.toFixed(1)}%
            {growthRate >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {growthRate >= 0
              ? "User growth exceeds targets"
              : "Acquisition needs attention"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
