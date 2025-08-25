"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle, Loader2, Slash } from "lucide-react";
import { DataTable } from "./data-table";
import { columns, Team } from "./columns";
import { useServerStore } from "@/store/server-store";
import { useQuery } from "@tanstack/react-query";
import { getGuildRelationshipsByServer } from "@/queries/guildrelationships";
import { useServer } from "@/context/server-provider";

export default function ServerPage() {
  const guildRelationshipDataArray: Team[] = [];
  const serverId = useServerStore((state) => state.currentServerId);
  const { currentServerId, isLoading: isServerContextLoading } = useServer();

  const effectiveServerId = serverId || currentServerId;

  const { data: guildRelationshipData, isLoading: isRelationshipsLoading } = useQuery({
    ...getGuildRelationshipsByServer(effectiveServerId as string),
    enabled: !!effectiveServerId
  });

  if (isServerContextLoading || isRelationshipsLoading || !effectiveServerId) {
    return (
      <main className="w-[70vw] h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </main>
    );
  }

  guildRelationshipData?.relData.forEach((team: any) => {
    guildRelationshipDataArray.push({
      userId: team.userId,
      globalName: team.globalName,
      username: team.username,
      avatar: team.avatar,
      role: team.role,
    });
  });

  return (
    <main className="w-[70vw] h-screen" suppressHydrationWarning>
      <div className="relative z-[30] w-full h-full">
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
                  href={`/beta/team`}
                  className="hover:text-white"
                >
                  Team
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-4xl font-bold text-foreground">Your Team</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                >
                  <HelpCircle />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  What does each role do?
                </DialogTitle>
                <p className="text-muted-foreground">
                  Each role has different abilities for a user on MYMOD.
                  <br />
                  <br />
                  All roles, including <b>Owner</b> have access to enter the
                  instance on MYMOD.
                  <br />
                  The <b>Owner</b> role allows the server owner to access
                  everything on MYMOD, including <b>deleting the instance.</b>
                  <br />
                  The <b>Administrator</b> role allows a MYMOD user to access
                  every aspect of the instance the same way a server owner can,
                  but they <b>cannot delete the instance.</b>
                  <br />
                  The <b>Moderator</b> role allows a MYMOD user to manage Cases,
                  members, modules and the Audit Log for the instance.
                  <br />
                  The <b>Helper</b> role acts similarly to a Trial role. This
                  role allows a MYMOD user to <b>ONLY</b> access Tickets, and
                  Cases. That&apos;s it.
                  <br />
                  <br />
                  Access to applications in MYMOD for each role can be
                  customised in Settings.
                </p>
              </DialogContent>
            </Dialog>
          </div>
          <div className="h-[70vh] overflow-y-auto">
            <DataTable columns={columns} data={guildRelationshipDataArray} />
          </div>
        </div>
      </div>
    </main>
  );
}
