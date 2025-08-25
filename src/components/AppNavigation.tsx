"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { UpdaterDialog } from "./UpdaterDialog";
import { RefreshApplicationNav } from "./RefreshApplicationNav";
import { NotificationDialog } from "./dialog/NotificationDialog";
import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GitBranch, Server, UserCog } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarImage } from "./ui/avatar";
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";
import {
  IconBrush,
  IconDashboard,
  IconReport,
  IconServer,
  IconUsers,
} from "@tabler/icons-react";
import { ServerNavigation } from "./ServerNavigation";
import { montserrat } from "@/app/portal/fonts";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/:d:/app/manage",
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: "/:d:/app/manage/users",
      icon: IconUsers,
    },
    {
      title: "Guilds",
      url: "/:d:/app/manage/guilds",
      icon: IconServer,
    },
    {
      title: "Version Manager",
      url: "/:d:/app/manage/version_manager",
      icon: GitBranch,
    },
  ],
  documents: [
    {
      name: "Review Queue",
      url: "/:d:/app/manage/modules/theme_gallery/review_queue",
      icon: IconReport,
    },
    {
      name: "Active Themes",
      url: "/:d:/app/manage/modules/theme_gallery",
      icon: IconBrush,
    },
  ],
};

export const AppNavigation = ({ guildsData, notificationsData }: any) => {
  const loggedInUser = useUser().user;
  const router = useRouter();
  const [serverId, setServerId] = useState("");

  useEffect(() => {
    const serverId = window.localStorage.getItem("currentServerId");

    if (serverId) {
      setServerId(serverId);
    } else {
      setServerId("");
    }
  }, [serverId]);

  const navigateToGuild = (serverId: any) => {
    window.localStorage.setItem("currentServerId", serverId);

    const serverIdParam = window.localStorage.getItem("currentServerId");
    setServerId(serverIdParam as string);
    const loadServerToast = toast.loading("Loading your server...");
    setTimeout(() => {
      toast.dismiss(loadServerToast);
    }, 15000);
    return router.push(`/:d:/app/server/${serverIdParam}`);
  };

  return (
    <>
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_8px)] dark border-r-1 border-r-zinc-900 bg-black"
      >
        <SidebarHeader className="bg-transparent">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="/:d:/app">
                  <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
                    <Image
                      src="/mymod_emblem.svg"
                      width={30}
                      height={30}
                      alt="MYMOD"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">MYMOD</span>
                    <span className="truncate text-xs">Welcome back!</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 border-none md:px-0">
              <SidebarMenu className="flex border-none md:flex-col flex-row gap-6 justify-between md:justify-start">
                {guildsData?.length > 0 &&
                  guildsData?.map((guild: any) => (
                    <button
                      key={guild.id}
                      onClick={() => navigateToGuild(guild.id)}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuItem>
                              <div className="relative w-[40px] h-[40px]">
                                <Image
                                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
                                  alt={guild.name}
                                  width={40}
                                  height={40}
                                  className="relative z-10 rounded-full shadow-xl shadow-zinc-900/50"
                                />
                              </div>
                            </SidebarMenuItem>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="block md:hidden z-[99] shadow-xl"
                          >
                            <div className="flex flex-col text-left justify-center">
                              <h3 className="font-bold text-ellipsis max-w-lg overflow-hidden">
                                {guild.name}
                              </h3>
                              <p className="text-sm">Guild ID: {guild.id}</p>
                            </div>
                          </TooltipContent>
                          <TooltipContent
                            side="right"
                            className="hidden md:block z-[99] shadow-xl"
                          >
                            <div className="flex flex-col text-left justify-center">
                              <h3 className="font-bold text-ellipsis max-w-lg overflow-hidden">
                                {guild.name}
                              </h3>
                              <p className="text-sm">Guild ID: {guild.id}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </button>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="flex md:flex-col flex-row gap-4 items-center justify-between md:justify-end">
          <UpdaterDialog />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <RefreshApplicationNav />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="block md:hidden z-[99] shadow-xl"
              >
                Refresh application navigation
              </TooltipContent>
              <TooltipContent
                side="right"
                className="hidden md:block z-[99] shadow-xl"
              >
                Refresh application navigation
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <NotificationDialog notificationsData={notificationsData} />
          <UserButton appearance={{ baseTheme: dark }} />
        </SidebarFooter>
      </Sidebar>

      <Sidebar
        collapsible="none"
        className="flex-1 md:flex dark bg-black border-none"
      >
        {loggedInUser?.publicMetadata.isStaff === true && (
          <Tabs defaultValue="server-menu" className="h-screen">
            <TabsList className="w-full h-fit rounded-none">
              <TabsTrigger value="server-menu" className="rounded-none">
                <Server />
              </TabsTrigger>
              <TabsTrigger value="manager-menu" className="rounded-none">
                <UserCog />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="server-menu" className="p-0">
              {serverId && <ServerNavigation />}
              {!serverId && (
                <div
                  className={`${montserrat.className} flex flex-row h-screen items-start justify-center gap-2`}
                >
                  <div className="flex flex-col mt-6 gap-2 w-full items-center justify-center">
                    <span className="text-sm text-zinc-500">
                      No server selected.
                    </span>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="manager-menu" className="p-0">
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="data-[slot=sidebar-menu-button]:!p-1.5"
                    >
                      <a href="/:d:/app/manage">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src="/mymod_emblem.svg" alt="MYMOD" />
                        </Avatar>
                        <span className="text-base font-semibold">
                          MYMOD Manager
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <NavMain items={data.navMain} />
                <NavDocuments items={data.documents} />
              </SidebarContent>
            </TabsContent>
          </Tabs>
        )}
        {!loggedInUser?.publicMetadata.isStaff && (
          <>{serverId && <ServerNavigation />}</>
        )}
      </Sidebar>
      <Toaster className="dark" />
    </>
  );
};
