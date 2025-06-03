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
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePlatform } from "@/hooks/use-platform";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import getCurrentGuild from "@/app/actions/getCurrentGuild";

export const RightSidebar = () => {
    const isRightSidebarOpen = useSidebarStore((state) => state.isRightSidebarOpen);
    const loggedInUser = useUser();
    const { isElectron } = usePlatform();
    const [currentServerData, setCurrentServerData] = useState<any>();

    React.useEffect(() => {
        const getData = async () => {
            const currentServer = window.localStorage.getItem("currentServerId");
            if (currentServer) {
                const currentServerData = await getCurrentGuild(currentServer);
                setCurrentServerData(currentServerData);
            } else {
                setCurrentServerData(null);
            }
        };

        getData();
    }, []);

    return (
        <SidebarProvider open={isRightSidebarOpen}>
            <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" side="right">
                <div
                    className="w-full h-[50px] rounded-[20px] blur-[40px]"
                    style={{
                        background: `radial-gradient(circle at top center, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_1 : "#00BFFF"}99 10%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_2 : "#8A2BE6"}66 40%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_3 : "#FF0080"}4D 70%)`,
                    }}
                ></div>
                <SidebarHeader className="-mt-6">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={loggedInUser.user?.imageUrl} alt={loggedInUser.user?.emailAddresses[0].emailAddress} />
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{loggedInUser.user?.fullName}</span>
                                            <span className="text-muted-foreground truncate text-xs">
                                                {loggedInUser.user?.emailAddresses[0].emailAddress}
                                            </span>
                                        </div>
                                        <IconDotsVertical className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
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
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <Collapsible defaultOpen={true} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        Customisation
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Link href="/beta/customisation/theme-gallery">
                                                    Theme Gallery
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Link href="/beta/customisation/theme-creator">
                                                    Theme Creator
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Link href="/beta/customisation/my-themes">
                                                    My Themes
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                        <Collapsible defaultOpen={true} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        Built for MYMOD
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Link href="#" onClick={() => isElectron ? window.electron?.openExternal('https://developers.mymod.endr.tech') : window.open("https://developers.mymod.endr.tech")}>
                                                    Developer Portal
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Link href="#" onClick={() => isElectron ? window.electron?.openExternal("https://moddr.endr.tech") : window.open("https://moddr.endr.tech")}>
                                                    MODDR
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                        <Collapsible defaultOpen={true} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        Need help?
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Link href="#" onClick={() => isElectron ? window.electron?.openExternal('https://discord.gg/VNfWcyd8hq') : window.open("https://discord.gg/VNfWcyd8hq")}>
                                                    Discord Server
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <Link href="#" onClick={() => isElectron ? window.electron?.openExternal("mailto:hello@endr.tech") : window.open("mailto:hello@endr.tech")}>
                                                    Email us
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}