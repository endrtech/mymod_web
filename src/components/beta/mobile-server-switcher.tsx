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
import { SidebarMenuButton } from "../ui/sidebar";
import { Check, ChevronsUpDown, Loader2, ServerIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getUserGuilds } from "@/app/actions/getUserGuilds";
import { Button } from "../ui/button";

export const MobileServerSwitcher = () => {
    const [value, setValue] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [servers, setServers] = React.useState<any>();
    const pathname = usePathname();
    const router = useRouter();

    React.useEffect(() => {
        const getData = async () => {
            const discordData = await getDiscordUser();
            const guilds = await getUserGuilds(discordData?.id);
            setServers(guilds);

            const currentServer = window.localStorage.getItem("currentServerId");
            setValue(currentServer || "");
        };

        getData();
    }, []);

    // Watch pathname changes to stop the loading spinner
    React.useEffect(() => {
        if (loading) {
            // Add a small delay to ensure rendering is complete
            const timeout = setTimeout(() => {
                setLoading(false);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [pathname]);

    const switchServer = async (id: string) => {
        const targetPath = `/:d:/app/server/${id}`;

        if (pathname === targetPath) return;

        setLoading(true);
        window.localStorage.setItem("currentServerId", id);
        router.push(targetPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="-mt-6">
                <Button
                variant="ghost"
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    {loading || !servers ? (
                        <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center">
                            <Loader2 className="animate-spin" />
                        </Avatar>
                    ) : value ? (
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                                src={`https://cdn.discordapp.com/icons/${servers?.find((s: any) => s.id === value)?.id}/${servers?.find((s: any) => s.id === value)?.icon}`}
                                alt={servers?.find((s: any) => s.id === value)?.name}
                            />
                        </Avatar>
                    ) : (
                        <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center">
                            <ServerIcon />
                        </Avatar>
                    )}
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{value
                            ? servers?.find((s: any) => s.id === value)?.name
                            : !servers ? "Loading..." : "Select a server"}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={"bottom"}
                align="start"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-1 font-normal">
                    <span className="font-semibold">Servers</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {servers?.map((server: any) => (
                        <DropdownMenuItem
                            key={server.id}
                            onSelect={() => {
                                setValue(server.id);
                                switchServer(server.id);
                            }}
                            className="flex flex-row justify-between items-center gap-2"
                        >
                            <span className="flex flex-row items-center gap-1">
                                <Avatar>
                                    <AvatarImage
                                        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}`}
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
                                    value === server.id ? "opacity-100" : "opacity-0",
                                )}
                            />
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}