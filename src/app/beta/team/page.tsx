"use client"
import getCurrentGuild from "@/app/actions/getCurrentGuild";
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
import { HelpCircle, Slash } from "lucide-react";
import { DataTable } from "./data-table";
import { columns, Team } from "./columns";
import { getCurrentGuildRelationships } from "@/app/actions/getCurrentGuildRelationships";
import { useEffect, useState } from "react";
import { useServerStore } from "@/store/server-store";

export default function ServerPage() {
  const guildRelationshipDataArray: Team[] = [];
  const [currentServerData, setCurrentServerData] = useState<any>();
  const [guildRelationshipData, setGuildRelationshipData] = useState<any>();
  const serverId = useServerStore((state) => state.currentServerId);
  const setServerId = useServerStore((state) => state.setServerId);

  useEffect(() => {
    const getData = async () => {
      if (serverId === null) {
        const lsServerId = window.localStorage.getItem("currentServerId");
        setServerId(lsServerId as string);
  
        const currentServerData = await getCurrentGuild(lsServerId);
        const memberData = await getCurrentGuildRelationships(lsServerId as string);

        setCurrentServerData(currentServerData);
        setGuildRelationshipData(memberData);
      } else {
        const currentServerData = await getCurrentGuild(serverId);
        const memberData = await getCurrentGuildRelationships(serverId);

        setCurrentServerData(currentServerData);
        setGuildRelationshipData(memberData);
      }
    }

    getData();
  }, [])

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
