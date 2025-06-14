"use client"
import OverviewChart from "@/components/overview-chart";
import RecentUsers from "@/components/recent-users";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServerStore } from "@/store/server-store";
import { Loader2 } from "lucide-react";
import { getServerById, getServers, getServerStatsGraph } from "@/queries/servers";
import { useQuery } from "@tanstack/react-query";
import { useServer } from "@/context/server-provider";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { GradientBorderCard } from "@/components/gradient-border-card";
import { InteractiveCard } from "@/components/interactive-card";
import { LiquidGlassCard, LiquidGlassCardContent, LiquidGlassCardHeader, LiquidGlassCardTitle } from "@/components/beta/liquid-glass-card";
import { cn } from "@/lib/utils";
import LiquidGlass from "@/components/beta/liquid-glass/card";

export default function DiscordApp() {
  const serverId = useServerStore((state) => state.currentServerId) || "";
  const { currentServerId, isLoading: isServerContextLoading } = useServer();

  const { data: serversData, isLoading: isServersLoading } = useQuery(getServers);
  const effectiveServerId = serverId || currentServerId || (serversData?.[0]?.id);

  const { data: serverData, isLoading: isServerLoading } = useQuery({
    ...getServerById(effectiveServerId),
    enabled: !!effectiveServerId
  });

  const { data: usersChart, isLoading: isChartLoading } = useQuery({
    ...getServerStatsGraph(effectiveServerId),
    enabled: !!effectiveServerId
  });

  const [activeTab, setActiveTab] = useState("week");
  const [tabPosition, setTabPosition] = useState({ x: 0, width: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (tabsRef.current) {
      const activeElement = tabsRef.current.querySelector(`[data-value="${value}"]`);
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const parentRect = tabsRef.current.getBoundingClientRect();
        setTabPosition({
          x: rect.left - parentRect.left,
          width: rect.width
        });
      }
    }
  };

  useEffect(() => {
    // Initialize tab position
    handleTabChange("week");
  }, []);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, 4);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null)

  if (isServerContextLoading || isServersLoading || isServerLoading || isChartLoading || !effectiveServerId) {
    return (
      <main className="w-[73vw] h-screen bg-transparent flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </main>
    );
  }

  return (
    <main className="absolute w-full h-screen bg-transparent" suppressHydrationWarning>
      <div ref={containerRef} className="z-[1] w-full h-screen bg-transparent">
        <div className="flex flex-col gap-6 h-full p-4 gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-shadow-md">
              Welcome back!
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <LiquidGlass className="rounded-[999px] justify-start" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0.1}>
              <div className="w-full flex flex-col justify-start items-start gap-1 p-6">
                <CardHeader className="w-full">
                  <CardTitle>Total members</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex flex-row items-center gap-2">
                    {serverData?.data?.statsData?.members || "0"} members
                  </p>
                </CardContent>
              </div>
            </LiquidGlass>

            <LiquidGlass className="rounded-[999px] justify-start" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0.1}>
              <div className="w-full flex flex-col justify-start items-start gap-1 p-6">
                <CardHeader className="w-full">
                  <CardTitle>Total cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex flex-row items-center gap-2">
                    {serverData?.data?.statsData?.cases || "0"} cases
                  </p>
                </CardContent>
              </div>
            </LiquidGlass>

            <LiquidGlass className="rounded-[999px] justify-start" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0.1}>
              <div className="w-full flex flex-col justify-start items-start gap-1 p-6">
                <CardHeader className="w-full">
                  <CardTitle>Active users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex flex-row items-center gap-2">
                    {serverData?.data?.statsData?.activeUsers || "0"} online
                  </p>
                </CardContent>
              </div>
            </LiquidGlass>

            <LiquidGlass className="rounded-[999px] justify-start" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0.1}>
              <div className="w-full flex flex-col justify-start items-start gap-1 p-6">
                <CardHeader className="w-full">
                  <CardTitle>Joins this week</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex flex-row items-center gap-2">
                    {serverData?.data?.statsData?.newThisWeek || "0"} new
                    user{(serverData?.data?.statsData?.newThisWeek > 1 || !serverData?.data?.statsData?.newThisWeek) ? "s" : ""}
                  </p>
                </CardContent>
              </div>
            </LiquidGlass>
          </div>

          <div className="flex w-full items-end justify-start gap-2 mb-8">
            <Tabs defaultValue="week" className="w-full" onValueChange={handleTabChange}>
              <TabsList ref={tabsRef} className="mt-6 bg-transparent p-1 mb-2">
                <LiquidGlass className="rounded-[999px] justify-start" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0}>
                  <div className="p-1">
                    <TabsTrigger
                      value="week"
                      className={cn(
                        "rounded-full relative z-10 px-4 py-2",
                      )}
                    >
                        <span className={cn(
                          "text-muted-foreground text-shadow-md",
                          activeTab === "week" && "text-foreground"
                        )}>Past Week</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="month"
                      className={cn(
                        "rounded-full relative z-10 px-4 py-2",
                      )}
                    >
                      <span className={cn(
                        "text-muted-foreground text-shadow-md",
                        activeTab === "month" && "text-foreground"
                      )}>Past Month</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="year"
                      className={cn(
                        "rounded-full relative z-10 px-4 py-2",
                        activeTab === "year" && "liquidGlassBtn",
                      )}
                    >
                      <span className={cn(
                        "text-muted-foreground text-shadow-md",
                        activeTab === "year" && "text-white"
                      )}>Past Year</span>
                    </TabsTrigger>
                  </div>
                </LiquidGlass>
              </TabsList>
              {usersChart?.week ? (
                <TabsContent
                  value="week"
                  className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
                >
                  <OverviewChart
                    data={usersChart?.week}
                    percentageChange={serverData?.data?.statsData?.memberChange || 0}
                  />
                  <RecentUsers
                    users={serverData?.data?.statsData?.recentUsers}
                  />
                </TabsContent>
              ) : (
                <TabsContent
                  value="week"
                  className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
                >
                  <Card className="bg-transparent border-none p-4 flex flex-row items-center justify-start gap-2 shadow-none">
                    <Loader2 className="animate-spin" /> Loading...
                  </Card>
                </TabsContent>
              )}
              {usersChart?.month && (
                <TabsContent
                  value="month"
                  className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
                >
                  <OverviewChart
                    data={usersChart?.month}
                    percentageChange={serverData?.data?.statsData?.memberChange || 0}
                    color1={serverData?.data.mmData.module_config.appearance?.gradient?.color_1}
                    color2={serverData?.data.mmData.module_config.appearance?.gradient?.color_2}
                    color3={serverData?.data.mmData.module_config.appearance?.gradient?.color_3}
                  />
                  <RecentUsers
                    users={serverData?.data?.statsData?.recentUsers}
                  />
                </TabsContent>
              )}
              {usersChart?.year && (
                <TabsContent
                  value="year"
                  className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
                >
                  <OverviewChart
                    data={usersChart?.year}
                    percentageChange={serverData?.data?.statsData?.memberChange || 0}
                    color1={serverData?.data.mmData.module_config.appearance?.gradient?.color_1}
                    color2={serverData?.data.mmData.module_config.appearance?.gradient?.color_2}
                    color3={serverData?.data.mmData.module_config.appearance?.gradient?.color_3}
                  />
                  <RecentUsers
                    users={serverData?.data?.statsData?.recentUsers}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}

