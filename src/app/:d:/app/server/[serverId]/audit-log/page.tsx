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
      <div className="relative z-[10] w-full h-full overflow-hidden">
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full z-[99]">
            <h1 className="text-4xl font-bold text-zinc-300">Audit Log</h1>
            <div className="mt-2 md:mt-0 mb-2 md:mb-0 flex flex-row items-center gap-2 -mr-2">
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
