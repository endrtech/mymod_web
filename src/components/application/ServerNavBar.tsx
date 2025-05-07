"use client";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getCurrentGuildMembers } from "@/app/actions/getCurrentGuildMembers";
import { getUserGuildRelationship } from "@/app/actions/guilds/getUserGuildRelationship";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Briefcase,
  Grid3X3,
  Grip,
  MessageSquare,
  PaintRoller,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SearchDialog } from "../dialog/SearchDialog";
import { SearchCommand } from "./SearchCommand";
import { Separator } from "../ui/separator";

export const ServerNavBar = ({ serverId }: any) => {
  let font;
  const [discordData, setDiscordData] = useState<any>();
  const [currentServerData, setCurrentServerData] = useState<any>();
  const [currentServerMembersData, setCurrentServerMembersData] =
    useState<any>();
  const [getGuildRelationship, setGuildRelationship] = useState<any>();

  const getData = async () => {
    const serverIdParam = serverId;
    if (serverIdParam) {
      const discordData = await getDiscordUser();
      const currentServerData = await getCurrentGuild(serverIdParam);
      const currentServerMembersData =
        await getCurrentGuildMembers(serverIdParam);
      const getGuildRelationship = await getUserGuildRelationship(
        serverIdParam,
        discordData?.id,
      );

      setDiscordData(discordData);
      setCurrentServerData(currentServerData);
      setCurrentServerMembersData(currentServerMembersData);
      setGuildRelationship(getGuildRelationship);
    }
  };

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 60000); // refresh every 60 seconds

    return () => clearInterval(interval);
  }, []);

  if (currentServerData?.data.mmData.module_config.appearance?.font) {
    font = currentServerData?.data.mmData.module_config.appearance?.font;
  } else {
    font = "font-montserrat";
  }

  const hasAccess = (module: string) => {
    const role = getGuildRelationship?.data.role;
    const config = currentServerData?.data.mmData.module_config[module];

    if (role === "owner") return true;
    if (!config) return false;

    return config[role] === true || config.role_access?.[role] === true;
  };

  return (
    <div className="fixed top-14 left-0 z-[20] w-full text-white">
      <Card className="p-0 m-0 h-10 text-white w-full bg-black/40 backdrop-blur-2xl border-none border-b-1 border-zinc-800 rounded-none flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-4 pl-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="flex flex-row items-center gap-1">
                  <Users size={12} /> {currentServerMembersData?.length}
                </span>
              </TooltipTrigger>
              <TooltipContent align="start" side="bottom" className="z-[99]">
                <span className="text-md z-40 font-bold text-white">
                  {currentServerMembersData?.length}
                  <br />
                  members
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="flex flex-row items-center gap-1">
                  <MessageSquare size={12} />{" "}
                  {currentServerData?.data.dsData.channels.length}
                </span>
              </TooltipTrigger>
              <TooltipContent align="start" side="bottom">
                <span className="text-md z-40 font-bold text-white">
                  {currentServerData?.data.dsData.channels.length}
                  <br />
                  channels
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="flex flex-row items-center gap-1">
                  <PaintRoller size={12} />{" "}
                  {currentServerData?.data.dsData.roles.length}
                </span>
              </TooltipTrigger>
              <TooltipContent align="start" side="bottom">
                <span className="text-md z-40 font-bold text-white">
                  {currentServerData?.data.dsData.roles.length}
                  <br />
                  roles
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator
            orientation="vertical"
            className="border-zinc-700 bg-zinc-700"
          />
        </div>
        <div className="flex flex-row items-center justify-start gap-3">
          {hasAccess("overview") && (
            <Link href={`/:d:/app/server/${currentServerData?.data.dsData.id}`}>
              <Button
                variant="link"
                className="cursor-pointer dark text-white h-8"
              >
                <span>Overview</span>
              </Button>
            </Link>
          )}
          {hasAccess("members") && (
            <Link
              href={`/:d:/app/server/${currentServerData?.data.dsData.id}/members`}
            >
              <Button
                variant="link"
                className="cursor-pointer dark text-white h-8"
              >
                <span>Members</span>
              </Button>
            </Link>
          )}
          {hasAccess("audit_log") && (
            <Link
              href={`/:d:/app/server/${currentServerData?.data.dsData.id}/audit-log`}
            >
              <Button
                variant="link"
                className="cursor-pointer dark text-white h-8"
              >
                <span>Logs</span>
              </Button>
            </Link>
          )}
          {hasAccess("team") && (
            <Link
              href={`/:d:/app/server/${currentServerData?.data.dsData.id}/team`}
            >
              <Button
                variant="link"
                className="cursor-pointer dark text-white h-8"
              >
                <span>Team</span>
              </Button>
            </Link>
          )}
          {hasAccess("settings") && (
            <Link
              href={`/:d:/app/server/${currentServerData?.data.dsData.id}/settings`}
            >
              <Button
                variant="link"
                className="cursor-pointer dark text-white h-8"
              >
                <span>Settings</span>
              </Button>
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center justify-start gap-2 ml-auto mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="dark text-white hover:bg-black"
              >
                <Grip />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black border-zinc-900"
            >
              <div className="grid grid-cols-3 gap-3">
                {hasAccess("mymod_cases") && (
                  <Link
                    href={`/:d:/app/server/${currentServerData?.data.dsData.id}/cases`}
                  >
                    <Button
                      className="flex flex-col items-center justify-center w-18 h-18 overflow-hidden truncate dark text-white p-4"
                      variant="outline"
                    >
                      <Briefcase className="p-1 rounded-sm bg-blue-500 text-white min-w-[25px] min-h-[25px]" />
                      Cases
                    </Button>
                  </Link>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <SearchCommand serverId={serverId} />
        </div>
      </Card>
    </div>
  );
};

/*
<div
  className={`py-1.5 w-[80%] px-3 bg-zinc-900 rounded-md flex flex-row items-center justify-center gap-3 align-middle text-sm font-normal text-gray-400 border-1 border-zinc-700 shadow-xl`}
>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span className="flex flex-row items-center gap-1">
          <Users size={12} /> {currentServerMembersData?.length}
        </span>
      </TooltipTrigger>
      <TooltipContent align="start" side="bottom" className="z-[99]">
        <span className="text-md z-40 font-bold text-white">
          {currentServerMembersData?.length}
          <br />
          members
        </span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span className="flex flex-row items-center gap-1">
          <MessageSquare size={12} />{" "}
          {currentServerData?.data.dsData.channels.length}
        </span>
      </TooltipTrigger>
      <TooltipContent align="start" side="bottom">
        <span className="text-md z-40 font-bold text-white">
          {currentServerData?.data.dsData.channels.length}
          <br />
          channels
        </span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span className="flex flex-row items-center gap-1">
          <PaintRoller size={12} />{" "}
          {currentServerData?.data.dsData.roles.length}
        </span>
      </TooltipTrigger>
      <TooltipContent align="start" side="bottom">
        <span className="text-md z-40 font-bold text-white">
          {currentServerData?.data.dsData.roles.length}
          <br />
          roles
        </span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>
<SearchDialog serverId={serverId} />
</div>
<ul className={`mt-2 space-y-2 font-medium`}>
<li>
  <span className="text-sm px-4 font-bold uppercase text-gray-300">
    Menu
  </span>
</li>
{hasAccess("overview") && (
  <li>
    <Link
      href={`/:d:/app/server/${currentServerData?.data.dsData.id}`}
      className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
    >
      <span>Overview</span>
    </Link>
  </li>
)}

{hasAccess("members") && (
  <li>
    <Link
      href={`/:d:/app/server/${currentServerData?.data.dsData.id}/members`}
      className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
    >
      <span>Members</span>
    </Link>
  </li>
)}

{hasAccess("audit_log") && (
  <li>
    <Link
      href={`/:d:/app/server/${currentServerData?.data.dsData.id}/audit-log`}
      className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
    >
      <span>Audit Log</span>
    </Link>
  </li>
)}

{hasAccess("team") && (
  <li>
    <Link
      href={`/:d:/app/server/${currentServerData?.data.dsData.id}/team`}
      className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
    >
      <span>Team</span>
    </Link>
  </li>
)}

{hasAccess("settings") && (
  <li>
    <Link
      href={`/:d:/app/server/${currentServerData?.data.dsData.id}/settings`}
      className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
    >
      <span>Settings</span>
    </Link>
  </li>
)}

{hasAccess("mymod_cases") && (
  <>
    <li>
      <span className="text-sm px-4 font-bold uppercase text-gray-300">
        Moderation
      </span>
    </li>
    <li>
      <Link
        href={`/:d:/app/server/${currentServerData?.data.dsData.id}/cases`}
        className="justify-left group flex items-center px-4 py-2 text-white hover:bg-zinc-900 transition-all duration-500"
      >
        <span>Cases</span>
      </Link>
    </li>
  </>
)}
</ul>
*/
