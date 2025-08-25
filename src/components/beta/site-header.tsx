"use client"
import { Separator } from "../ui/separator"
import { Bell, ChevronRight, Command, SearchIcon, ServerIcon, Slash, UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useSidebarStore } from "@/store/sidebar-store"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import Image from "next/image"
import { MobileServerSwitcher } from "./mobile-server-switcher"
import { Avatar, AvatarImage } from "../ui/avatar"
import { usePlatform } from "@/hooks/use-platform"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getServerById, getServers } from "@/queries/servers";
import { useServerStore } from "@/store/server-store";
import { useServer } from "@/context/server-provider";
import { InteractiveButton } from "../ui/interactive-button";
import { useTheme } from "next-themes"
import { SidebarButton } from "../sidebar-button"

export const SiteHeader = () => {
    const { theme } = useTheme();
    const { isMac, isElectron, isWindows, isLinux } = usePlatform();
    const setLeftSidebarOpen = useSidebarStore((state) => state.setLeftSidebarOpen);
    const isLeftSidebarOpen = useSidebarStore((state) => state.isLeftSidebarOpen);

    const setRightSidebarOpen = useSidebarStore((state) => state.setRightSidebarOpen);
    const isRightSidebarOpen = useSidebarStore((state) => state.isRightSidebarOpen);

    const serverId = useServerStore((state) => state.currentServerId) || "";
    const { currentServerId, setCurrentServerId } = useServer();

    const { data: servers } = useSuspenseQuery(getServers);
    const { data: server } = useQuery(getServerById(serverId || currentServerId as string || servers[0]?.id));

    if (!currentServerId) {
        setCurrentServerId(servers[0]?.id as string);
    }

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) {
        return (
            <header className="bg-background/50 backdrop-blur-2xl sticky top-0 z-50 flex w-full items-center border-b">
                <div className="flex h-[var(--header-height)] bg-transparent w-full items-center gap-2 px-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ServerIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <div className="bkg-gradient w-full h-screen"></div>
                            <div className="p-2 flex flex-col">
                                <MobileServerSwitcher />
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Separator orientation="vertical" />
                    <div className="w-full flex-1">
                        <div className="flex flex-row items-center justify-center">
                            {server && (
                                <>
                                    <div className="ml-16 flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Avatar className="h-6 w-6 rounded-lg">
                                            <AvatarImage
                                                src={server.data.dsData.icon ? `https://cdn.discordapp.com/icons/${server.data.dsData.id}/${server.data.dsData.icon}` : "https://cdn.discordapp.com/embed/avatars/5.png"}
                                                alt={server.data.dsData.name}
                                            />
                                        </Avatar>
                                    </div>
                                    <span className="text-sm">{server.data.dsData.name}</span>
                                </>
                            )}
                            {
                                !server && (
                                    <div className="ml-16 flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Image
                                            src={'/mymod_emblem.svg'}
                                            alt="MYMOD"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="ml-auto flex items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <UserIcon />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="bkg-gradient w-full h-screen"></div>
                                <div className="p-2 flex flex-col">
                                    <Button variant="link" className="w-fit p-1" asChild>
                                        <a href="#">
                                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                                <Command className="size-4" />
                                            </div>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">Acme Inc</span>
                                                <span className="truncate text-xs">Enterprise</span>
                                            </div>
                                        </a>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header >
        )
    } else {
        return (
            <header className={`dragRegion cursor-move sticky top-0 z-50 flex w-full items-center px-1 py-0.5`}>
                <div className="flex h-[var(--header-height)] w-full items-center justify-around gap-2">
                    <Button
                        variant="ghost"
                        className={`h-8 w-8 noDrag cursor-pointer rounded-full ${(isElectron && isMac) ? "ml-18" : ""} liquidGlassBtn`}
                        onClick={() => setLeftSidebarOpen(!isLeftSidebarOpen)}
                    >
                        <Avatar
                            className="size-6 rounded-full">
                            <AvatarImage
                                src="/mymod-clear-light.png"
                                alt="Server Menu"
                                className="rounded-full"
                            />
                        </Avatar>
                    </Button>

                    {/*<Link href="/beta/ai">
                        <Button
                            className={`h-8 w-8 noDrag`}
                            variant="ghost"
                            size="icon"
                        >
                            <SparklesIcon />
                        </Button>
                    </Link>*/}
                    <div className="flex flex-row items-center justify-center liquidGlassBtn py-0 pl-1 pr-3">
                        <div className="flex flex-row gap-1 items-center justify-center">
                            {server && (
                                <>
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-full">
                                        <Avatar className="h-6 w-6 rounded-full">
                                            <AvatarImage
                                                src={server.data.dsData.icon ? `https://cdn.discordapp.com/icons/${server.data.dsData.id}/${server.data.dsData.icon}` : "https://cdn.discordapp.com/embed/avatars/5.png"}
                                                alt={server.data.dsData.name}
                                            />
                                        </Avatar>
                                    </div>
                                    <span className="text-[14px] font-medium text-shadow-md">{server.data.dsData.name}</span>
                                </>
                            )}
                            {
                                !server && (
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Image
                                            src={'/mymod_emblem.svg'}
                                            alt="MYMOD"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2 noDrag">
                        <Link href="/portal/notifications">
                            <Button
                                className="h-8 w-8 liquidGlassBtn"
                            >
                                <Bell className="size-4" />
                            </Button>
                        </Link>
                        <Button
                            className="h-8 w-8 liquidGlassBtn"
                        >
                            <ThemeToggle />
                        </Button>
                        <Button
                            className="h-8 w-8 liquidGlassBtn"
                        >
                            <SearchIcon className="size-4" />
                        </Button>
                        <Button
                            className={`${(isElectron && (isWindows || isLinux) ? "pr-28" : "")} h-8 w-8 liquidGlassBtn`}
                            onClick={() => setRightSidebarOpen(!isRightSidebarOpen)}
                        >
                            <UserIcon className="size-4" />
                        </Button>
                    </div>
                </div>
            </header>
        )
    }
}