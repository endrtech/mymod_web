"use client"
import { useSidebarStore } from "@/store/sidebar-store";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "../ui/sidebar";
import React from "react";
import { ServerSwitcher } from "./server-switcher";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { BriefcaseIcon, ChevronDown, CogIcon, GripIcon, MessageSquare, PaintRoller, Users } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import Image from "next/image";
import {useServerStore} from "@/store/server-store";
import {useServer} from "@/context/server-provider";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getServerById} from "@/queries/servers";
import {getGuildMembers} from "@/queries/guildmembers";
import {getGuildRelationship} from "@/queries/guildrelationships";
import { getDiscordData } from "@/queries/users";

export const LeftSidebar = () => {
  const isLeftSidebarOpen = useSidebarStore((state) => state.isLeftSidebarOpen);
  const serverId = useServerStore((state) => state.currentServerId);
  const { currentServerId } = useServer();

  const { data: discordData } = useSuspenseQuery(getDiscordData());
  const { data: currentServerData } = useSuspenseQuery(getServerById(serverId || currentServerId as string));
  const { data: currentServerMembersData } = useSuspenseQuery(getGuildMembers(serverId || currentServerId as string));
  const { data: guildRelationship } = useSuspenseQuery(getGuildRelationship((serverId || currentServerId as string), discordData.id))

  const hasAccess = (module: string) => {
    const role = guildRelationship?.data.role;
    const config = currentServerData?.data.mmData.module_config[module];

    if (role === "owner") return true;
    if (!config) return false;

    return config[role] === true || config.role_access?.[role] === true;
  };

  return (
    <SidebarProvider open={isLeftSidebarOpen}>
      <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
        <div
          className="w-full h-[50px] rounded-[20px] blur-[40px]"
          style={{
            background: `radial-gradient(circle at top center, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_1 : "#00BFFF"}99 10%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_2 : "#8A2BE6"}66 40%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_3 : "#FF0080"}4D 70%)`,
          }}
        ></div>
        <SidebarHeader className="-mt-6">
          <SidebarMenu>
            <SidebarMenuItem>
              <ServerSwitcher />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {
            currentServerData === null ? (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    Nothing to see here yet.
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ) : (
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="flex flex-row items-center justify-between gap-2 py-1 px-2 w-full">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="flex-1 flex flex-row items-center justify-center gap-1">
                            <Users size={12} /> {currentServerMembersData?.length}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="bottom" className="bg-background text-foreground">
                          <span className="text-md z-40 font-bold">
                            {currentServerMembersData?.length}
                            <br />
                            members
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="flex-1 flex flex-row items-center justify-center gap-1">
                            <MessageSquare size={12} />{" "}
                            {currentServerData?.data.dsData.channels.length}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="bottom" className="bg-background text-foreground">
                          <span className="text-md z-40 font-bold">
                            {currentServerData?.data.dsData.channels.length}
                            <br />
                            channels
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="flex-1 flex flex-row items-center justify-center gap-1">
                            <PaintRoller size={12} />{" "}
                            {currentServerData?.data.dsData.roles.length}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="bottom" className="bg-background text-foreground">
                          <span className="text-md z-40 font-bold">
                            {currentServerData?.data.dsData.roles.length}
                            <br />
                            roles
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem className="w-full">
                  <div className="flex flex-row items-center justify-between gap-2 py-1 px-2 w-full">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="dark text-white flex-1 flex flex-row items-center justify-center gap-1">
                            <Image
                              src={'/moddr-logo.svg'}
                              alt="MODDR"
                              width={20}
                              height={20}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="bottom" className="cursor-pointer bg-background text-foreground">
                          <span className="text-md z-40 font-bold">
                            View in MODDR
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {hasAccess('mymod_cases') && (
                      <Link href="/beta/cases">
                        <Button variant="outline" className="cursor-pointer flex-1 flex flex-row items-center justify-center gap-1">
                          <BriefcaseIcon />
                        </Button>
                      </Link>
                    )}
                    <Link href="/beta/apps">
                      <Button variant="outline" className="cursor-pointer flex-1 flex flex-row items-center justify-center gap-1">
                        <GripIcon />
                      </Button>
                    </Link>
                    {hasAccess('settings') && (
                      <Link href="/beta/settings">
                        <Button variant="outline" className="cursor-pointer flex-1 flex flex-row items-center justify-center gap-1">
                          <CogIcon />
                        </Button>
                      </Link>
                    )}
                  </div>
                </SidebarMenuItem>
                <Collapsible defaultOpen={true} className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        Navigation
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        {hasAccess("overview") && (
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <Link
                                href={`/beta`}
                              >
                                <span>Overview</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )}
                        {hasAccess("members") && (
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <Link
                                href={`/beta/members`}
                              >
                                <span>Members</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )}
                        {hasAccess("audit_log") && (
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <Link
                                href={`/beta/logs`}
                              >
                                <span>Logs</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )}
                        {hasAccess("team") && (
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <Link
                                href={`/beta/team`}
                              >
                                <span>Team</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )}
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </SidebarMenu>
            )
          }
        </SidebarContent>
      </Sidebar>
    </SidebarProvider >
  )
}