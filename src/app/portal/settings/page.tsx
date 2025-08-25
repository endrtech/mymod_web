"use client"
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getGuildChannels } from "@/app/actions/guilds/getGuildChannels";
import { AISettingsCard } from "@/components/beta/settings/AISettingsCard";
import { DiscordSettingsCard } from "@/components/beta/settings/DiscordSettingsCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Cog,
  CreditCard,
  Ellipsis,
  LayoutDashboard,
  Loader2,
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
import { CasesAppSettingsCard } from "@/components/beta/settings/CasesAppSettingsCard";
import { OverviewAppSettingsCard } from "@/components/beta/settings/OverviewAppSettingsCard";
import { MembersAppSettingsCard } from "@/components/beta/settings/MembersAppSettingsCard";
import { AuditLogAppSettingsCard } from "@/components/beta/settings/AuditLogAppSettingsCard";
import { TeamAppSettingsCard } from "@/components/beta/settings/TeamAppSettingsCard";
import { SettingsAppSettingsCard } from "@/components/beta/settings/SettingsAppSettingsCard";
import { useEffect, useState } from "react";
import { useServerStore } from "@/store/server-store";
import { BetaAppearanceSettingsCard } from "@/components/beta/settings/AppearanceSettingsCard";
import { useServer } from "@/context/server-provider";
import { useQuery } from "@tanstack/react-query";
import { getGuildVoiceChannelsById, getServerById } from "@/queries/servers";

export default function SettingsPage() {
  const serverId = useServerStore((state) => state.currentServerId);
  const { currentServerId, isLoading: isServerContextLoading } = useServer();

  const effectiveServerId = serverId || currentServerId;

  const { data: currentServerData, isLoading: isServerLoading } = useQuery({
    ...getServerById(effectiveServerId as string),
    enabled: !!effectiveServerId
  });

  const { data: currentGuildChannels, isLoading: isChannelsLoading } = useQuery({
    ...getGuildVoiceChannelsById(effectiveServerId as string),
    enabled: !!effectiveServerId
  });

  if (isServerContextLoading || isServerLoading || isChannelsLoading || !effectiveServerId) {
    return (
      <main className="w-[70vw] h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </main>
    );
  }

  return (
    <main className="w-[70vw] h-screen" suppressHydrationWarning>
      <div className="relative z-[10] w-full h-full">
        <div className="flex flex-col items-left mt-[15px] w-full p-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/beta`}
                  className="hover:text-foreground"
                >
                  Overview
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/beta/settings`}
                  className="hover:text-foreground"
                >
                  Settings
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-4xl font-bold text-foreground">Settings</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between w-full h-auto my-4 z-0">
            <Tabs
              orientation="vertical"
              defaultValue="general"
              className="flex flex-col md:flex-row items-start justify-start w-full h-full md:h-[70vh]"
            >
              <TabsList className="flex flex-row md:flex-col gap-2 h-full w-full md:w-[18%] justify-start text-left overflow-y-auto bg-muted text-foreground">
                <h4 className="text-sm uppercase text-left w-full font-medium text-zinc-500 p-2">
                  General
                </h4>
                <TabsTrigger
                  value="overview"
                  className="w-full h-fit md:max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
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
                <span className="block md:hidden w-[2px] h-full bg-zinc-900 rounded-full">
                  &nbsp;
                </span>
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
                  <Users className="p-1 rounded-sm bg-violet-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Members</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_cases"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Briefcase className="p-1 rounded-sm bg-violet-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Cases</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_audit_log"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <Notebook className="p-1 rounded-sm bg-violet-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Audit Log</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_team"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <UsersRound className="p-1 rounded-sm bg-violet-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Team</span>
                </TabsTrigger>
                <TabsTrigger
                  value="module_settings"
                  className="w-full max-h-[40px] p-2 flex flex-row items-center justify-start gap-2 text-left"
                >
                  <UserCog className="p-1 rounded-sm bg-violet-500 text-white min-w-[25px] min-h-[25px]" />
                  <span className="text-left">Settings</span>
                </TabsTrigger>
              </TabsList>
              <div className="w-full h-full overflow-y-auto">
                <TabsContent value="overview" className="mt-0">
                  <OverviewAppSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="general" className="mt-0">
                  <DiscordSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="appearance" className="mt-0">
                  <BetaAppearanceSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="boost-perks" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex flex-row items-center justify-center gap-2">
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
                          <h2 className="text-2xl font-bold text-foreground">Nitro Boosting</h2>
                        </div>
                        <p className="text-muted-foreground text-center">
                          Boost your server to get access to exclusive features and perks.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="premium-settings" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex flex-row items-center justify-center gap-2">
                          <CreditCard className="p-1 rounded-sm bg-lime-700 text-white min-w-[25px] min-h-[25px] flex flex-row items-center justify-center" />
                          <h2 className="text-2xl font-bold text-foreground">Billing</h2>
                        </div>
                        <p className="text-muted-foreground text-center">
                          Manage your billing information and subscription.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="ai-settings" className="mt-0">
                  <AISettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="module_overview" className="mt-0">
                  <OverviewAppSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="module_members" className="mt-0">
                  <MembersAppSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="module_cases" className="mt-0">
                  <CasesAppSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="module_audit_log" className="mt-0">
                  <AuditLogAppSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="module_team" className="mt-0">
                  <TeamAppSettingsCard currentServerData={currentServerData} />
                </TabsContent>
                <TabsContent value="module_settings" className="mt-0">
                  <SettingsAppSettingsCard currentServerData={currentServerData} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
        <Toaster className="dark" closeButton />
      </div>
    </main>
  );
}
