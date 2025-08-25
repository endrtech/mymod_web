"use client"
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
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Slash } from "lucide-react";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AISidebarTrigger } from "@/components/AISidebarTrigger";
import { useEffect, useState } from "react";
import { useServerStore } from "@/store/server-store";
import { useQuery } from "@tanstack/react-query";
import { getServerById } from "@/queries/servers";
import { useServer } from "@/context/server-provider";
import { getGuildMembers } from "@/queries/guildmembers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function ServerMembers() {
  const memberDataArray: Payment[] = [];
  const serverId = useServerStore((state) => state.currentServerId);
  const { currentServerId, isLoading: isServerContextLoading } = useServer();

  const effectiveServerId = serverId || currentServerId;

  const { data: currentServerData, isLoading: isServerLoading } = useQuery({
    ...getServerById(effectiveServerId as string),
    enabled: !!effectiveServerId
  });

  const { data: memberData, isLoading: isMembersLoading } = useQuery({
    ...getGuildMembers(effectiveServerId as string),
    enabled: !!effectiveServerId
  });

  if (isServerContextLoading || isServerLoading || isMembersLoading || !effectiveServerId) {
    return (
      <main className="w-[70vw] h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </main>
    );
  }

  memberData?.forEach((member: any) => {
    memberDataArray.push({
      serverId: currentServerData?.data?.dsData?.id,
      userId: member?.id,
      image: member?.avatar,
      username: member?.globalName || member?.username,
      permissions: member?.permissions,
      roles: member?.roles,
      type: member?.type,
    });
  });

  return (
    <main className="w-[70vw] h-screen" suppressHydrationWarning>
        <div className="flex flex-col items-start mt-[15px] w-full p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/beta`}
                  className="hover:text-white"
                >
                  Overview
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/beta/members`}
                  className="hover:text-white"
                >
                  Members
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row items-center gap-2 justify-between w-full">
            <div className={`font-semibold text-4xl text-foreground`}>
              Members
            </div>
          </div>
          <p className={`font-medium text-lg text-muted-foreground`}>
            This is where your server members live. View, or quickly create a
            case from this screen.
          </p>
        </div>
        <div className="p-6 -mt-12">
          <DataTable columns={columns} data={memberDataArray} />
        </div>
    </main>
  );
}
