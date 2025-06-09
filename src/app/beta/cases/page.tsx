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
import { Briefcase, LayoutDashboard, Loader2, Slash } from "lucide-react";
import { getActiveCases } from "@/app/actions/cases/getActiveCases";
import { DataTable } from "./data-table";
import { Case, columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCaseDialog } from "@/components/dialog/CreateCaseDialog";
import { Toaster } from "@/components/ui/sonner";
import { useServerStore } from "@/store/server-store";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServer } from "@/context/server-provider";
import { getServerById } from "@/queries/servers";
import { getCases } from "@/queries/cases";

export default function ServerMembers() {
  const memberDataArray: Case[] = [];
  const serverId = useServerStore((state) => state.currentServerId);
  const { currentServerId, isLoading: isServerContextLoading } = useServer();

  const effectiveServerId = serverId || currentServerId;

  const { data: currentServerData, isLoading: isServerLoading } = useQuery({
    ...getServerById(effectiveServerId as string),
    enabled: !!effectiveServerId
  });

  const { data: activeCasesData, isLoading: isCasesLoading } = useQuery({
    ...getCases(effectiveServerId as string),
    enabled: !!effectiveServerId
  });

  if (isServerContextLoading || isServerLoading || isCasesLoading || !effectiveServerId) {
    return (
      <div className="w-[70vw] h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  activeCasesData?.forEach((caseItem: any) => {
    memberDataArray.push({
      serverId: currentServerData?.data?.dsData?.id,
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
    <div className="w-[70vw] h-screen" suppressHydrationWarning>
      <div className="relative z-[10] w-full h-full">
        <div className="flex flex-col items-left mt-[15px] w-full p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/beta`}
                  className="hover:text-foreground"
                >
                  Overview
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/beta/cases`}
                  className="hover:text-foreground"
                >
                  Cases
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row w-full justify-between gap-2">
            <div className="flex flex-col items-start p-1">
              <div className={`font-semibold text-4xl text-foreground`}>
                Cases
              </div>
              <p className={`font-medium text-lg text-muted-foreground`}>
                Open and action cases against a user for anything, such as
                banning, or warning a user.
              </p>
            </div>
            <CreateCaseDialog currentServerData={currentServerData} />
          </div>
        </div>
        <div className="p-6 -mt-12 h-[80vh] overflow-y-auto">
          <DataTable columns={columns} data={memberDataArray} />
        </div>
      </div>
    </div>
  );
}
