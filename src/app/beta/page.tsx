"use client"
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import OverviewChart from "@/components/overview-chart";
import RecentUsers from "@/components/recent-users";
import { RefreshApplicationNav } from "@/components/RefreshApplicationNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUsersGraph } from "@/lib/data";
import { useServerStore } from "@/store/server-store";
import { Loader2 } from "lucide-react";
import { Geist } from "next/font/google";
import { permanentRedirect } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function DiscordApp() {
  const [discordData, setDiscordData] = useState<any>();
  const [stats, setStats] = useState<any>();
  const [recentUsers, setRecentUsers] = useState<any>();
  const [usersChart, setUsersChart] = useState<any>();
  const serverId = useServerStore((state) => state.currentServerId);
  const setServerId = useServerStore((state) => state.setServerId);

  useEffect(() => {
    const getData = async () => {
      const discordData = await getDiscordUser();

      if (serverId === null) {
        const lsServerId = window.localStorage.getItem("currentServerId");
        setServerId(lsServerId as string);

        const currentServerData = await getCurrentGuild(lsServerId);
        const stats = await currentServerData?.data.statsData;
        const recentUsers = await currentServerData?.data.statsData?.recentUsers;
        const usersChart = await getUsersGraph(
          currentServerData?.data.statsData.membersArray,
        );

        setDiscordData(discordData);
        setStats(stats);
        setRecentUsers(recentUsers);
        setUsersChart(usersChart);
      } else {
        const currentServerData = await getCurrentGuild(serverId);
        const stats = await currentServerData?.data.statsData;
        const recentUsers = await currentServerData?.data.statsData?.recentUsers;
        const usersChart = await getUsersGraph(
          currentServerData?.data.statsData.membersArray,
        );

        setDiscordData(discordData);
        setStats(stats);
        setRecentUsers(recentUsers);
        setUsersChart(usersChart);
      }
    }

    getData();
  }, [])

  return (
    <main className="w-full h-screen bg-transparent" suppressHydrationWarning>
      <div className="relative z-[10] w-[73vw] h-full bg-transparent">
        <div className="flex h-full p-4 flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Welcome back, {discordData?.globalName || discordData?.username}!
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-background border-muted">
              <CardHeader>
                <CardTitle>Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold flex flex-row items-center gap-2">{stats?.members ? stats.members : <Loader2 className="animate-spin" />} members</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-muted">
              <CardHeader>
                <CardTitle>Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold flex flex-row items-center gap-2">{stats?.cases ? stats.cases : <Loader2 className="animate-spin" />} cases</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-muted">
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold flex flex-row items-center gap-2">{stats?.activeUsers ? stats.activeUsers : <Loader2 className="animate-spin" />} currently active</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-muted">
              <CardHeader>
                <CardTitle>New This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold flex flex-row items-center gap-2">{stats?.newThisWeek ? stats.newThisWeek : <Loader2 className="animate-spin" />}  new user{(stats?.newThisWeek > 1 || stats?.newThisWeek === 0 || !stats?.newThisWeek) ? "s" : ""}</p>
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
                    percentageChange={stats?.memberChange || 0}
                  />
                  <RecentUsers users={recentUsers} />
                </TabsContent>
              ) : (
                <TabsContent
                  value="week"
                  className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
                >
                  <Card className="bg-background border-none p-4 flex flex-row items-center justify-start gap-2 shadow-none">
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
                    percentageChange={stats?.memberChange || 0}
                  />
                  <RecentUsers users={recentUsers} />
                </TabsContent>
              )}
              {usersChart?.year && (
                <TabsContent
                  value="year"
                  className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
                >
                  <OverviewChart
                    data={usersChart?.year}
                    percentageChange={stats?.memberChange || 0}
                  />
                  <RecentUsers users={recentUsers} />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}

