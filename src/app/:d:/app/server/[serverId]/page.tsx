import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import OverviewChart from "@/components/overview-chart";
import RecentUsers from "@/components/recent-users";
import { RefreshApplicationNav } from "@/components/RefreshApplicationNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUsersGraph } from "@/lib/data";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function DiscordApp({
  params,
}: Readonly<{
  params: Promise<{ serverId: string }>;
}>) {
  const discordData = await getDiscordUser();
  const currentServerData = await getCurrentGuild((await params).serverId);
  const bg =
    currentServerData?.data.mmData.module_config.appearance?.background;
  const isVideo = bg?.endsWith(".mp4");

  const stats = await currentServerData?.data.statsData;
  const recentUsers = await currentServerData?.data.statsData?.recentUsers;
  const usersChart = await getUsersGraph(
    currentServerData?.data.statsData.membersArray,
  );

  return (
    <main className="w-full h-screen" suppressHydrationWarning>
      <div className="relative z-[10] w-full h-full">
        <div className="flex mt-[15px] h-full p-4 flex-col gap-6 dark text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {discordData?.globalName || discordData?.username}!
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Members</CardTitle>
              </CardHeader>
              <CardContent className="dark text-white">
                <p className="text-2xl font-bold">{stats?.members}</p>
                <p className="text-sm text-muted-foreground">
                  +{stats?.memberChange || 0}% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.cases}</p>
                <p className="text-sm text-muted-foreground">
                  +{stats?.casesChange}% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.activeUsers}</p>
                <p className="text-sm text-muted-foreground">
                  +{stats?.activeChange} since last hour
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.newThisWeek}</p>
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
              <TabsContent
                value="week"
                className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
              >
                <OverviewChart
                  data={usersChart.week}
                  percentageChange={stats?.memberChange || 0}
                />
                <RecentUsers users={recentUsers} />
              </TabsContent>
              <TabsContent
                value="month"
                className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
              >
                <OverviewChart
                  data={usersChart.month}
                  percentageChange={stats?.memberChange || 0}
                />
                <RecentUsers users={recentUsers} />
              </TabsContent>
              <TabsContent
                value="year"
                className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4 mb-8"
              >
                <OverviewChart
                  data={usersChart.year}
                  percentageChange={stats?.memberChange || 0}
                />
                <RecentUsers users={recentUsers} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
