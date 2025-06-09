"use client"
import OverviewChart from "@/components/overview-chart";
import RecentUsers from "@/components/recent-users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useServerStore } from "@/store/server-store";
import { Loader2 } from "lucide-react";
import {getQueryClient} from "@/lib/query-client";
import {getServerById, getServers, getServerStatsGraph} from "@/queries/servers";
import {dehydrate, HydrationBoundary, useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {useServer} from "@/context/server-provider";

export default function DiscordApp() {
  const serverId = useServerStore((state) => state.currentServerId) || "";
  const { currentServerId } = useServer();

  const { data: serversData } = useSuspenseQuery(getServers);
  const { data: serverData } = useQuery(getServerById(serverId || currentServerId || serversData[0].id));
  const { data: usersChart } = useSuspenseQuery(getServerStatsGraph(serverId || currentServerId || serversData[0].id));

  return (
        <main className="w-full h-screen bg-transparent" suppressHydrationWarning>
          <div className="relative z-[10] w-[73vw] h-full bg-transparent">
            <div className="flex h-full p-4 flex-col gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  Welcome back!
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-background border-muted">
                  <CardHeader>
                    <CardTitle>Total Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold flex flex-row items-center gap-2">{serverData.data.statsData?.members ? serverData.data.statsData.members :
                        "0"} members</p>
                  </CardContent>
                </Card>

                <Card className="bg-background border-muted">
                  <CardHeader>
                    <CardTitle>Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold flex flex-row items-center gap-2">{serverData.data.statsData?.cases ? serverData.data.statsData.cases :
                        "0"} cases</p>
                  </CardContent>
                </Card>

                <Card className="bg-background border-muted">
                  <CardHeader>
                    <CardTitle>Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold flex flex-row items-center gap-2">{serverData.data.statsData?.activeUsers ? serverData.data.statsData.activeUsers :
                        "0"} currently active</p>
                  </CardContent>
                </Card>

                <Card className="bg-background border-muted">
                  <CardHeader>
                    <CardTitle>New This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold flex flex-row items-center gap-2">{serverData.data.statsData?.newThisWeek ? serverData.data.statsData.newThisWeek :
                        "0"} new
                      user{(serverData.data.statsData?.newThisWeek > 1 || serverData.data.statsData?.newThisWeek === 0 || !serverData.data.statsData?.newThisWeek) ? "s" : ""}</p>
                    <p className="text-sm text-muted-foreground">
                      joined in the past 7 days
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex w-full items-end justify-start gap-2 mb-8">
                <Tabs defaultValue="week" className="w-full">
                  <TabsList className="mt-6">
                    <TabsTrigger value="week">Past Week</TabsTrigger>
                    <TabsTrigger value="month">Past Month</TabsTrigger>
                    <TabsTrigger value="year">Past Year</TabsTrigger>
                  </TabsList>
                  {usersChart?.week ? (
                      <TabsContent
                          value="week"
                          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
                      >
                        <OverviewChart
                            data={usersChart?.week}
                            percentageChange={serverData.data.statsData?.memberChange || 0}
                        />
                        <RecentUsers users={serverData.data.statsData?.recentUsers}/>
                      </TabsContent>
                  ) : (
                      <TabsContent
                          value="week"
                          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
                      >
                        <Card
                            className="bg-background border-none p-4 flex flex-row items-center justify-start gap-2 shadow-none">
                          <Loader2 className="animate-spin"/> Loading...
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
                            percentageChange={serverData.data.statsData?.memberChange || 0}
                        />
                        <RecentUsers users={serverData.data.statsData?.recentUsers}/>
                      </TabsContent>
                  )}
                  {usersChart?.year && (
                      <TabsContent
                          value="year"
                          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
                      >
                        <OverviewChart
                            data={usersChart?.year}
                            percentageChange={serverData.data.statsData?.memberChange || 0}
                        />
                        <RecentUsers users={serverData.data.statsData?.recentUsers}/>
                      </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </main>
  );
}

