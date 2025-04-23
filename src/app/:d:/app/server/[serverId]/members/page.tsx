import { getCurrentGuildMembers } from "@/app/actions/getCurrentGuildMembers";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Geist } from "next/font/google";
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Slash } from "lucide-react";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AISidebarTrigger } from "@/components/AISidebarTrigger";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default async function ServerMembers({
    params,
}: Readonly<{
    params: Promise<{ serverId: string }>
}>) {
    const memberDataArray: Payment[] = [];
    const memberData = await getCurrentGuildMembers((await params).serverId);
    const currentServerData = await getCurrentGuild((await params).serverId);

    memberData?.forEach((member: any) => {
        memberDataArray.push({
            serverId: currentServerData?.data.dsData.id,
            userId: member?.id,
            image: member?.avatar,
            username: member?.globalName || member?.username,
            permissions: member?.permissions,
            roles: member?.roles,
            type: member?.type,
        });
    });

    return (
        <main className="bg-black w-full h-screen" suppressHydrationWarning>
            <div className="bkg-gradient w-full h-screen z-0"></div>
            <div className="flex flex-col items-left mt-[15px] w-full p-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/:d:/app/server/${currentServerData?.data.dsData.id}`} className="hover:text-white">Overview</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/:d:/app/server/${currentServerData?.data.dsData.id}/members`} className="hover:text-white">Members</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-row items-center gap-2 justify-between w-full">
                    <div className={`font-semibold text-4xl text-zinc-300`}>Members</div>
                </div>
                <p className={`font-medium text-lg text-zinc-500`}>This is where your server members live. View, or quickly create a case from this screen.</p>
            </div>
            <div className="p-6 -mt-12 h-[80vh] overflow-y-auto">
                <DataTable columns={columns} data={memberDataArray} />
            </div>
        </main>
    )
}

/*
<table className="h-full w-full text-left text-sm text-white rtl:text-right">
                    <tbody>
                        {memberData &&
                            memberData.map((member: any) => (
                                <div
                                    className="flex flex-row items-center gap-2 px-6 py-4"
                                    key={member.id}
                                >
                                    <div className="grow">
                                        <div className="flex flex-col items-left gap-1">
                                            <div className="flex flex-row items-center gap-2 p-2">
                                                <Image
                                                    src={member.avatar}
                                                    alt={member.username}
                                                    width={30}
                                                    height={30}
                                                    className="rounded-full"
                                                />
                                                <span>
                                                    <b>{member.globalName || member.username}</b>
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-center gap-1 px-4">
                                                <span className="me-2 rounded-full text-sm font-medium text-indigo-400">
                                                    {member.permissions} permissions
                                                </span>
                                                <span className="me-2 rounded-full text-sm font-medium text-yellow-400">
                                                    {member.roles} roles
                                                </span>
                                                <span className="me-2 rounded-full text-sm font-medium capitalize text-gray-400">
                                                    {member.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-row items-end h-full gap-2 pr-2"
                                    >
                                        <Button size="icon" variant="ghost">
                                            <i className="bx bx-xs bx-trash"></i>
                                        </Button>
                                        <Button size="icon" variant="ghost">
                                            <i className="bx bx-xs bx-plus"></i>
                                        </Button>
                                        <Link
                                            href={"#"}
                                        >
                                            <Button size="icon" variant="ghost">
                                                <i className="bx bx-xs bx-show-alt"></i>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </tbody>
                </table>
                */