import getCurrentGuild from "@/app/actions/getCurrentGuild";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import axios from "axios";
import { HelpCircle, Slash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { columns, Team } from "./columns";
import { getCurrentGuildRelationships } from "@/app/actions/getCurrentGuildRelationships";

export default async function ServerPage({
  params,
}: Readonly<{
  params: Promise<{ serverId: string }>;
}>) {
  const currentServerData = await getCurrentGuild((await params).serverId);
  const guildRelationshipData = await getCurrentGuildRelationships(
    (await params).serverId,
  );
  const bg =
    currentServerData?.data.mmData.module_config.appearance?.background;
  const isVideo = bg?.endsWith(".mp4");
  const guildRelationshipDataArray: Team[] = [];

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
    <main className="w-full h-screen" suppressHydrationWarning>
      <div className="relative z-[30] w-full h-full">
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
                  href={`/:d:/app/server/${currentServerData?.data.dsData.id}/team`}
                  className="hover:text-white"
                >
                  Team
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-4xl font-bold text-zinc-300">Your Team</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="dark text-white"
                >
                  <HelpCircle />
                </Button>
              </DialogTrigger>
              <DialogContent className="dark text-white">
                <DialogTitle className="text-white">
                  What does each role do?
                </DialogTitle>
                <p className="text-zinc-400">
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
