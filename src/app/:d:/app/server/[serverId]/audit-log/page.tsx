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
import { Slash } from "lucide-react";
import { getCurrentGuildAuditLog } from "@/app/actions/getCurrentGuildAuditLog";
import moment from "moment";
import { AuditLogImportDialog } from "@/components/dialog/AuditLogImportDialog";
import { AuditLog, columns } from "./columns";
import { DataTable } from "./data-table";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function ServerMembers({
  params,
}: Readonly<{
  params: Promise<{ serverId: string }>;
}>) {
  const auditLogDataArray: AuditLog[] = [];
  const currentServerData = await getCurrentGuild((await params).serverId);
  const serverAuditLog =
    (await getCurrentGuildAuditLog((await params).serverId)) || [];
  const bg =
    currentServerData?.data.mmData.module_config.appearance?.background;
  const isVideo = bg?.endsWith(".mp4");

  for (const auditLog of serverAuditLog?.data) {
    auditLogDataArray.push({
      type: `${auditLog.logType} ${auditLog.targetType}`,
      target_id: auditLog.targetID,
      actions_taken: auditLog.actions_taken,
      executor_id: auditLog.executorID,
      created: auditLog.timestamp,
    });
  }

  return (
    <div className="w-full h-screen" suppressHydrationWarning>
      {/* Video background if it's an mp4 */}
      {isVideo && (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={bg}
            autoPlay
            loop
            muted
            playsInline
          />
          <div
            className="absolute z-[1] left-0 w-[100vw] h-full"
            style={{
              backgroundImage: bg
                ? `linear-gradient(to bottom, rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"}), rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"})), url('${bg}')`
                : "none",
              backgroundColor: bg ? undefined : "black",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </>
      )}

      {/* Gradient/image background if not a video */}
      {!isVideo && (
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: bg
              ? `linear-gradient(to bottom, rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"}), rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"})), url('${bg}')`
              : "none",
            backgroundColor: bg ? undefined : "black",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      )}
      <div className="relative z-[10] w-full h-full">
        <div
          className="w-full h-[50px] rounded-[20px] blur-[40px]"
          style={{
            background: `radial-gradient(circle at top center, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_1 : "#00BFFF"}99 10%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_2 : "#8A2BE6"}66 40%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_3 : "#FF0080"}4D 70%)`,
          }}
        ></div>
        <div className="flex flex-col items-left mt-[15px] w-full p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/:d:/app/server/${currentServerData?.data.dsData.id}`}
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
                  href={`/:d:/app/server/${currentServerData?.data.dsData.id}/audit-log`}
                  className="hover:text-white"
                >
                  Audit Log
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row items-center justify-between w-full z-[99]">
            <h1 className="text-4xl font-bold text-zinc-300">Audit Log</h1>
            <div className="flex flex-row items-center gap-2 -mr-2">
              <h1
                className="text-sm font-normal text-gray-500"
                id="import-ds-data-alert"
              >
                Recommended next import:{" "}
                <b>
                  {currentServerData?.data.mmData.module_config.global_audit
                    ? `${moment(
                        new Date(
                          currentServerData?.data.mmData.module_config?.global_audit?.next_ds_import,
                        ),
                      ).diff(Date.now(), "days")} day(s)`
                    : "Not completed"}
                </b>
              </h1>
              <AuditLogImportDialog
                serverId={currentServerData?.data.dsData.id}
              />
            </div>
          </div>
          <div className="h-[70vh] overflow-y-auto">
            <DataTable columns={columns} data={auditLogDataArray} />
          </div>
        </div>
      </div>
    </div>
  );
}
}
