"use client"
import { Separator } from "../ui/separator"
import { ArrowRight, Bell, Command, SearchIcon, ServerIcon, SidebarIcon, SparklesIcon, UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useSidebar } from "../ui/sidebar"
import { useSidebarStore } from "@/store/sidebar-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import Image from "next/image"
import { MobileServerSwitcher } from "./mobile-server-switcher"
import getCurrentGuild from "@/app/actions/getCurrentGuild"
import { Avatar, AvatarImage } from "../ui/avatar"
import { usePlatform } from "@/hooks/use-platform"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { permanentRedirect } from "next/navigation"
import { NotificationDialog } from "./NotificationDialog"
import getUserNotifications from "@/app/actions/user/getUserNotifications"
import { getDiscordUser } from "@/app/actions/getDiscordUser"

export const SiteHeader = () => {
    const { isMac, isElectron, isWindows, isLinux, isLoading } = usePlatform();
    const [notificationsData, setNotificationsData] = useState<any>();
    const setLeftSidebarOpen = useSidebarStore((state) => state.setLeftSidebarOpen);
    const isLeftSidebarOpen = useSidebarStore((state) => state.isLeftSidebarOpen);

    const setRightSidebarOpen = useSidebarStore((state) => state.setRightSidebarOpen);
    const isRightSidebarOpen = useSidebarStore((state) => state.isRightSidebarOpen);

    const [server, setServer] = useState<any>();

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const serverId = window.localStorage.getItem("currentServerId");
        const getData = async () => {
            if (serverId) {
                const getServer = await getCurrentGuild(serverId);
                setServer(getServer);
            } else {
                setServer(null);
            }

            const discordData = await getDiscordUser();
            const notificationData = await getUserNotifications(discordData?.id);
            setNotificationsData(notificationData);
        }
        getData();
    }, []);

    const setBetaLSVariable = () => {
        window.localStorage.setItem("betaEnabled", "false");
        return permanentRedirect("/:d:/app");
    }

    if (isMobile) {
        return (
            <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
                <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
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
                                                src={`https://cdn.discordapp.com/icons/${server.data.dsData.id}/${server.data.dsData.icon}`}
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
            <header className={`dragRegion bg-background sticky top-0 z-50 flex w-full items-center border-b`}>
                <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
                    <Button
                        className={`${(isElectron && isMac) ? "ml-16" : ""} h-8 w-8 noDrag`}
                        variant="ghost"
                        size="icon"
                        onClick={() => setLeftSidebarOpen(!isLeftSidebarOpen)}
                    >
                        <ServerIcon />
                    </Button>
                    <Link href="/beta/ai">
                        <Button
                            className={`h-8 w-8 noDrag`}
                            variant="ghost"
                            size="icon"
                        >
                            <SparklesIcon />
                        </Button>
                    </Link>
                    <Separator orientation="vertical" />
                    <div className="w-full flex-1 flex flex-row items-center justify-center">
                        <div className="flex flex-row items-center justify-center">
                            {server && (
                                <>
                                    <div className="ml-16 flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Avatar className="h-6 w-6 rounded-lg">
                                            <AvatarImage
                                                src={`https://cdn.discordapp.com/icons/${server.data.dsData.id}/${server.data.dsData.icon}`}
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
                    <Link href="/:d:/app">
                        <Button
                            variant="ghost"
                            className="noDrag cusor-pointer"
                            onClick={setBetaLSVariable}
                        >
                            Return to modUI 1 <ArrowRight />
                        </Button>
                    </Link>
                    <Separator orientation="vertical" />
                    <div className="ml-auto flex items-center gap-2 noDrag">
                        <Link href="/beta/notifications">
                            <Button
                                className="h-8 w-8"
                                variant="ghost"
                                size="icon"
                            >
                                <Bell />
                            </Button>
                        </Link>
                        <ThemeToggle />
                        <Button
                            className="h-8 w-8"
                            variant="ghost"
                            size="icon"
                        >
                            <SearchIcon />
                        </Button>
                        <Button
                            className={`${(isElectron && (isWindows || isLinux) ? "mr-28" : "")} h-8 w-8`}
                            variant="ghost"
                            size="icon"
                            onClick={() => setRightSidebarOpen(!isRightSidebarOpen)}
                        >
                            <UserIcon />
                        </Button>
                    </div>
                </div>
            </header>
        )
    }
}