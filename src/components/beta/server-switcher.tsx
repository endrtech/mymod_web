"use client"
import {
    Avatar,
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
import { SidebarMenuButton } from "../ui/sidebar";
import { Check, ChevronsUpDown, Loader2, ServerIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { permanentRedirect } from "next/navigation";
import { useServerStore } from "@/store/server-store";
import { toast } from "sonner";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getServerById, getServers } from "@/queries/servers";
import { useServer } from "@/context/server-provider";
import { InteractiveButton } from "../ui/interactive-button";
import { Button } from "../ui/button";

export const ServerSwitcher = () => {
    const serverId = useServerStore((state) => state.currentServerId);
    const { currentServerId, setCurrentServerId } = useServer();
    const setServerId = useServerStore((state) => state.setServerId);
    const [open, setOpen] = React.useState(false);

    const { data: serversData } = useSuspenseQuery(getServers);
    const { data: serverData } = useSuspenseQuery(getServerById(serverId || currentServerId || serversData[0].id));

    if (!currentServerId) {
        setCurrentServerId(serversData[0].id as string);
    }

    const switchServer = async (id: string) => {
        if (id === serverId) return;
        setOpen(false);

        setTimeout(() => {
            const promise = new Promise((resolve) => {
                setCurrentServerId(id);
                setServerId(id);
                return resolve(true);
            })

            toast.promise(promise, {
                loading: "Loading...",
                success: "Server loaded!",
                error: "There was an error in processing the request. Please contact MYMOD Support.",
            });
        }, 250);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full p-2 rounded-md gap-1"
                >
                    {serversData && !serverData && (
                        <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center">
                            <Loader2 className="animate-spin" />
                        </Avatar>
                    )}
                    {serversData && serverData && (
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                                src={serverData.data.dsData.icon ? `https://cdn.discordapp.com/icons/${serverData.data.dsData.id}/${serverData.data.dsData.icon}` : "https://cdn.discordapp.com/embed/avatars/5.png"}
                                alt={serverData.data.dsData.name}
                            />
                        </Avatar>
                    )}
                    {!serversData && (
                        <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center">
                            <ServerIcon />
                        </Avatar>
                    )}
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{serverData
                            ? serverData.data.dsData.name
                            : !serverData ? "Loading..." : "Select a server"}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-background/50 backdrop-blur-xl z-[30]"
                side={"bottom"}
                align="start"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-1 font-normal">
                    <span className="font-semibold">Servers</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {serversData?.map((server: any) => (
                        <DropdownMenuItem
                            key={server.id}
                            onSelect={() => {
                                switchServer(server.id);
                            }}
                            className="flex flex-row justify-between items-center gap-2"
                        >
                            <span className="flex flex-row items-center gap-1">
                                <Avatar>
                                    <AvatarImage
                                        src={server.icon ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}` : "https://cdn.discordapp.com/embed/avatars/5.png"}
                                        width={15}
                                        height={15}
                                        alt={server.name}
                                    />
                                </Avatar>
                                {server.name}
                            </span>
                            <Check
                                className={cn(
                                    "ml-auto",
                                    serverData.data.dsData.id === server.id ? "opacity-100" : "opacity-0",
                                )}
                            />
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}