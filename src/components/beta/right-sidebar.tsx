"use client"

import { useSidebarStore } from "@/store/sidebar-store";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, useSidebar } from "../ui/sidebar";
import {
    IconCreditCard,
    IconDotsVertical,
    IconLogout,
    IconNotification,
    IconUserCircle,
} from "@tabler/icons-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePlatform } from "@/hooks/use-platform";
import { permanentRedirect, redirect } from "next/navigation";
import React, { useState } from "react";
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { useServerStore } from "@/store/server-store";
import { useServer } from "@/context/server-provider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getServerById } from "@/queries/servers";
import { InteractiveButton } from "../ui/interactive-button";
import { InteractiveLinkButton } from "../ui/interactive-link-button";
import { Button } from "../ui/button";
import { getDiscordData } from "@/queries/users";
import { LiquidGlassSidebar } from "./liquid-glass-sidebar";

export const RightSidebar = () => {
    const isRightSidebarOpen = useSidebarStore((state) => state.isRightSidebarOpen);
    const loggedInUser = useUser();
    const { isElectron } = usePlatform();
    const { data: discordData } = useSuspenseQuery(getDiscordData());
    const serverId = useServerStore((state) => state.currentServerId);
    const { currentServerId } = useServer();

    const { data: currentServerData } = useSuspenseQuery(getServerById(serverId || currentServerId as string));

    const betaOptOut = () => {
        window.localStorage.setItem("betaEnabled", "false");
        return permanentRedirect("/:d:/app");
    }

    return (
        <SidebarProvider open={isRightSidebarOpen}>
            <LiquidGlassSidebar variant="floating" className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" side="right">
                <div
                    className="w-full h-[50px] rounded-[20px] blur-[40px] transition-all duration-300"
                    style={{
                        background: `radial-gradient(circle at top center, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_1 : "#00BFFF"}99 10%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_2 : "#8A2BE6"}66 40%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_3 : "#FF0080"}4D 70%)`,
                    }}
                ></div>
                <SidebarHeader className="-mt-6">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="lg"
                                        className="w-full data-[state=open]:bg-white/20 data-[state=open]:text-white data-[state=open]:shadow-lg data-[state=open]:backdrop-blur-md p-2 rounded-md gap-1"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={loggedInUser.user?.imageUrl} alt={loggedInUser.user?.emailAddresses[0].emailAddress} />
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{loggedInUser.user?.fullName}</span>
                                            <span className="text-muted-foreground truncate text-xs">
                                                @{discordData?.username}
                                            </span>
                                        </div>
                                        <IconDotsVertical className="ml-auto size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="glass-tooltip w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    side={"left"}
                                    align="start"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage src={loggedInUser.user?.imageUrl} alt={loggedInUser.user?.emailAddresses[0].emailAddress} />
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">{loggedInUser.user?.fullName}</span>
                                                <span className="text-muted-foreground truncate text-xs">
                                                    {loggedInUser.user?.emailAddresses[0].emailAddress}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <Link href="/beta/account">
                                            <DropdownMenuItem>
                                                <IconUserCircle />
                                                Account
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <SignOutButton>
                                        <DropdownMenuItem>
                                            <IconLogout />
                                            Log out
                                        </DropdownMenuItem>
                                    </SignOutButton>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                        {!isElectron && (
                            <SidebarMenuItem>
                                <InteractiveButton onClick={betaOptOut} className="w-full p-1 text-sm">
                                    <ChevronLeft /> Return to modUI 1
                                </InteractiveButton>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <Collapsible defaultOpen={true} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger className="nav-trigger rounded-lg w-full p-2">
                                        Customisation
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent className="space-y-1">
                                        <SidebarMenuItem>
                                            <InteractiveLinkButton href="/beta/customisation/theme-gallery" className="w-full">
                                                Theme Gallery
                                            </InteractiveLinkButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <InteractiveLinkButton href="/beta/customisation/theme-creator" className="w-full">
                                                Theme Creator
                                            </InteractiveLinkButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <InteractiveLinkButton href="/beta/customisation/my-themes" className="w-full">
                                                My Themes
                                            </InteractiveLinkButton>
                                        </SidebarMenuItem>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                        <Collapsible defaultOpen={true} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger className="nav-trigger rounded-lg w-full p-2">
                                        Built for MYMOD
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent className="space-y-1">
                                        <SidebarMenuItem>
                                            <InteractiveLinkButton href="#" onClick={() => isElectron ? window.electron?.openExternal('https://developers.mymod.endr.tech') : window.open("https://developers.mymod.endr.tech")}
                                                className="w-full"
                                            >
                                                Developer Portal
                                            </InteractiveLinkButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <InteractiveLinkButton href="#" onClick={() => isElectron ? window.electron?.openExternal("https://moddr.endr.tech") : window.open("https://moddr.endr.tech")}
                                                className="w-full"
                                            >
                                                MODDR
                                            </InteractiveLinkButton>
                                        </SidebarMenuItem>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                        <Collapsible defaultOpen={true} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger className="nav-trigger rounded-lg w-full p-2">
                                        Need help?
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent className="space-y-1">
                                        <SidebarMenuItem>
                                            <InteractiveLinkButton href="#" onClick={() => isElectron ? window.electron?.openExternal('https://discord.gg/VNfWcyd8hq') : window.open("https://discord.gg/VNfWcyd8hq")}
                                                className="w-full"
                                            >
                                                Discord Server
                                            </InteractiveLinkButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <InteractiveLinkButton href="#" onClick={() => isElectron ? window.electron?.openExternal("mailto:hello@endr.tech") : window.open("mailto:hello@endr.tech")}
                                                className="w-full"
                                            >
                                                Email us
                                            </InteractiveLinkButton>
                                        </SidebarMenuItem>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarContent>
            </LiquidGlassSidebar>
        </SidebarProvider>
    )
}