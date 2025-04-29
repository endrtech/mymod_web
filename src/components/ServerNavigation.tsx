"use client";
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getCurrentGuildMembers } from "@/app/actions/getCurrentGuildMembers";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getUser } from "@/app/actions/getUser";
import { getUserGuildRelationship } from "@/app/actions/guilds/getUserGuildRelationship";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Loader2, MessageSquare, PaintRoller, Users } from "lucide-react";
import { SearchDialog } from "./dialog/SearchDialog";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ServerNavigation = () => {
  let font;
  const [serverId, setServerId] = useState("");
  const [discordData, setDiscordData] = useState<any>();
  const [currentServerData, setCurrentServerData] = useState<any>();
  const [currentServerMembersData, setCurrentServerMembersData] =
    useState<any>();
  const [getGuildRelationship, setGuildRelationship] = useState<any>();

  const getData = async () => {
    const serverIdParam = window.localStorage.getItem("currentServerId");
    if (serverIdParam) {
      setServerId(serverIdParam);
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

  if (currentServerData === undefined) {
    return (
      <div
        className={`${font} flex flex-row h-screen items-start justify-center gap-2`}
      >
        <div className="flex flex-col mt-6 gap-2 w-full items-center justify-center">
          <Loader2 className="text-white animate-spin" />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`${font} flex flex-col h-screen w-full items-left justify-left gap-2`}
      >
        <div className="w-[90%] mx-4 -mt-4 h-auto">
          <div
            className="w-full h-[50px] rounded-[20px] blur-[40px]"
            style={{
              background: `radial-gradient(circle at top center, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_1 : "#00BFFF"}99 10%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_2 : "#8A2BE6"}66 40%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_3 : "#FF0080"}4D 70%)`,
            }}
          ></div>
        </div>
        <div
          className={`px-4 w-full flex flex-col items-left justify-center gap-3 -mt-8 z-[3] mb-2`}
        >
          <Image
            src={`https://cdn.discordapp.com/icons/${currentServerData?.data.dsData.id}/${currentServerData?.data.dsData.icon}`}
            alt={`${currentServerData?.name}`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col items-left gap-1">
            <h3 className="text-white font-medium text-sm">
              {currentServerData?.data.dsData.name}
            </h3>
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center justify-center w-full">
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
      </div>
    );
  }
};
