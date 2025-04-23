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
import { Briefcase, LayoutDashboard, Slash } from "lucide-react";
import { getActiveCases } from "@/app/actions/cases/getActiveCases";
import { DataTable } from "./data-table";
import { Case, columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCaseDialog } from "@/components/dialog/CreateCaseDialog";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default async function ServerMembers({
    params,
}: Readonly<{
    params: Promise<{ serverId: string }>
}>) {
    const memberDataArray: Case[] = [];
    const currentServerData = await getCurrentGuild((await params).serverId);
    const activeCasesData = await getActiveCases((await params).serverId);

    activeCasesData?.forEach((caseItem: any) => {
        memberDataArray.push({
            serverId: currentServerData?.data.dsData.id,
            userId: caseItem.userID,
            avatar: caseItem.user_info.avatar,
            username: caseItem.user_info.username,
            globalName: caseItem.user_info.globalName,
            caseType: caseItem.case_info.case_type,
            caseId: caseItem.caseID,
            caseStatus: caseItem.case_info.case_status,
            caseDuration: caseItem.case_info.case_duration,
            caseReason: caseItem.case_info.case_reason,
        });
    });

    return (
        <div className="bg-black w-full h-full" suppressHydrationWarning>
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
                            <BreadcrumbLink href={`/:d:/app/server/${currentServerData?.data.dsData.id}/members`} className="hover:text-white">Cases</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-row w-full justify-between gap-2">
                    <div className="flex flex-col items-start p-1">
                        <div className={`font-semibold text-4xl text-zinc-300`}>Cases</div>
                        <p className={`font-medium text-lg text-zinc-500`}>Open and action cases against a user for anything, such as banning, or warning a user.</p>
                    </div>
                    <CreateCaseDialog currentServerData={currentServerData} />
                </div>
            </div>
            <div className="p-6 -mt-12 h-[80vh] overflow-y-auto">
                <DataTable columns={columns} data={memberDataArray} />
            </div>
            <Toaster className="dark" />
        </div>
    )
}

/*
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
                            <BreadcrumbLink href={`/:d:/app/server/${currentServerData?.data.dsData.id}/members`} className="hover:text-white">Cases</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className={`font-semibold text-4xl ${geistSans.className} text-zinc-300`}>Cases</div>
                <p className={`font-medium text-lg ${geistSans.className} text-zinc-500`}>Open and action cases against a user for anything, such as banning, or warning a user.</p>
            </div>
            <div className="p-6 -mt-12 h-[70vh] overflow-y-auto">
                <DataTable columns={columns} data={memberDataArray} />
            </div>
        </main>
        */