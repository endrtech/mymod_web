import { completeCase } from "@/app/actions/cases/completeCase";
import { getCaseData } from "@/app/actions/cases/getCaseData";
import { getCurrentGuildRelationships } from "@/app/actions/getCurrentGuildRelationships";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getGuildMember } from "@/app/actions/getGuildMember";
import { CompleteCaseDialog } from "@/components/dialog/CompleteCaseDialog";
import { ReassignCaseDialog } from "@/components/dialog/ReassignCaseDialog";
import { RollbackCaseDialog } from "@/components/dialog/RollbackCaseDialog";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewMemberDialog } from "@/components/dialog/ViewMemberDialog";
import { ProgressIndicator } from "@radix-ui/react-progress";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import {
  Bot,
  Check,
  ChevronsRight,
  Pencil,
  RefreshCcw,
  RefreshCw,
  Rewind,
  Send,
  Slash,
  Trash,
  UserPen,
  UserSearch,
} from "lucide-react";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { Geist } from "next/font/google";
import Image from "next/image";
import React from "react";
import { EditCaseDialog } from "@/components/dialog/EditCaseDialog";
import { DeleteCaseDialog } from "@/components/dialog/DeleteCaseDialog";
import getCurrentGuild from "@/app/actions/getCurrentGuild";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function CasePage({
  params,
}: Readonly<{
  params: Promise<{ serverId: string; caseId: string }>;
}>) {
  const { serverId, caseId } = await params;
    const discordData = await getDiscordUser();
    const caseData = await getCaseData(caseId);
    const guildRelationshipData = await getCurrentGuildRelationships(serverId);
    const currentServerData = await getCurrentGuild(serverId);
    const memberData = await getGuildMember(serverId, caseData?.assignee_info.id);
    const caseMemberData = await getGuildMember(serverId, caseData?.user_info.id);
    const bg = currentServerData?.data.mmData.module_config.appearance?.background;
    const isVideo = bg?.endsWith(".mp4");

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
                    <div className="absolute z-[1] left-0 w-[100vw] h-full" style={{
                        backgroundImage: bg
                            ? `linear-gradient(to bottom, rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"}), rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"})), url('${bg}')`
                            : "none",
                        backgroundColor: bg ? undefined : "black",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}></div>
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
                <div className="w-full h-[50px] rounded-[20px] blur-[40px]" style={{
                    background: `radial-gradient(circle at top center, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_1 : "#00BFFF"}99 10%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_2 : "#8A2BE6"}66 40%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_3 : "#FF0080"}4D 70%)`,
                }}></div>
                <div className="flex flex-col items-left mt-[15px] w-full p-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/:d:/app/server/${serverId}`} className="hover:text-white">Overview</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/:d:/app/server/${serverId}/cases`} className="hover:text-white">Cases</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/:d:/app/server/${serverId}/cases/${caseId}`} className="hover:text-white capitalize">Case: {caseData?.case_info.case_type} {caseData?.user_info.globalName || caseData?.user_info.username}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className={`font-semibold text-4xl ${geistSans.className} text-zinc-300 capitalize`}>Case: {caseData?.case_info.case_type} {caseData?.user_info.globalName || caseData?.user_info.username}</div>
                    <div className="py-4 h-[70vh] overflow-y-auto">
                        <Card className="dark w-full p-0.5 mb-4">
                            <CardContent className="dark p-0.5">
                                <div className="flex flex-col items-start gap-2">
                                    <div className="pl-2 flex flex-row items-center justify-start gap-2 w-full">
                                        {
                                            caseData?.case_info.case_status !== "complete" && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <CompleteCaseDialog serverId={serverId} caseData={caseData} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Mark this case as complete
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )
                                        }
                                        {
                                            caseData?.case_info.case_status === "complete" && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <RollbackCaseDialog serverId={serverId} caseData={caseData} />
                                                        </TooltipTrigger>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )
                                        }
                                        <EditCaseDialog serverId={serverId} caseData={caseData} />
                                        <ReassignCaseDialog caseData={caseData} />
                                        <DeleteCaseDialog serverId={serverId} caseId={caseData?.caseID} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex flex-row items-start justify-between gap-2">
                            <div className="flex flex-col items-start justify-start gap-2 w-[20%]">
                                <Card className="dark w-full">
                                    <CardContent className="dark">
                                        <div className="flex flex-col items-start gap-2">
                                            <span className="text-sm font-normal text-zinc-500">Current status:</span>
                                            <div className="flex flex-row items-center justify-between w-full">
                                                <span className="text-lg font-bold text-white uppercase">
                                                    {caseData?.case_info.case_status}
                                                </span>
                                                <Button variant="outline" size="icon" className="dark text-white">
                                                    <Pencil size={16} />
                                                </Button>
                                            </div>
                                            <Progress value={caseData?.case_info.case_status === "created" ? 0 : caseData?.case_info.case_status === "pending" ? 50 : 100} className="w-full" />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="dark w-full">
                                    <CardContent className="dark flex flex-col gap-2">
                                        <div className="flex flex-row items-center gap-2">
                                            <Image
                                                src={`https://cdn.discordapp.com/avatars/${memberData?.discordUser.id}/${memberData?.discordUser.avatar}.png`}
                                                alt={memberData?.discordUser.username}
                                                width={50}
                                                height={50}
                                                className="rounded-full"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-white">
                                                    {memberData?.discordUser.globalName}
                                                </span>
                                                <span className="text-xs font-normal text-gray-600">
                                                    is assigned to this case
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="dark w-full">
                                    <CardContent className="dark">
                                        <div className="flex flex-col items-start gap-2">
                                            <h3 className="font-semibold">Case Actions</h3>
                                            {
                                                caseData?.case_info.actions_taken.includes("ban_user") && (
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Switch
                                                            id="ban_user"
                                                            checked={caseData?.case_info.actions_taken.includes("ban_user")}
                                                            disabled
                                                        />
                                                        <Label htmlFor="ban_user">Ban user</Label>
                                                    </div>
                                                )
                                            }
                                            {
                                                caseData?.case_info.actions_taken.includes("kick_user") && (
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Switch
                                                            id="kick_user"
                                                            checked={caseData?.case_info.actions_taken.includes("kick_user")}
                                                            disabled
                                                        />
                                                        <Label htmlFor="kick_user">Kick user</Label>
                                                    </div>
                                                )
                                            }
                                            {
                                                caseData?.case_info.actions_taken.includes("timeout_user") && (
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Switch
                                                            id="timeout_user"
                                                            checked={caseData?.case_info.actions_taken.includes("timeout_user")}
                                                            disabled
                                                        />
                                                        <Label htmlFor="timeout_user">Timeout user</Label>
                                                    </div>
                                                )
                                            }
                                            {
                                                caseData?.case_info.actions_taken.includes("purge_usr_msg") && (
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Switch
                                                            id="purge_usr_msg"
                                                            checked={caseData?.case_info.actions_taken.includes("purge_usr_msg")}
                                                            disabled
                                                        />
                                                        <Label htmlFor="purge_usr_msg">Delete all messages sent by user</Label>
                                                    </div>
                                                )
                                            }
                                            {
                                                caseData?.case_info.actions_taken.includes("unban_user") && (
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Switch
                                                            id="unban_user"
                                                            checked={caseData?.case_info.actions_taken.includes("unban_user")}
                                                            disabled
                                                        />
                                                        <Label htmlFor="unban_user">Unban User</Label>
                                                    </div>
                                                )
                                            }
                                            {
                                                caseData?.case_info.actions_taken.includes("send_dm_case_closed") && (
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Switch
                                                            id="send_dm_case_closed"
                                                            checked={caseData?.case_info.actions_taken.includes("send_dm_case_closed")}
                                                            disabled
                                                        />
                                                        <Label htmlFor="send_dm_case_closed">Send DM to user with case outcome</Label>
                                                    </div>
                                                )
                                            }
                                            {
                                                caseData?.case_info.actions_taken.includes("send_dm_case_outcome") && (
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Switch
                                                            id="send_dm_case_outcome"
                                                            checked={caseData?.case_info.actions_taken.includes("send_dm_case_outcome")}
                                                            disabled
                                                        />
                                                        <Label htmlFor="send_dm_case_outcome">Send DM to user with case outcome</Label>
                                                    </div>
                                                )
                                            }
                                            {
                                                caseData?.case_info.actions_taken.includes("broadcast_log_msg") && (
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Switch
                                                            id="broadcast_log_msg"
                                                            checked={caseData?.case_info.actions_taken.includes("broadcast_log_msg")}
                                                            disabled
                                                        />
                                                        <Label htmlFor="send_dm_case_outcome">Broadcast case details to case log channel</Label>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <Tabs defaultValue="timeline" className="w-full dark">
                                <TabsList className="w-full">
                                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                </TabsList>
                                <TabsContent value="timeline" className="flex flex-col items-start gap-2">
                                    <Card className="dark w-full bg-black p-1">
                                        <CardContent className="p-1">
                                            <form
                                                action={`/api/cases/newCaseComment?caseId=${caseData?.caseID}&userId=${discordData?.globalName}&avatarUrl=${discordData?.avatar}`}
                                                method="POST"
                                                id="case_comments_form"
                                            >
                                                <label htmlFor="comment" className="sr-only">
                                                    Write a comment...
                                                </label>
                                                <div className="flex items-center">
                                                    <Input
                                                        id="comment"
                                                        name="comment"
                                                        className="mr-4 block w-full rounded-lg bg-black text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                        placeholder="Write a comment..."
                                                    ></Input>
                                                    <Button
                                                        type="submit"
                                                        variant="outline"
                                                        size="icon"
                                                        className="bg-black text-white"
                                                    >
                                                        <Send size={16} />
                                                    </Button>
                                                </div>
                                            </form>
                                        </CardContent>
                                    </Card>
                                    <Card className="dark w-full bg-black p-0">
                                        <CardContent className="p-0">
                                            <CardDescription className="font-semibold uppercase p-2">Timeline</CardDescription>
                                            <Separator />
                                            <br />
                                            <div className="p-2">
                                                {caseData?.case_info.case_comments && (
                                                    <div className="rounded-lg flex flex-col items-start -mt-6">
                                                        {caseData?.case_info.case_comments.sort((a: any, b: any) => new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime()).map(
                                                            (comment: any) => (
                                                                <React.Fragment key={comment.comment}>
                                                                    {
                                                                        comment.commentType === "system" ? (
                                                                            <>
                                                                                <div key={comment.comment} className="flex flex-col items-start justify-start gap-2 border-b-1 border-zinc-800 w-full p-2">
                                                                                    <div className="flex flex-row items-center justify-between w-full gap-1">
                                                                                        <div className="flex flex-row items-center justify-start gap-1">
                                                                                            <Bot size={14} />
                                                                                            <span className="text-xs text-zinc-500">Auto-post created by: <b>{comment.userId}</b></span>
                                                                                        </div>
                                                                                        <span className="text-xs text-zinc-500">{moment(comment.commentDate).format("DD MMM YYYY, hh:mm a")}</span>
                                                                                    </div>
                                                                                    <span className="text-sm text-white">{comment.comment}</span>
                                                                                    <span className="w-full">
                                                                                        {comment.comment.includes(
                                                                                            "Auto Close"
                                                                                        ) && (
                                                                                                <>
                                                                                                    <span className="w-full text-sm font-normal flex flex-row gap-2 p-2 rounded-lg border-1 border-zinc-800">
                                                                                                        <span className="grow capitalize">
                                                                                                            Case auto-closed
                                                                                                        </span>
                                                                                                        <Switch disabled checked={true} />
                                                                                                    </span>
                                                                                                </>
                                                                                            )}
                                                                                        {comment.comment.includes("Ban") && (
                                                                                            <>
                                                                                                <span className="w-full text-sm font-normal flex flex-row gap-2 p-2 rounded-lg border-1 border-zinc-800">
                                                                                                    <span className="grow capitalize">
                                                                                                        User banned
                                                                                                    </span>
                                                                                                    <Switch disabled checked={true} />
                                                                                                </span>
                                                                                            </>
                                                                                        )}
                                                                                        {comment.comment.includes("Kick") && (
                                                                                            <>
                                                                                                <span className="w-full text-sm font-normal flex flex-row gap-2 p-2 rounded-lg border-1 border-zinc-800">
                                                                                                    <span className="grow capitalize">
                                                                                                        User kicked
                                                                                                    </span>
                                                                                                    <Switch disabled checked={true} />
                                                                                                </span>
                                                                                            </>
                                                                                        )}
                                                                                        {comment.comment.includes("Warn") && (
                                                                                            <>
                                                                                                <span className="w-full text-sm font-normal flex flex-row gap-2 p-2 rounded-lg border-1 border-zinc-800">
                                                                                                    <span className="grow">
                                                                                                        User warned
                                                                                                    </span>
                                                                                                    <Switch disabled checked={true} />
                                                                                                </span>
                                                                                            </>
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <Card key={comment.comment} className="w-full bg-black">
                                                                                <CardContent>
                                                                                    <div className="flex flex-row items-center gap-2">
                                                                                        <Image
                                                                                            src={`https://cdn.discordapp.com/avatars/${comment.userId}/${comment.avatar}`}
                                                                                            alt={comment.userId}
                                                                                            width={30}
                                                                                            height={30}
                                                                                            className="rounded-full"
                                                                                        />
                                                                                        <span className="text-sm font-semibold text-white capitalize">
                                                                                            {comment.userId}
                                                                                        </span>
                                                                                        <span className="flex-grow">&nbsp;</span>
                                                                                        <span className="text-sm font-normal text-gray-600">
                                                                                            {moment(comment.commentDate).format(
                                                                                                "DD MMM YYYY, hh:mm a"
                                                                                            )}
                                                                                        </span>
                                                                                    </div>
                                                                                    <p className="py-2.5 text-sm font-normal text-gray-300">
                                                                                        {comment.comment}
                                                                                    </p>

                                                                                    <div className="mt-2 flex flex-row justify-end gap-2">
                                                                                        <Button variant="outline" size="icon">
                                                                                            <Pencil size={16} />
                                                                                        </Button>
                                                                                        <Button variant="outline" size="icon">
                                                                                            <Trash size={16} />
                                                                                        </Button>
                                                                                    </div>
                                                                                </CardContent>
                                                                            </Card>
                                                                        )
                                                                    }
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                                {!caseData?.case_info.case_comments && (
                                                    <div className="rounded-lg p-4">
                                                        <span className="text-md text-center font-normal text-zinc-500">
                                                            No comments found.
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="details">
                                    <Card className="dark w-full bg-black p-2">
                                        <CardContent className="p-2">
                                            <div className="flex flex-row gap-10 w-full">
                                                <div className="w-[50%]">
                                                    <Label htmlFor="email">Case User</Label>
                                                    <br />
                                                    <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                        <Image
                                                            src={caseMemberData?.discordUser.avatarURL}
                                                            alt={caseMemberData?.discordUser.username}
                                                            width={25}
                                                            height={25}
                                                            className="rounded-full"
                                                        />
                                                        <span className="grow capitalize">
                                                            {caseMemberData?.discordUser.globalName ||
                                                                caseMemberData?.discordUser.username}
                                                        </span>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <a className="text-blue-500 hover:underline">
                                                                    View
                                                                </a>
                                                            </DialogTrigger>
                                                            <DialogContent className="dark text-white p-0 bg-black min-w-[1000px]">
                                                                <DialogTitle className="pt-3 px-2 text-md flex flex-row items-center justify-start gap-2"><UserPen size={18} /> Member Information</DialogTitle>
                                                                <ViewMemberDialog serverId={serverId} userId={caseMemberData?.discordUser.id} />
                                                            </DialogContent>
                                                        </Dialog>
                                                    </span>
                                                    <Separator />
                                                </div>
                                                <div className="w-[50%]">
                                                    <Label htmlFor="email">Case Owner</Label>
                                                    <br />
                                                    <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                        <Image
                                                            src={memberData?.discordUser.avatarURL}
                                                            alt={memberData?.discordUser.username}
                                                            width={25}
                                                            height={25}
                                                            className="rounded-full"
                                                        />
                                                        <span className="grow">
                                                            {memberData?.discordUser.globalName ||
                                                                memberData?.discordUser.username}
                                                        </span>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <a className="text-blue-500 hover:underline">
                                                                    View
                                                                </a>
                                                            </DialogTrigger>
                                                            <DialogContent className="dark text-white p-0 bg-black min-w-[1000px]">
                                                                <DialogTitle className="pt-3 px-2 text-md flex flex-row items-center justify-start gap-2"><UserPen size={18} /> Member Information</DialogTitle>
                                                                <ViewMemberDialog serverId={serverId} userId={memberData?.discordUser.id} />
                                                            </DialogContent>
                                                        </Dialog>
                                                    </span>
                                                    <Separator />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="flex flex-row gap-10 w-full">
                                                <div className="w-[50%]">
                                                    <Label htmlFor="email">Case ID</Label>
                                                    <br />
                                                    <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                        <Input readOnly className="h-auto grow capitalize" value={caseData?.caseID} />
                                                    </span>
                                                    <Separator />
                                                </div>
                                                <div className="w-[50%]">
                                                    <Label htmlFor="email">Case Type</Label>
                                                    <br />
                                                    <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                        <Input disabled className="h-auto grow capitalize" value={`${caseData?.case_info.case_type} User`} />
                                                        <a
                                                            href={`/:d:/app/server/${serverId}/cases/${caseData?.caseID}/edit`}
                                                            className="text-blue-500 hover:underline"
                                                        >
                                                            <i className="bx bx-pencil"></i>
                                                        </a>
                                                    </span>
                                                    <Separator />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="flex flex-row gap-10 w-full">
                                                <div className="w-[50%]">
                                                    <Label htmlFor="email">Case Duration</Label>
                                                    <br />
                                                    <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                        <Input className="h-auto" disabled value={caseData?.case_info.case_duration == 7
                                                            ? "1 week"
                                                            : caseData?.case_info.case_duration == 14
                                                                ? "2 weeks"
                                                                : caseData?.case_info.case_duration == 0
                                                                    ? "No duration"
                                                                    : "Never expires"}
                                                        />
                                                        <a
                                                            href={`/:d:/app/server/${serverId}/cases/${caseData?.caseID}/edit`}
                                                            className="text-blue-500 hover:underline"
                                                        >
                                                            <i className="bx bx-pencil"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                                <div className="w-[50%]">
                                                    <Label htmlFor="email">Case Description</Label>
                                                    <br />
                                                    <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                        <Input disabled className="grow h-auto" value={caseData?.case_info.case_reason} />
                                                        <a
                                                            href={`/:d:/app/server/${serverId}/cases/${caseData?.caseID}/edit`}
                                                            className="text-blue-500 hover:underline"
                                                        >
                                                            <i className="bx bx-pencil"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <Separator />
                                                <br />
                                                <Label htmlFor="actionsTaken">Case Actions</Label>
                                                <div className="flex flex-row gap-4 p-2">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <Switch
                                                                disabled
                                                                checked={
                                                                    caseData?.case_info.actions_taken.includes(
                                                                        "ban_user"
                                                                    )
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            <span>Ban user</span>
                                                        </div>
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <Switch
                                                                disabled
                                                                checked={
                                                                    caseData?.case_info.actions_taken.includes(
                                                                        "kick_user"
                                                                    )
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                NA
                                                            </Switch>
                                                            <span>Kick user</span>
                                                        </div>
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <Switch
                                                                disabled
                                                                checked={
                                                                    caseData?.case_info.actions_taken.includes(
                                                                        "unban_user"
                                                                    )
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                NA
                                                            </Switch>
                                                            <span>Unban user</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <Switch
                                                                disabled
                                                                checked={
                                                                    caseData?.case_info.actions_taken.includes(
                                                                        "timeout_user"
                                                                    )
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                NA
                                                            </Switch>
                                                            <span>Timeout user</span>
                                                        </div>
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <Switch
                                                                disabled
                                                                checked={
                                                                    caseData?.case_info.actions_taken.includes(
                                                                        "purge_usr_msg"
                                                                    )
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                NA
                                                            </Switch>
                                                            <span>Delete all messages sent by user</span>
                                                        </div>
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <Switch
                                                                disabled
                                                                checked={
                                                                    caseData?.case_info.actions_taken.includes(
                                                                        "auto_close"
                                                                    )
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                NA
                                                            </Switch>
                                                            <span>Auto-complete case after creation</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <Switch
                                                                disabled
                                                                checked={
                                                                    caseData?.case_info.actions_taken.includes(
                                                                        "reassign_after_create"
                                                                    )
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                NA
                                                            </Switch>
                                                            <span>Reassign case after creation</span>
                                                        </div>
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <Switch
                                                                disabled
                                                                checked={
                                                                    caseData?.case_info.actions_taken.includes(
                                                                        "send_dm_case_outcome"
                                                                    )
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                NA
                                                            </Switch>
                                                            <span>
                                                                Send DM to user advising of case outcome
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <Switch
                                                                disabled
                                                                checked={
                                                                    caseData?.case_info.actions_taken.includes(
                                                                        "broadcast_log_msg"
                                                                    )
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                NA
                                                            </Switch>
                                                            <span>
                                                                Broadcast case details to case log channel
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Separator />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <Toaster className="dark" />
            </div>
        </div>
    );
}