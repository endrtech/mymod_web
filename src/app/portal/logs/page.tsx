"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Loader2, Slash } from "lucide-react";
import moment from "moment";
import { AuditLogImportDialog } from "@/components/dialog/AuditLogImportDialog";
import { AuditLog, columns } from "./columns";
import { DataTable } from "./data-table";
import { useServerStore } from "@/store/server-store";
import { useServer } from "@/context/server-provider";
import { useQuery } from "@tanstack/react-query";
import { getGuildAuditLog, getServerById } from "@/queries/servers";

export default function ServerMembers() {
  const auditLogDataArray: AuditLog[] = [];
  const serverId = useServerStore((state) => state.currentServerId);
  const { currentServerId, isLoading: isServerContextLoading } = useServer();

  const effectiveServerId = serverId || currentServerId;

  const { data: currentServerData, isLoading: isServerLoading } = useQuery({
    ...getServerById(effectiveServerId as string),
    enabled: !!effectiveServerId
  });

  const { data: serverAuditLog, isLoading: isAuditLogLoading } = useQuery({
    ...getGuildAuditLog(effectiveServerId as string),
    enabled: !!effectiveServerId
  });

  if (isServerContextLoading || isServerLoading || isAuditLogLoading || !effectiveServerId) {
    return (
      <div className="w-[70vw] h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  for (const auditLog of serverAuditLog?.data || []) {
    auditLogDataArray.push({
      type: `${auditLog.logType} ${auditLog.targetType}`,
      target_id: auditLog.targetID,
      actions_taken: auditLog.actions_taken,
      executor_id: auditLog.executorID,
      created: auditLog.timestamp,
    });
  }

  return (
    <div className="w-[70vw] h-screen" suppressHydrationWarning>
      <div className="relative z-[10] w-full h-full overflow-hidden">
        <div className="flex flex-col items-left mt-[15px] w-full p-6">
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
                  href={`/beta/logs`}
                  className="hover:text-white"
                >
                  Audit Log
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full z-[99]">
            <h1 className="text-4xl font-bold text-foreground">Audit Log</h1>
            <div className="mt-2 md:mt-0 mb-2 md:mb-0 flex flex-row items-center gap-2 -mr-2">
              <h1
                className="text-sm font-normal text-muted-foreground"
                id="import-ds-data-alert"
              >
                Recommended next import:{" "}
                <b>
                  {currentServerData?.data?.mmData?.module_config?.global_audit
                    ? `${moment(
                        new Date(
                          currentServerData?.data?.mmData?.module_config?.global_audit?.next_ds_import,
                        ),
                      ).diff(Date.now(), "days")} day(s)`
                    : "Not completed"}
                </b>
              </h1>
              <AuditLogImportDialog
                serverId={currentServerData?.data?.dsData?.id}
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
