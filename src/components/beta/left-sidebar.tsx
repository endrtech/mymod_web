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
import { BriefcaseIcon, ChevronDown, CogIcon, GripIcon, ListTree, MessageSquare, PaintRoller, Tag, User, Users } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import Image from "next/image";
import { useServerStore } from "@/store/server-store";
import { useServer } from "@/context/server-provider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getServerById } from "@/queries/servers";
import { getGuildMembers } from "@/queries/guildmembers";
import { getGuildRelationship } from "@/queries/guildrelationships";
import { getDiscordData } from "@/queries/users";
import { InteractiveCard } from "@/components/interactive-card";
import { SidebarButton } from "@/components/sidebar-button";
import { InteractiveLinkButton } from "../ui/interactive-link-button";
import { LiquidGlassSidebar } from "./liquid-glass-sidebar";
import LiquidGlass from "./liquid-glass/card";

interface User {
  id: string;
  username: string;
  // Add other properties if needed based on actual usage
}

interface LeftSidebarProps {
  currentServerMembersData: User[] | undefined;
}

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
    <>
      <SidebarProvider open={isLeftSidebarOpen}>
        <LiquidGlassSidebar variant="floating" side="left" className="fixed top-[var(--header-height)] left-0 h-[calc(100vh-var(--header-height))]! z-[25]">
          <div
            className="w-full h-[50px] rounded-[20px] blur-[40px] transition-all duration-300"
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
                    <SidebarMenuButton disabled className="glass-effect">
                      Nothing to see here yet.
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ) : (
                <SidebarMenu className="p-1">
                  <SidebarMenuItem>
                    <div className="flex flex-row items-center justify-between gap-1 p-1 w-full rounded-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <LiquidGlass className="rounded-[999px]" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0.1}>
                              <div className="h-full w-full flex items-center gap-1 py-2 px-4">
                                <User size={20} /> {currentServerMembersData?.length}
                              </div>
                            </LiquidGlass>
                          </TooltipTrigger>
                          <TooltipContent align="start" side="bottom" className="glass-tooltip">
                            <span className="text-md z-50 font-bold">
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
                            <LiquidGlass className="rounded-[999px]" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0.1}>
                              <div className="h-full w-full flex items-center gap-1 py-2 px-4">
                                <ListTree size={20} />{" "}
                                {currentServerData?.data.dsData.channels.length}
                              </div>
                            </LiquidGlass>
                          </TooltipTrigger>
                          <TooltipContent align="start" side="bottom" className="glass-tooltip">
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
                            <LiquidGlass className="rounded-[999px]" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0.1}>
                              <div className="h-full w-full flex items-center gap-1 py-2 px-4">
                                <Tag size={20} />{" "}
                                {currentServerData?.data.dsData.roles.length}
                              </div>
                            </LiquidGlass>
                          </TooltipTrigger>
                          <TooltipContent align="start" side="bottom" className="glass-tooltip">
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
                    <div className="flex flex-row items-center justify-center gap-1 px-1 rounded-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarButton
                              color1={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_1}
                              color2={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_2}
                              color3={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_3}
                              className="w-fit p-0"
                            >
                              <Button variant="ghost" className="p-1 hover:bg-transparent dark:hover:bg-transparent">
                                <Image
                                  src={'/moddr-clear.png'}
                                  alt="MODDR"
                                  width={25}
                                  height={25}
                                  className="rounded-full"
                                />
                              </Button>
                            </SidebarButton>
                          </TooltipTrigger>
                          <TooltipContent align="start" side="bottom" className="glass-tooltip">
                            <span className="text-md z-40 font-bold">
                              View in MODDR
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {hasAccess('mymod_cases') && (
                        <Link href="/beta/cases">
                          <SidebarButton
                            className="cursor-pointer"
                            color1={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_1}
                            color2={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_2}
                            color3={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_3}
                          >
                            <Button variant="ghost" className="hover:bg-transparent">
                              <BriefcaseIcon size={20} />
                            </Button>
                          </SidebarButton>
                        </Link>
                      )}
                      <Link href="/beta/apps">
                        <SidebarButton
                          className="cursor-pointer"
                          color1={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_1}
                          color2={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_2}
                          color3={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_3}
                        >
                          <Button variant="ghost" className="hover:bg-transparent">
                            <GripIcon size={20} />
                          </Button>
                        </SidebarButton>
                      </Link>
                      {hasAccess('settings') && (
                        <Link href="/beta/settings">
                          <SidebarButton
                            className="cursor-pointer"
                            color1={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_1}
                            color2={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_2}
                            color3={currentServerData?.data.mmData.module_config.appearance?.gradient?.color_3}
                          >
                            <Button variant="ghost" className="hover:bg-transparent">
                              <CogIcon size={20} />
                            </Button>
                          </SidebarButton>
                        </Link>
                      )}
                    </div>
                  </SidebarMenuItem>
                  <Collapsible defaultOpen={true} className="group/collapsible">
                    <SidebarGroup>
                      <SidebarGroupLabel asChild>
                        <CollapsibleTrigger className="nav-trigger rounded-lg w-full p-2">
                          Navigation
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>
                      <CollapsibleContent>
                        <SidebarGroupContent className="space-y-1">
                          {hasAccess("overview") && (
                            <SidebarMenuItem>
                              <InteractiveLinkButton
                                href={`/beta`}
                                className="nav-item w-full"
                              >
                                <span>Overview</span>
                              </InteractiveLinkButton>
                            </SidebarMenuItem>
                          )}
                          {hasAccess("members") && (
                            <SidebarMenuItem>
                              <InteractiveLinkButton
                                href={`/beta/members`}
                                className="nav-item w-full"
                              >
                                <span>Members</span>
                              </InteractiveLinkButton>
                            </SidebarMenuItem>
                          )}
                          {hasAccess("audit_log") && (
                            <SidebarMenuItem>
                              <InteractiveLinkButton
                                href={`/beta/logs`}
                                className="nav-item w-full"
                              >
                                <span>Logs</span>
                              </InteractiveLinkButton>
                            </SidebarMenuItem>
                          )}
                          {hasAccess("team") && (
                            <SidebarMenuItem>
                              <InteractiveLinkButton
                                href={`/beta/team`}
                                className="nav-item w-full"
                              >
                                <span>Team</span>
                              </InteractiveLinkButton>
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
        </LiquidGlassSidebar>
      </SidebarProvider>
    </>
  )
}