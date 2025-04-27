import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getGuildChannels } from "@/app/actions/guilds/getGuildChannels";
import { AISettingsCard } from "@/components/settings/AISettingsCard";
import { DiscordSettingsCard } from "@/components/settings/DiscordSettingsCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Cog,
  CreditCard,
  Ellipsis,
  LayoutDashboard,
  Notebook,
  Paintbrush,
  Save,
  Slash,
  Sparkle,
  Sparkles,
  Speaker,
  Ticket,
  UserCog,
  Users,
  UsersRound,
  Volume,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import { CasesAppSettingsCard } from "@/components/settings/CasesAppSettingsCard";
import { AppearanceSettingsCard } from "@/components/settings/AppearanceSettingsCard";
import { OverviewAppSettingsCard } from "@/components/settings/OverviewAppSettingsCard";
import { MembersAppSettingsCard } from "@/components/settings/MembersAppSettingsCard";
import { AuditLogAppSettingsCard } from "@/components/settings/AuditLogAppSettingsCard";
import { TeamAppSettingsCard } from "@/components/settings/TeamAppSettingsCard";
import { SettingsAppSettingsCard } from "@/components/settings/SettingsAppSettingsCard";

export default async function SettingsPage({
  params,
}: Readonly<{
  params: Promise<{ serverId: string }>;
}>) {
  const currentServerData = await getCurrentGuild((await params).serverId);
  const currentGuildChannels = await getGuildChannels(
    (await params).serverId,
    "voice",
  );

  const bg =
    currentServerData?.data.mmData.module_config.appearance?.background;
  const isVideo = bg?.endsWith(".mp4");

  return (
    <main className="w-full h-screen" suppressHydrationWarning>
      {/* Video background if it's an mp4 */}
      {isVideo && (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={bg}
            autoPlay
            loop
            muted
            playsInline
          />
          <div
            className="absolute z-[1] left-0 w-[100vw] h-full"
            style={{
              backgroundImage: bg
                ? `linear-gradient(to bottom, rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"}), rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"})), url('${bg}')`
                : "none",
              backgroundColor: bg ? undefined : "black",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </>
      )}

      {/* Gradient/image background if not a video */}
      {!isVideo && (
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: bg
              ? `linear-gradient(to bottom, rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"}), rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"})), url('${bg}')`
              : "none",
            backgroundColor: bg ? undefined : "black",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      )}
      <div className="relative z-[10] w-full h-full">
        <div
          className="w-full h-[50px] rounded-[20px] blur-[40px]"
          style={{
            background: `radial-gradient(circle at top center, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_1 : "#00BFFF"}99 10%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_2 : "#8A2BE6"}66 40%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_3 : "#FF0080"}4D 70%)`,
          }}
        ></div>
        <div className="flex flex-col items-left mt-[15px] w-full p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/:d:/app/server/${currentServerData?.data.dsData.id}`}
                  className="hover:text-white"
                >
                  Overview
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/:d:/app/server/${currentServerData?.data.dsData.id}/settings`}
                  className="hover:text-white"
                >
                  Settings
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-4xl font-bold text-zinc-300">Settings</h1>
          </div>
          <div className="flex flex-row items-center justify-between w-full h-auto my-4 z-0">
            <Tabs
              orientation="vertical"
              defaultValue="general"
              className="flex flex-row items-start justify-start w-full h-[70vh]"
            >
              <TabsList className="flex flex-col gap-2 h-full w-[18%] justify-start text-left dark overflow-y-auto">
                <h4 className="text-sm uppercase text-left w-full font-medium text-zinc-500 p-2">
                  General
                </h4>
                <TabsTrigger
                  value="overview"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Cog className="p-1 rounded-sm bg-zinc-900 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="general"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Cog className="p-1 rounded-sm bg-zinc-900 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Discord Settings</span>
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Paintbrush className="p-1 rounded-sm bg-zinc-900 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Appearance</span>
                </TabsTrigger>
                <TabsTrigger
                  value="boost-perks"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <div className="p-1 rounded-sm bg-pink-400 text-white min-w-[25px] min-h-[25px] flex flex-row items-center justify-center">
                    <svg
                      fill="none"
                      height="30"
                      viewBox="0 0 24 24"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M15 5.75C11.5482 5.75 8.75 8.54822 8.75 12C8.75 15.4518 11.5482 18.25 15 18.25C15.9599 18.25 16.8674 18.0341 17.6782 17.6489C18.0523 17.4712 18.4997 17.6304 18.6774 18.0045C18.8552 18.3787 18.696 18.8261 18.3218 19.0038C17.3141 19.4825 16.1873 19.75 15 19.75C10.7198 19.75 7.25 16.2802 7.25 12C7.25 7.71979 10.7198 4.25 15 4.25C19.2802 4.25 22.75 7.71979 22.75 12C22.75 12.7682 22.638 13.5115 22.429 14.2139C22.3108 14.6109 21.8932 14.837 21.4962 14.7188C21.0992 14.6007 20.8731 14.1831 20.9913 13.7861C21.1594 13.221 21.25 12.6218 21.25 12C21.25 8.54822 18.4518 5.75 15 5.75Z"
                        fill="white"
                        fillRule="evenodd"
                      />
                      <path
                        clipRule="evenodd"
                        d="M5.25 5C5.25 4.58579 5.58579 4.25 6 4.25H15C15.4142 4.25 15.75 4.58579 15.75 5C15.75 5.41421 15.4142 5.75 15 5.75H6C5.58579 5.75 5.25 5.41421 5.25 5Z"
                        fill="white"
                        fillRule="evenodd"
                      />
                      <path
                        clipRule="evenodd"
                        d="M4.75 8.5C4.75 8.08579 5.08579 7.75 5.5 7.75H8.5C8.91421 7.75 9.25 8.08579 9.25 8.5C9.25 8.91421 8.91421 9.25 8.5 9.25H5.5C5.08579 9.25 4.75 8.91421 4.75 8.5Z"
                        fill="white"
                        fillRule="evenodd"
                      />
                      <path
                        clipRule="evenodd"
                        d="M1.25 8.5C1.25 8.08579 1.58579 7.75 2 7.75H3.5C3.91421 7.75 4.25 8.08579 4.25 8.5C4.25 8.91421 3.91421 9.25 3.5 9.25H2C1.58579 9.25 1.25 8.91421 1.25 8.5Z"
                        fill="white"
                        fillRule="evenodd"
                      />
                      <path
                        clipRule="evenodd"
                        d="M3.25 12.5C3.25 12.0858 3.58579 11.75 4 11.75H8C8.41421 11.75 8.75 12.0858 8.75 12.5C8.75 12.9142 8.41421 13.25 8 13.25H4C3.58579 13.25 3.25 12.9142 3.25 12.5Z"
                        fill="white"
                        fillRule="evenodd"
                      />
                      <path
                        clipRule="evenodd"
                        d="M12.376 8.58397C12.5151 8.37533 12.7492 8.25 13 8.25H17C17.2508 8.25 17.4849 8.37533 17.624 8.58397L19.624 11.584C19.792 11.8359 19.792 12.1641 19.624 12.416L17.624 15.416C17.4849 15.6247 17.2508 15.75 17 15.75H13C12.7492 15.75 12.5151 15.6247 12.376 15.416L10.376 12.416C10.208 12.1641 10.208 11.8359 10.376 11.584L12.376 8.58397ZM13.4014 9.75L11.9014 12L13.4014 14.25H16.5986L18.0986 12L16.5986 9.75H13.4014Z"
                        fill="white"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-left">Nitro Boosting</span>
                </TabsTrigger>
                <TabsTrigger
                  value="premium-settings"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <CreditCard className="p-1 rounded-sm bg-lime-700 text-white min-w-[25px] min-h-[25px] flex flex-row items-center justify-center" />
                  <span className="text-left">Billing</span>
                </TabsTrigger>
                <TabsTrigger
                  value="ai-settings"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Sparkles className="p-1 rounded-sm bg-linear-[45deg,#0090F7,#BA62FC,#F2416B,#F55600] text-white min-w-[25px] min-h-[25px] flex flex-row items-center justify-center" />
                  <span className="text-left">MYMOD Intelligence</span>
                </TabsTrigger>
                <h4 className="text-sm uppercase text-left w-full font-medium text-zinc-500 p-2">
                  App Settings
                </h4>
                <TabsTrigger
                  value="module_overview"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <LayoutDashboard className="p-1 rounded-sm bg-violet-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_members"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Users className="p-1 rounded-sm bg-slate-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Members</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_audit_log"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Notebook className="p-1 rounded-sm bg-orange-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Audit Log</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_team"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <UserCog className="p-1 rounded-sm bg-purple-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Team</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_settings"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Cog className="p-1 rounded-sm bg-zinc-700 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Settings</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_cases"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Briefcase className="p-1 rounded-sm bg-blue-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Cases</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_staff_management"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <UsersRound className="p-1 rounded-sm bg-green-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Staff Management</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_tickets"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Ticket className="p-1 rounded-sm bg-orange-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Tickets</span>
                </TabsTrigger>
              </TabsList>
              <div className="w-full h-[70vh] max-h-[70vh]">
                <TabsContent value="overview" className="h-[70vh]">
                  <Card className="w-full h-[100%] bg-black border-zinc-700 p-2">
                    <CardContent className="p-2 overflow-y-auto h-[100%]">
                      <div className="flex flex-col items-start justify-start w-full gap-4">
                        <Card className="bg-zinc-900 to-purple-700 border-none p-0 w-full">
                          <CardContent className="p-4 flex flex-row items-center justify-between gap-2 w-full">
                            <div className="flex flex-row items-center justify-start gap-2">
                              <Image
                                src={`https://cdn.discordapp.com/icons/${currentServerData?.data.dsData.id}/${currentServerData?.data.dsData.icon}`}
                                alt={currentServerData?.data.dsData.name}
                                width={50}
                                height={50}
                                className="rounded-full shadow-xl border-2 border-zinc-800"
                              ></Image>
                              <div className="flex flex-col items-start justify-start">
                                <h1 className="text-2xl font-bold text-zinc-300">
                                  {currentServerData?.data.dsData.name}
                                </h1>
                                <p className="text-sm text-zinc-500">
                                  Server ID: {currentServerData?.data.dsData.id}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="dark text-white"
                            >
                              <Ellipsis size={20} />
                            </Button>
                          </CardContent>
                        </Card>
                        <div className="flex flex-col items-start justify-start w-full gap-2">
                          <h1 className="text-lg font-bold text-zinc-300">
                            Currently installed apps
                          </h1>
                          <span className="text-sm text-zinc-500">
                            You have no apps installed. Head to the App Store to
                            install an app.
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="boost-perks" className="h-[70vh]">
                  <Card className="w-full h-[100%] bg-black border-zinc-700 overflow-y-auto p-4">
                    <div className="h-auto w-full bg-gradient-to-br from-pink-700 to-purple-800 rounded-lg p-4">
                      <div className="flex flex-col gap-1 items-start text-white">
                        <h4 className="font-semibold">
                          Your server is currently on:
                        </h4>
                        <h1 className="text-3xl font-bold">
                          Level {currentServerData?.data.dsData.premiumTier}
                        </h1>
                        <h4 className="font-normal">
                          {currentServerData?.data.dsData.premiumTier === 0
                            ? "Oh no! Nobody has boosted your server. Get 2 people to boost your server to get to Level 1."
                            : currentServerData?.data.dsData.premiumTier === 1
                              ? `You're getting there! ${currentServerData?.data.dsData.premiumSubscriptionCount} people have boosted your server. Get ${7 - currentServerData?.data.dsData.premiumSubscriptionCount} more people to boost your server to get to Level 2.`
                              : currentServerData?.data.dsData.premiumTier === 2
                                ? `On the home stretch! ${currentServerData?.data.dsData.premiumSubscriptionCount} people have boosted your server. Get ${14 - currentServerData?.data.dsData.premiumSubscriptionCount} more people to boost your server to get to Level 3.`
                                : currentServerData?.data.dsData.premiumTier ===
                                    3
                                  ? `You've gotten to the max level! ${currentServerData?.data.dsData.premiumSubscriptionCount} people have boosted the server.`
                                  : ""}
                        </h4>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="general" className="h-[70vh]">
                  <DiscordSettingsCard
                    serverData={currentServerData}
                    guildChannels={currentGuildChannels}
                    serverId={currentServerData?.data.dsData.id}
                  />
                </TabsContent>
                <TabsContent value="appearance" className="h-[70vh]">
                  <AppearanceSettingsCard
                    currentServerData={currentServerData}
                  />
                </TabsContent>
                <TabsContent value="module_cases" className="h-[70vh]">
                  <CasesAppSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="module_overview" className="h-[70vh]">
                  <OverviewAppSettingsCard
                    currentServerData={currentServerData}
                  />
                </TabsContent>
                <TabsContent value="module_members" className="h-[70vh]">
                  <MembersAppSettingsCard
                    currentServerData={currentServerData}
                  />
                </TabsContent>
                <TabsContent value="module_audit_log" className="h-[70vh]">
                  <AuditLogAppSettingsCard
                    currentServerData={currentServerData}
                  />
                </TabsContent>
                <TabsContent value="module_team" className="h-[70vh]">
                  <TeamAppSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="module_settings" className="h-[70vh]">
                  <SettingsAppSettingsCard
                    currentServerData={currentServerData}
                  />
                </TabsContent>
                <TabsContent
                  value="module_staff_management"
                  className="h-[70vh]"
                >
                  <Card className="w-full bg-black border-zinc-700 p-4 h-[100%] overflow-y-auto">
                    <div className="flex flex-row h-full w-full items-center justify-center">
                      <h4 className="text-sm text-center w-full font-medium text-zinc-500 p-2">
                        The application "Staff Management" is not available in
                        MYMOD Beta. Check back soon!
                      </h4>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="module_tickets" className="h-[70vh]">
                  <Card className="w-full bg-black border-zinc-700 p-4 h-[100%] overflow-y-auto">
                    <div className="flex flex-row h-full w-full items-center justify-center">
                      <h4 className="text-sm text-center w-full font-medium text-zinc-500 p-2">
                        The application "Tickets" is not available in MYMOD
                        Beta. Check back soon!
                      </h4>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="premium-settings" className="h-[70vh]">
                  <Card className="w-full bg-black border-zinc-700 p-4 h-[100%] overflow-y-auto">
                    <div className="flex flex-row h-full w-full items-center justify-center">
                      <h4 className="text-sm text-center w-full font-medium text-zinc-500 p-2">
                        MYMOD Premium is not available in MYMOD Beta. Check back
                        soon!
                      </h4>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="ai-settings" className="h-[70vh]">
                  <AISettingsCard currentServerData={currentServerData} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
        <Toaster className="dark" />
      </div>
    </main>
  );
}
