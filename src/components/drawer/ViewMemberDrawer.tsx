"use client";
import { getCurrentGuildMembers } from "@/app/actions/getCurrentGuildMembers";
import { getGuildMember } from "@/app/actions/getGuildMember";
import { FormEvent, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Ban,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Clipboard,
  Clock5,
  Cog,
  DotSquare,
  Hammer,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageCircleWarning,
  MinusCircle,
  PaintRoller,
  Timer,
  UserCog,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { banGuildMember } from "@/app/actions/guilds/members/banGuildMember";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { warnGuildMember } from "@/app/actions/guilds/members/warnGuildMember";
import DatePicker from "../DatePicker";
import { timeoutGuildMember } from "@/app/actions/guilds/members/timeoutGuildMember";
import DurationUnitSelect from "../DurationUnitSelect";
import { kickGuildMember } from "@/app/actions/guilds/members/kickGuildMember";
import { getGuildMemberBans } from "@/app/actions/guilds/members/getGuildMemberBans";
import { getGuildMemberWarns } from "@/app/actions/guilds/members/getGuildMemberWarns";
import { getGuildMemberTimeouts } from "@/app/actions/guilds/members/getGuildMemberTimeouts";
import { getGuildMemberKicks } from "@/app/actions/guilds/members/getGuildMemberKicks";
import { getGuildMemberLogs } from "@/app/actions/guilds/members/getGuildMemberLogs";
import moment from "moment";
import DatePickerDrawer from "./DatePickerDrawer";

export const ViewMemberDrawer = ({ serverId, userId }: any) => {
  const [guildMemberData, setGuildMemberData] = useState<any>(null);
  const [serverData, setServerData] = useState<any>({});
  const [userData, setUserData] = useState<any>("");
  const [memberBanData, setMemberBanData] = useState<any>(null);
  const [memberWarnData, setMemberWarnData] = useState<any>(null);
  const [memberKickData, setMemberKickData] = useState<any>(null);
  const [memberTimeoutData, setMemberTimeoutData] = useState<any>(null);
  const [memberLogData, setMemberLogData] = useState<any>({});
  const [tabValue, setTabValue] = useState("general");
  const [warnTimestamp, setWarnTimestamp] = useState("");
  const [timeoutTime, setTimeoutTime] = useState("minutes");
  useEffect(() => {
    const fetchData = async () => {
      const response = await getGuildMember(serverId, userId);
      const response2 = await getCurrentGuild(serverId);
      const response3 = await getDiscordUser();
      const getMemberBans = await getGuildMemberBans(serverId, userId);
      const getMemberWarns = await getGuildMemberWarns(serverId, userId);
      const getMemberTimeouts = await getGuildMemberTimeouts(serverId, userId);
      const getMemberKicks = await getGuildMemberKicks(serverId, userId);
      const getMemberLogs = await getGuildMemberLogs(serverId, userId);
      setGuildMemberData(response);
      setServerData(response2);
      setUserData(response3?.id);
      setMemberBanData(getMemberBans);
      setMemberWarnData(getMemberWarns);
      setMemberTimeoutData(getMemberTimeouts);
      setMemberKickData(getMemberKicks);
      setMemberLogData(getMemberLogs);
    };
    fetchData();
  }, [serverId, userId]);

  const bannerURL = guildMemberData?.userBanner;
  const avatarURL = guildMemberData?.discordUser?.displayAvatarURL;

  const banUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const banUserAsync = async () => {
      const response = await banGuildMember(
        serverId,
        guildMemberData?.discordUser?.id,
        {
          deleteMsgDays: data.get("deleteMsgDays"),
          banReason: data.get("banReason"),
          createdById: userData,
        },
      );

      if (response === 200) {
        return;
      }
    };
    banUserAsync();
    const successToast = toast.success("User has been banned!");
    setTimeout(() => toast.dismiss(successToast), 3000);
  };

  const warnUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const banUserAsync = async () => {
      const response = await warnGuildMember(
        serverId,
        guildMemberData?.discordUser?.id,
        {
          warnReason: data.get("warnReason"),
          createdById: userData,
          warnTimestamp: data.get("warnTimestamp"),
        },
      );

      if (response === 200) {
        return;
      }
    };
    banUserAsync();
    const successToast = toast.success("User has been banned!");
    setTimeout(() => toast.dismiss(successToast), 3000);
  };

  const timeoutUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const banUserAsync = async () => {
      const response = await timeoutGuildMember(
        serverId,
        guildMemberData?.discordUser?.id,
        {
          timeoutReason: data.get("timeoutReason"),
          createdById: userData,
          timeoutDuration: data.get("timeoutMinutes"),
          timeoutTime: data.get("timeoutTime"),
        },
      );

      if (response === 200) {
        return;
      }
    };
    banUserAsync();
    const successToast = toast.success("User has been timed out!");
    setTimeout(() => toast.dismiss(successToast), 3000);
  };

  const kickUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const banUserAsync = async () => {
      const response = await kickGuildMember(
        serverId,
        guildMemberData?.discordUser?.id,
        {
          kickReason: data.get("kickReason"),
          createdById: userData,
        },
      );

      if (response === 200) {
        return;
      }
    };
    banUserAsync();
    const successToast = toast.success("User has been kicked!");
    setTimeout(() => toast.dismiss(successToast), 3000);
  };

  const formatTime = (duration: any, time: any) => {
    let durationFormatted = duration;

    if (duration > 0) {
      if (time === "minutes") durationFormatted /= 60 / 1000;
      if (time === "hours") durationFormatted /= 60 / 60 / 1000;
      if (time === "seconds") durationFormatted /= 1000;
    }

    return durationFormatted;
  };

  return (
    <div className="flex flex-col items-start justify-left w-full bg-black">
      <Tabs
        defaultValue="general"
        value={tabValue}
        className="flex flex-col items-start justify-left w-full"
      >
        <TabsList className="mt-2 w-full h-full overflow-x-auto whitespace-nowrap flex flex-row items-start justify-start p-2 rounded-none bg-zinc-900 scrollbar-thin scrollbar-thumb-zinc-700">
          <TabsTrigger
            value="general"
            onClick={() => setTabValue("general")}
            className="w-full max-h-[30px] flex flex-row justify-start"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger
            value="roles"
            onClick={() => setTabValue("roles")}
            className="w-full max-h-[30px] flex flex-row justify-start"
          >
            <PaintRoller className="h-4 w-4" />
            <span>Roles</span>
          </TabsTrigger>
          <TabsTrigger
            value="permissions"
            onClick={() => setTabValue("permissions")}
            className="w-full max-h-[30px] flex flex-row justify-start"
          >
            <UserCog className="h-4 w-4" />
            <span>Permissions</span>
          </TabsTrigger>
          <TabsTrigger
            value="cases"
            onClick={() => setTabValue("cases")}
            className="w-full max-h-[30px] flex flex-row justify-start"
          >
            <Briefcase className="h-4 w-4" />
            <span>Cases</span>
          </TabsTrigger>
          <TabsTrigger
            value="punish-user"
            onClick={() => setTabValue("punish-user")}
            className="w-full max-h-[30px] flex flex-row justify-start"
          >
            <Hammer className="h-4 w-4" />
            <span>Punish User</span>
          </TabsTrigger>
          <TabsTrigger
            value="user-bans"
            onClick={() => setTabValue("user-bans")}
            className="w-full max-h-[30px] flex flex-row justify-between"
          >
            <div className="flex flex-row justify-start items-center gap-1.5">
              <Ban className="h-4 w-4" />
              <span>Bans</span>
            </div>
            {memberBanData !== null && memberBanData.data?.length > 0 && (
              <Badge variant="outline" className="rounded-full">
                {memberBanData?.data.length}
              </Badge>
            )}
            {memberBanData === null && <Loader2 className="animate-spin" />}
          </TabsTrigger>
          <TabsTrigger
            value="user-warns"
            onClick={() => setTabValue("user-warns")}
            className="w-full max-h-[30px] flex flex-row justify-start"
          >
            <div className="flex flex-row justify-start items-center gap-1.5">
              <MessageCircleWarning className="h-4 w-4" />
              <span>Warns</span>
            </div>
            {memberWarnData !== null && memberWarnData.data?.length > 0 && (
              <Badge variant="outline" className="rounded-full">
                {memberWarnData?.data.length}
              </Badge>
            )}
            {memberWarnData === null && <Loader2 className="animate-spin" />}
          </TabsTrigger>
          <TabsTrigger
            value="user-timeouts"
            onClick={() => setTabValue("user-timeouts")}
            className="w-full max-h-[30px] flex flex-row justify-start"
          >
            <div className="flex flex-row justify-start items-center gap-1.5">
              <Timer className="h-4 w-4" />
              <span>Timeouts</span>
            </div>
            {memberTimeoutData !== null &&
              memberTimeoutData.data?.length > 0 && (
                <Badge variant="outline" className="rounded-full">
                  {memberTimeoutData?.data.length}
                </Badge>
              )}
            {memberTimeoutData === null && <Loader2 className="animate-spin" />}
          </TabsTrigger>
          <TabsTrigger
            value="user-kicks"
            onClick={() => setTabValue("user-kicks")}
            className="w-full max-h-[30px] flex flex-row justify-start"
          >
            <div className="flex flex-row justify-start items-center gap-1.5">
              <LogOut className="h-4 w-4" />
              <span>Kicks</span>
            </div>
            {memberKickData !== null && memberKickData.data?.length > 0 && (
              <Badge variant="outline" className="rounded-full">
                {memberKickData?.data.length}
              </Badge>
            )}
            {memberKickData === null && <Loader2 className="animate-spin" />}
          </TabsTrigger>
          <TabsTrigger
            value="audit-log"
            onClick={() => setTabValue("audit-log")}
            className="w-full max-h-[30px] flex flex-row justify-start"
          >
            <div className="flex flex-row justify-start items-center gap-1.5">
              <Clipboard className="h-4 w-4" />
              <span>Audit Log</span>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="w-full h-full">
          <div className="flex flex-col items-center justify-start w-full h-full">
            <Card className="p-0 w-full h-full border-none">
              <CardContent className="p-0 h-[600px] w-full bg-black border-none border-zinc-800 rounded-none">
                <div className="flex flex-col items-start justify-left p-0">
                  {bannerURL !== undefined ? (
                    <Image
                      src={`https://cdn.discordapp.com/banners/${guildMemberData?.discordUser?.id}/${guildMemberData?.discordUser?.banner}.png?size=1024`}
                      alt="Banner"
                      width={500}
                      height={100}
                      className="w-[100%] h-[100px] object-cover object-center"
                    />
                  ) : (
                    <div
                      className={`w-full h-[100px] bg-zinc-800 flex items-center justify-center`}
                    >
                      &nbsp;
                    </div>
                  )}
                  {avatarURL !== undefined ? (
                    <Image
                      src={
                        `https://cdn.discordapp.com/avatars/${guildMemberData?.discordUser?.id}/${guildMemberData?.discordUser?.avatar}` ||
                        "https://cdn.discordapp.com/embed/avatars/5.png"
                      }
                      alt="Avatar"
                      width={70}
                      height={70}
                      className="rounded-full -mt-[35px] ml-2 border-4 border-black"
                    />
                  ) : (
                    <Loader2
                      size={70}
                      className="animate-spin rounded-full -mt-[35px] ml-2 border-4 bg-black border-black"
                    />
                  )}
                  <div className="flex flex-col items-start justify-left -mt-2 p-4 w-full">
                    {guildMemberData?.discordUser && (
                      <>
                        <h2 className="text-xl font-semibold text-zinc-300">
                          {guildMemberData?.discordUser?.globalName ||
                            guildMemberData?.discordUser?.username}
                        </h2>
                        <p className="text-sm text-zinc-400">
                          {guildMemberData?.discordUser?.username}
                        </p>
                      </>
                    )}
                    {!guildMemberData?.discordUser && (
                      <Loader2 className="animate-spin" />
                    )}
                    <div className="flex flex-row flex-wrap items-center justify-start mt-2 gap-2">
                      <Badge
                        variant="outline"
                        className="text-zinc-300 bg-zinc-800"
                      >
                        {guildMemberData !== null ? (
                          guildMemberData?.discordUser?.bot === false ? (
                            "User"
                          ) : (
                            "Bot"
                          )
                        ) : (
                          <Loader2 className="animate-spin" />
                        )}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-zinc-300 bg-zinc-800"
                      >
                        {guildMemberData !== null ? (
                          guildMemberData?.guildMember?.pending === true ? (
                            <div className="flex flex-row items-center justify-start">
                              <MinusCircle className="h-4 w-4 mr-1" />
                              Pending
                            </div>
                          ) : (
                            <div className="flex flex-row items-center justify-start">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verified
                            </div>
                          )
                        ) : (
                          <Loader2 className="animate-spin" />
                        )}
                      </Badge>
                    </div>
                    <div className="flex flex-col items-start justify-left mt-4 w-full">
                      <Button
                        className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                        onClick={() => setTabValue("roles")}
                      >
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex flex-row items-center justify-start">
                            <PaintRoller className="h-4 w-4 mr-2" />
                            {guildMemberData === null ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              guildMemberData?.memberRoles?.length || 0
                            )}{" "}
                            Role
                            {guildMemberData?.memberRoles?.length === 1
                              ? ""
                              : "s"}
                          </div>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </Button>
                      <Button
                        className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                        onClick={() => setTabValue("permissions")}
                      >
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex flex-row items-center justify-start">
                            <UserCog className="h-4 w-4 mr-2" />
                            {guildMemberData === null ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              guildMemberData?.memberPermissions?.length || 0
                            )}{" "}
                            Permission
                            {guildMemberData?.memberPermissions?.length === 1
                              ? ""
                              : "s"}
                          </div>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </Button>
                      <Button
                        className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                        onClick={() => setTabValue("user-bans")}
                      >
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex flex-row items-center justify-start">
                            <Ban className="h-4 w-4 mr-2" />
                            {memberBanData === null ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              memberBanData.data?.length || 0
                            )}{" "}
                            Ban
                            {memberBanData !== null &&
                            memberBanData.data?.length === 1
                              ? ""
                              : "s"}
                          </div>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </Button>
                      <Button
                        className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                        onClick={() => setTabValue("user-warns")}
                      >
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex flex-row items-center justify-start">
                            <MessageCircleWarning className="h-4 w-4 mr-2" />
                            {memberWarnData === null ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              memberWarnData.data?.length || 0
                            )}{" "}
                            Warn
                            {memberWarnData !== null &&
                            memberWarnData.data?.length === 1
                              ? ""
                              : "s"}
                          </div>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </Button>
                      <Button
                        className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                        onClick={() => setTabValue("user-timeouts")}
                      >
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex flex-row items-center justify-start">
                            <Timer className="h-4 w-4 mr-2" />
                            {memberTimeoutData === null ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              memberTimeoutData.data?.length || 0
                            )}{" "}
                            Timeout
                            {memberTimeoutData !== null &&
                            memberTimeoutData.data?.length === 1
                              ? ""
                              : "s"}
                          </div>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </Button>
                      <Button
                        className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                        onClick={() => setTabValue("user-kicks")}
                      >
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex flex-row items-center justify-start">
                            <Timer className="h-4 w-4 mr-2" />
                            {memberKickData === null ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              memberKickData.data?.length || 0
                            )}{" "}
                            Kick
                            {memberKickData !== null &&
                            memberKickData.data?.length === 1
                              ? ""
                              : "s"}
                          </div>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </Button>
                      <Button
                        className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                        onClick={() => setTabValue("cases")}
                      >
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex flex-row items-center justify-start">
                            <Briefcase className="h-4 w-4 mr-2" />
                            {guildMemberData?.memberCases?.length} Case
                            {guildMemberData?.memberCases?.length === 1
                              ? ""
                              : "s"}
                          </div>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="roles" className="w-full h-full">
          <div className="flex flex-col items-start justify-left p-4 mt-2 w-full h-full">
            <h2 className="text-xl font-semibold text-zinc-300">Roles</h2>
            <div className="flex flex-col items-start justify-left mt-4 w-full h-[600px]">
              {guildMemberData?.memberRoles?.map((role: any) => (
                <Button
                  key={role.id}
                  className="cursor-default w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                >
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row items-center justify-start">
                      {role.name}
                    </div>
                  </div>
                </Button>
              ))}
              {guildMemberData?.memberRoles.length === 0 && (
                <h2 className="text-sm font-semibold text-zinc-500">
                  No roles to display.
                </h2>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="permissions" className="w-full h-full">
          <div className="flex flex-col items-start justify-left p-4 mt-2 w-full">
            <h2 className="text-xl font-semibold text-zinc-300">Permissions</h2>
            <div className="flex flex-col items-start justify-left mt-4 w-full overflow-y-scroll h-[600px]">
              {guildMemberData?.memberPermissions?.map((permission: any) => (
                <Button
                  key={permission}
                  className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                >
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row items-center justify-start">
                      {permission}
                    </div>
                  </div>
                </Button>
              ))}
              {guildMemberData?.memberPermissions.length === 0 && (
                <h2 className="text-sm font-semibold text-zinc-500">
                  No permissions to display.
                </h2>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cases" className="w-full h-full">
          <div className="flex flex-col items-start justify-left p-4 mt-2 w-full">
            <h2 className="text-xl font-semibold text-zinc-300">Cases</h2>
            <div className="flex flex-col items-start justify-left mt-4 w-full overflow-y-scroll h-[400px]">
              {guildMemberData?.memberCases?.map((caseItem: any) => (
                <Link
                  key={caseItem.caseID}
                  href={`/:d:/app/server/${serverId}/cases/${caseItem.caseID}`}
                  className="w-full"
                >
                  <Button className="cursor-pointer w-full h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="flex flex-col gap-1 items-start justify-start">
                        <span className="capitalize text-wrap text-left">
                          {caseItem.case_info.case_type}{" "}
                          {caseItem.user_info.globalName} from{" "}
                          {serverData?.data.dsData.name}
                        </span>
                        <span className="text-wrap text-left">
                          Case ID: {caseItem.caseID}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-400" />
                    </div>
                  </Button>
                </Link>
              ))}
              {guildMemberData?.memberCases.length === 0 && (
                <Button
                  disabled
                  className="w-full h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                >
                  <span>There are no recorded cases for this user.</span>
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="punish-user" className="w-full h-full">
          <div className="flex flex-col items-start justify-left -mt-4 w-full h-[600px]">
            <Tabs defaultValue="warn-user" className="w-full h-full">
              <TabsList className="w-full rounded-none mt-1">
                <TabsTrigger value="warn-user">Warn</TabsTrigger>
                <TabsTrigger value="ban-user">Ban</TabsTrigger>
                <TabsTrigger value="timeout-user">Timeout</TabsTrigger>
                <TabsTrigger value="kick-user">Kick</TabsTrigger>
              </TabsList>
              <TabsContent value="warn-user" className="rounded-lg h-[600px]">
                <div className="flex flex-col items-start gap-3 justify-left p-4 h-full w-full">
                  <h2 className="text-lg font-semibold text-zinc-300">
                    Warn{" "}
                    {guildMemberData?.discordUser?.globalName ||
                      guildMemberData?.discordUser?.username}
                  </h2>
                  <form
                    onSubmit={warnUser}
                    className="flex flex-col justify-between gap-2 h-[400px] w-full"
                  >
                    <div className="flex flex-col justify-between gap-4 w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="warnReason" className="text-white">
                          Whats the reason for the warn?
                        </Label>
                        <Input
                          name="warnReason"
                          placeholder="e.g: swearing in the server"
                          className="w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="warnTimestamp" className="text-white">
                          When do you want the warn to expire?
                        </Label>
                        <DatePickerDrawer
                          onChange={(value: any) => setWarnTimestamp(value)}
                        />
                        <input
                          readOnly
                          hidden
                          name="warnTimestamp"
                          value={warnTimestamp}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-between items-center w-full">
                      <Label className="text-sm text-zinc-400 font-normal">
                        Please note: this method will automatically warn the
                        user, and create a case for logging.
                      </Label>
                      <Button
                        type="submit"
                        variant="destructive"
                        className="w-full"
                      >
                        Warn user
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
              <TabsContent value="ban-user" className="rounded-lg h-[600px]">
                <div className="flex flex-col items-start gap-3 justify-left p-4 h-full w-full">
                  <h2 className="text-lg font-semibold text-zinc-300">
                    Ban{" "}
                    {guildMemberData?.discordUser?.globalName ||
                      guildMemberData?.discordUser?.username}
                  </h2>
                  <form
                    onSubmit={banUser}
                    className="flex flex-col justify-between gap-2 h-[400px] w-full"
                  >
                    <div className="flex flex-col justify-between gap-4 w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="banReason" className="text-white">
                          Whats the reason for the ban?
                        </Label>
                        <Input
                          name="banReason"
                          placeholder="e.g: swearing in the server"
                          className="w-full text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="deleteMsgDays" className="text-white">
                          Enter in how many days to delete messages from:
                        </Label>
                        <div className="flex flex-row items-center gap-1">
                          <Input
                            name="deleteMsgDays"
                            placeholder="Max: 7"
                            className="w-full text-white"
                          />
                          <Input
                            disabled
                            value="days"
                            className="w-[100px] text-white"
                          />
                        </div>
                        <Label
                          htmlFor="deleteMsgDays"
                          className="text-xs text-zinc-500 font-normal"
                        >
                          Enter in the number of days. If you do not want to
                          delete any messages, leave this field blank.
                        </Label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-center w-full">
                      <Label className="text-sm text-zinc-400 font-normal">
                        Please note: this method will automatically ban the
                        user, and create a case for logging.
                      </Label>
                      <Button
                        type="submit"
                        variant="destructive"
                        className="w-full"
                      >
                        Ban user
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
              <TabsContent value="timeout-user" className="rounded-lg h-[100%]">
                <div className="flex flex-col items-start gap-3 justify-left p-4 h-full w-full">
                  <h2 className="text-lg font-semibold text-zinc-300">
                    Timeout{" "}
                    {guildMemberData?.discordUser?.globalName ||
                      guildMemberData?.discordUser?.username}
                  </h2>
                  <form
                    onSubmit={timeoutUser}
                    className="flex flex-col justify-between gap-2 h-[400px] w-full"
                  >
                    <div className="flex flex-col justify-between gap-4 w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="timeoutReason" className="text-white">
                          Whats the reason for the timeout?
                        </Label>
                        <Input
                          name="timeoutReason"
                          placeholder="e.g: swearing in the server"
                          className="w-full text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="timeoutMinutes" className="text-white">
                          Enter in when the timeout should expire:
                        </Label>
                        <div className="flex flex-row items-center gap-1">
                          <Input
                            name="timeoutMinutes"
                            placeholder="e.g: 2"
                            className="w-full text0white"
                          />
                          <DurationUnitSelect
                            value={timeoutTime}
                            onChange={setTimeoutTime}
                          />
                          <input
                            hidden
                            readOnly
                            name="timeoutTime"
                            value={timeoutTime}
                          />
                        </div>
                        <Label
                          htmlFor="timeoutMinutes"
                          className="text-xs text-zinc-500 font-normal"
                        >
                          Timeouts can only be set for a maximum duration of 24
                          hours. If you want something more permanent, consider
                          using a ban instead.
                        </Label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-between items-center w-full">
                      <Label className="text-sm text-zinc-400 font-normal">
                        Please note: this method will automatically time the
                        user out, and create a case for logging.
                      </Label>
                      <Button
                        type="submit"
                        variant="destructive"
                        className="w-full"
                      >
                        Timeout user
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
              <TabsContent value="kick-user" className="rounded-lg h-full">
                <div className="flex flex-col items-start gap-3 justify-left p-3 h-full w-full">
                  <h2 className="text-lg font-semibold text-zinc-300">
                    Kick{" "}
                    {guildMemberData?.discordUser?.globalName ||
                      guildMemberData?.discordUser?.username}
                  </h2>
                  <form
                    onSubmit={kickUser}
                    className="flex flex-col justify-between gap-2 h-[400px] w-full"
                  >
                    <div className="flex flex-row justify-between gap-4 w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <Label htmlFor="kickReason" className="text-white">
                          Whats the reason for the kick?
                        </Label>
                        <Input
                          name="kickReason"
                          placeholder="e.g: swearing in the server"
                          className="w-full text-white"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-between items-center w-full">
                      <Label className="text-sm text-zinc-400 font-normal">
                        Please note: this method will automatically kick the
                        user, and create a case for logging.
                      </Label>
                      <Button
                        type="submit"
                        variant="destructive"
                        className="w-full"
                      >
                        Kick user
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
        <TabsContent value="user-bans" className="w-full h-full">
          <div className="flex flex-col items-start justify-left p-4 mt-2 w-full">
            <h2 className="text-xl font-semibold text-zinc-300">Bans</h2>
            <div className="flex flex-col items-start justify-left mt-4 w-full overflow-y-scroll h-[400px]">
              {memberBanData?.data?.length > 0 &&
                memberBanData.data?.map((caseItem: any) => (
                  <Link
                    key={caseItem.caseID}
                    href={`/:d:/app/server/${serverId}/cases/${caseItem.caseID}`}
                    className="w-full"
                  >
                    <Button className="cursor-pointer w-full h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500">
                      <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-col gap-1 items-start justify-start">
                          <span className="capitalize">
                            {caseItem.case_info.case_type}{" "}
                            {caseItem.user_info.globalName} from{" "}
                            {serverData?.data.dsData.name}
                          </span>
                          <span>
                            Ban expires: {caseItem.case_info.case_duration}
                          </span>
                          <span>Case ID: {caseItem.caseID}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-zinc-400" />
                      </div>
                    </Button>
                  </Link>
                ))}
              {memberBanData?.data?.length === 0 && (
                <Button
                  disabled
                  className="w-full h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                >
                  <span>There are no recorded bans for this user.</span>
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="user-warns" className="w-full h-full">
          <div className="flex flex-col items-start justify-left p-4 mt-2 w-full">
            <h2 className="text-xl font-semibold text-zinc-300">Warns</h2>
            <div className="flex flex-col items-start justify-left mt-4 w-full overflow-y-scroll h-[400px]">
              {memberWarnData?.data?.length > 0 &&
                memberWarnData.data?.map((caseItem: any) => (
                  <Link
                    key={caseItem.caseID}
                    href={`/:d:/app/server/${serverId}/cases/${caseItem.caseID}`}
                    className="w-full"
                  >
                    <Button className="cursor-pointer w-auto h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500">
                      <div className="flex flex-col items-center justify-start w-full">
                        <div className="flex flex-col gap-1 items-start justify-start">
                          <span className="capitalize text-wrap text-left">
                            {caseItem.case_info.case_type}{" "}
                            {caseItem.user_info.globalName} from{" "}
                            {serverData?.data.dsData.name}
                          </span>
                          <span>
                            Warn expires:{" "}
                            {moment(caseItem.case_info.case_duration).format(
                              "DD MMM YYYY",
                            )}
                          </span>
                          <span className="text-wrap text-left">
                            Case ID: {caseItem.caseID}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-row items-center justify-between w-full">
                          <span>View</span>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </div>
                    </Button>
                  </Link>
                ))}
              {memberWarnData?.data?.length === 0 && (
                <Button
                  disabled
                  className="w-full h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                >
                  <span>There are no recorded warns for this user.</span>
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="user-timeouts" className="w-full h-full">
          <div className="flex flex-col items-start justify-left p-4 mt-2 w-full">
            <h2 className="text-xl font-semibold text-zinc-300">Timeouts</h2>
            <div className="flex flex-col items-start justify-left mt-4 w-full overflow-y-scroll h-[400px]">
              {memberTimeoutData?.data?.length > 0 &&
                memberTimeoutData.data?.map((caseItem: any) => (
                  <Link
                    key={caseItem.caseID}
                    href={`/:d:/app/server/${serverId}/cases/${caseItem.caseID}`}
                    className="w-full"
                  >
                    <Button className="cursor-pointer w-auto h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500">
                      <div className="flex flex-col items-center justify-start w-full">
                        <div className="flex flex-col gap-1 items-start justify-start">
                          <span className="capitalize text-wrap text-left">
                            {caseItem.case_info.case_type}{" "}
                            {caseItem.user_info.globalName} from{" "}
                            {serverData?.data.dsData.name}
                          </span>
                          <span>
                            Timeout duration:{" "}
                            {formatTime(
                              caseItem.case_info.timeout_duration,
                              caseItem.case_info.timeout_time,
                            ) || 0}{" "}
                            {caseItem.case_info.timeout_time || "seconds"}
                          </span>
                          <span className="text-wrap text-left">
                            Case ID: {caseItem.caseID}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-row items-center justify-between w-full">
                          <span>View</span>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </div>
                    </Button>
                  </Link>
                ))}
              {memberTimeoutData?.data?.length === 0 && (
                <Button
                  disabled
                  className="w-full h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                >
                  <span>There are no recorded timeouts for this user.</span>
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="user-kicks" className="w-full h-full">
          <div className="flex flex-col items-start justify-left p-4 mt-2 w-full">
            <h2 className="text-xl font-semibold text-zinc-300">Kicks</h2>
            <div className="flex flex-col items-start justify-left mt-4 w-full overflow-y-scroll h-[400px]">
              {memberKickData?.data?.length > 0 &&
                memberKickData?.data?.map((caseItem: any) => (
                  <Link
                    key={caseItem.caseID}
                    href={`/:d:/app/server/${serverId}/cases/${caseItem.caseID}`}
                    className="w-full"
                  >
                    <Button className="cursor-pointer w-auto h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500">
                      <div className="flex flex-col items-center justify-start w-full">
                        <div className="flex flex-col gap-1 items-start justify-start">
                          <span className="capitalize text-wrap text-left">
                            {caseItem.case_info.case_type}{" "}
                            {caseItem.user_info.globalName} from{" "}
                            {serverData?.data.dsData.name}
                          </span>
                          <span className="text-wrap text-left">
                            Case ID: {caseItem.caseID}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-row items-center justify-between w-full">
                          <span>View</span>
                          <ChevronRight className="h-4 w-4 text-zinc-400" />
                        </div>
                      </div>
                    </Button>
                  </Link>
                ))}
              {memberKickData?.data?.length === 0 && (
                <Button
                  disabled
                  className="w-full h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                >
                  <span>There are no recorded kicks for this user.</span>
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="audit-log" className="w-full h-full">
          <div className="flex flex-col items-start justify-left p-4 mt-2 w-full">
            <h2 className="text-xl font-semibold text-zinc-300">Audit Log</h2>
            <div className="flex flex-col items-start justify-left mt-4 w-full overflow-y-scroll h-[400px]">
              {memberLogData.data?.map((logItem: any) => (
                <Button
                  key={logItem.logID}
                  className="cursor-pointer w-auto h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500"
                >
                  <div className="flex flex-col items-center justify-start w-full">
                    <div className="flex flex-col gap-1 items-start justify-start">
                      <span className="text-wrap text-left">
                        {logItem.actions_taken}
                      </span>
                      <span>
                        Executor ID: {logItem.executorID || "Unknown"}
                      </span>
                      <span className="text-wrap text-left">
                        Log ID: {logItem.logID}
                      </span>
                      <span>
                        Executed on:{" "}
                        {moment(logItem.timestamp).format(
                          "DD MMM YYYY, hh:mm a",
                        )}
                      </span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <Toaster className="dark" />
    </div>
  );
};
