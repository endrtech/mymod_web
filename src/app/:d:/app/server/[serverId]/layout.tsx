import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "../../../../globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getUser } from "@/app/actions/getUser";
import Link from "next/link";
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getCurrentGuildMembers } from "@/app/actions/getCurrentGuildMembers";
import { Group, MessageSquare, PaintRoller, Users } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserGuildRelationship } from "@/app/actions/guilds/getUserGuildRelationship";
import { SearchDialog } from "@/components/dialog/SearchDialog";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const montserrat = Montserrat({
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: `MYMOD`,
    description: "Welcome to the futue of moderation.",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    params: Promise<{ serverId: string }>,
    children: React.ReactNode;
}>) {
    const serverId = (await params).serverId;
    const discordData = await getDiscordUser();
    const userData = await getUser(discordData?.id);
    const currentServerData = await getCurrentGuild(serverId);
    const currentServerMembersData = await getCurrentGuildMembers(serverId);
    const getGuildRelationship = await getUserGuildRelationship(serverId, discordData?.id);

    return (
        <SidebarProvider defaultOpen={false}>
            <ClerkProvider>
                <div
                    className={`${montserrat.className} antialiased bg-zinc-900 w-full h-screen`}
                    suppressHydrationWarning={true}
                >
                    <div className="flex flex-row items-left justify-left w-full h-screen">
                        <div className="h-screen w-[12%] bg-black border-r-1 border-zinc-800 flex flex-col items-left py-4 gap-6 bg-black">
                            <div className="flex flex-col h-full items-left justify-left gap-2">
                                <div className="bkg-header-gradient w-[90%] mx-4 -mt-4 h-[70%]"></div>
                                <div className={`px-4 flex flex-col items-left justify-center gap-3 -mt-8 z-[3] mb-2`}>
                                    <Image src={`https://cdn.discordapp.com/icons/${currentServerData?.data.dsData.id}/${currentServerData?.data.dsData.icon}`} alt={`${currentServerData?.name}`} width={40} height={40} className="rounded-full" />
                                    <div className="flex flex-col items-left gap-1">
                                        <h3 className="text-white font-medium text-sm">{currentServerData?.data.dsData.name}</h3>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-1 m-2 items-center justify-start w-full">
                                    <div
                                        className={`py-1.5 px-3 bg-zinc-900 rounded-md flex flex-row items-center justify-between gap-3 align-middle text-sm font-normal text-gray-400 border-1 border-zinc-700 shadow-xl`}
                                    >
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <span className="flex flex-row items-center gap-1">
                                                        <Users size={12} />{" "}
                                                        {currentServerMembersData?.length}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent align="start" side="bottom" className="z-[99]">
                                                    <span className="text-md z-40 font-bold text-white">
                                                        {currentServerMembersData?.length}
                                                        <br />
                                                        members
                                                    </span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <span className="flex flex-row items-center gap-1">
                                                        <MessageSquare size={12} />{" "}
                                                        {currentServerData?.data.dsData.channels.length}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent align="start" side="bottom">
                                                    <span className="text-md z-40 font-bold text-white">
                                                        {currentServerData?.data.dsData.channels.length}
                                                        <br />
                                                        channels
                                                    </span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <span className="flex flex-row items-center gap-1">
                                                        <PaintRoller size={12} />{" "}
                                                        {currentServerData?.data.dsData.roles.length}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent align="start" side="bottom">
                                                    <span className="text-md z-40 font-bold text-white">
                                                        {currentServerData?.data.dsData.roles.length}
                                                        <br />
                                                        roles
                                                    </span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <SearchDialog serverId={serverId} />
                                </div>
                                <ul
                                    className={`space-y-2 font-medium`}
                                >
                                    <li>
                                        <span className="text-sm px-4 font-bold uppercase text-gray-300">
                                            Menu
                                        </span>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/:d:/app/server/${currentServerData?.data.dsData.id}`}
                                            className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
                                        >
                                            <span>Overview</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/:d:/app/server/${(await params).serverId}/members`}
                                            className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
                                        >
                                            <span>Members</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/:d:/app/server/${currentServerData?.data.dsData.id}/audit-log`}
                                            className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
                                        >
                                            <span>Audit Log</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/:d:/app/server/${currentServerData?.data.dsData.id}/team`}
                                            className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
                                        >
                                            <span>Team</span>
                                        </Link>
                                    </li>
                                    {(getGuildRelationship.data.role === "owner" || getGuildRelationship.data.role === "administrator") && (
                                        <li>
                                            <Link
                                                href={`/:d:/app/server/${currentServerData?.data.dsData.id}/settings`}
                                                className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
                                            >
                                                <span>Settings</span>
                                            </Link>
                                        </li>
                                    )}

                                    {(
                                        currentServerData?.data.mmData.module_config.mymod_cases !== undefined && (
                                            getGuildRelationship.data.role === "administrator" && currentServerData?.data.mmData.module_config.mymod_cases.role_access_administrator === true
                                        ) || (
                                            getGuildRelationship.data.role === "moderator" && currentServerData?.data.mmData.module_config.mymod_cases.role_access_moderator === true
                                        ) || (
                                            getGuildRelationship.data.role === "helper" && currentServerData?.data.mmData.module_config.mymod_cases.role_access_helper === true
                                        ) || (
                                            getGuildRelationship.data.role === "owner"
                                        ) && (
                                            <>
                                                <li>
                                                    <span className="text-sm px-4 font-bold uppercase text-gray-300">
                                                        Moderation
                                                    </span>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`/:d:/app/server/${currentServerData?.data.dsData.id}/cases`}
                                                        className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
                                                    >
                                                        <span>Cases</span>
                                                    </Link>
                                                </li>
                                            </>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="w-full">
                            {children}
                        </div>
                    </div>
                    {
                        currentServerData.data?.mmData.module_config.mymod_intelligence.enabled === true && (
                            <ChatWidget serverId={(await params).serverId} userId={discordData?.id} />
                        )
                    }
                </div>
            </ClerkProvider>
        </SidebarProvider>
    );
}
