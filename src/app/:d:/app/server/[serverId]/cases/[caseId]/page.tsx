import { completeCase } from "@/app/actions/cases/completeCase";
import { getCaseData } from "@/app/actions/cases/getCaseData";
import { getCurrentGuildRelationships } from "@/app/actions/getCurrentGuildRelationships";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getGuildMember } from "@/app/actions/getGuildMember";
import { CompleteCaseDialog } from "@/components/dialog/CompleteCaseDialog";
import { ReassignCaseDialog } from "@/components/dialog/ReassignCaseDialog";
import { RollbackCaseDialog } from "@/components/dialog/RollbackCaseDialog";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ViewMemberDialog } from "@/components/dialog/ViewMemberDialog";
import { ProgressIndicator } from "@radix-ui/react-progress";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Bot, Check, ChevronsRight, Pencil, RefreshCcw, RefreshCw, Rewind, Send, Slash, Trash, UserPen, UserSearch } from "lucide-react";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { Geist } from "next/font/google";
import Image from "next/image";
import React from "react";
import { EditCaseDialog } from "@/components/dialog/EditCaseDialog";
import { DeleteCaseDialog } from "@/components/dialog/DeleteCaseDialog";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default async function CasePage({
    params,
}: Readonly<{
    params: Promise<{ serverId: string; caseId: string }>
}>) {
    const { serverId, caseId } = await params;

    const discordData = await getDiscordUser();
    const caseData = await getCaseData(caseId);
    const guildRelationshipData = await getCurrentGuildRelationships(serverId);
    const memberData = await getGuildMember(serverId, caseData?.assignee_info.id);
    const caseMemberData = await getGuildMember(serverId, caseData?.user_info.id);

    return (
        <div className="bg-black w-full h-full" suppressHydrationWarning>
            <div className="bkg-gradient w-full h-screen z-0"></div>
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
    );
}

/*
<ResizablePanelGroup direction="vertical" className="w-full h-screen">
                <ResizablePanel defaultSize={7}>
                    <div className="flex flex-col items-center justify-center h-fit p-4">
                        <div className="flex flex-row w-full items-center justify-center gap-2">
                            <div className="grow">
                                <h1 className="text-2xl font-bold capitalize text-white">
                                    Case: <span>{caseData?.case_info.case_type} User</span>
                                </h1>
                            </div>
                            <div className="grow w-[70%]">
                                <ol className="flex w-full items-center justify-center space-x-2 text-center text-sm font-medium text-gray-300 shadow-sm  p-2 rtl:space-x-reverse">
                                    {caseData?.case_info.case_status === "created" ? (
                                        <li className="flex items-center text-blue-400">
                                            <span className="me-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-600 text-xs">
                                                1
                                            </span>
                                            Created{" "}
                                            <svg
                                                className="ms-2 h-3 w-3 sm:ms-4 rtl:rotate-180"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 12 10"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                                />
                                            </svg>
                                        </li>
                                    ) : (
                                        <li className="flex items-center">
                                            <span className="me-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-600 text-xs">
                                                1
                                            </span>
                                            Created{" "}
                                            <svg
                                                className="ms-2 h-3 w-3 sm:ms-4 rtl:rotate-180"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 12 10"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                                />
                                            </svg>
                                        </li>
                                    )}
                                    {caseData?.case_info.case_status === "pending" ? (
                                        <li className="flex items-center text-blue-400">
                                            <span className="me-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-400 text-xs">
                                                2
                                            </span>
                                            Pending{" "}
                                            <svg
                                                className="ms-2 h-3 w-3 sm:ms-4 rtl:rotate-180"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 12 10"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                                />
                                            </svg>
                                        </li>
                                    ) : (
                                        <li className="flex items-center">
                                            <span className="me-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-500 text-xs">
                                                2
                                            </span>
                                            Pending{" "}
                                            <svg
                                                className="ms-2 h-3 w-3 sm:ms-4 rtl:rotate-180"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 12 10"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                                />
                                            </svg>
                                        </li>
                                    )}
                                    {caseData?.case_info.case_status === "complete" ? (
                                        <li className="flex items-center text-blue-400">
                                            <span className="me-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-400 text-xs">
                                                3
                                            </span>
                                            Complete
                                        </li>
                                    ) : (
                                        <li className="flex items-center">
                                            <span className="me-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-500 text-xs">
                                                3
                                            </span>
                                            Complete
                                        </li>
                                    )}
                                </ol>
                            </div>
                            <div>
                                <div
                                    className="mr-2 inline-flex align-middle gap-1"
                                    role="group"
                                >
                                    {caseData?.case_info.case_status === "complete" ? (
                                        <Button
                                            disabled={true}
                                            variant="secondary"
                                            size="icon"
                                        >
                                            <i className="bx bx-xs bx-check"></i>
                                        </Button>
                                    ) : (
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button
                                                    disabled={false}
                                                    variant="secondary"
                                                    size="icon"
                                                >
                                                    <i className="bx bx-xs bx-check"></i>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Are you absolutely sure you want to mark this case as complete?
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        This action can be undone. All actions will be performed against <span className="capitalize">{caseData?.user_info.username}</span>. You will be able to make any comments after this case is marked complete.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button variant="default">
                                                        <a
                                                            href={`/api/cases/completeCase?caseId=${caseData?.caseID}&serverId=${serverId}`}
                                                        >
                                                            Yes, I&apos;m sure
                                                        </a>
                                                    </Button>
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="secondary">
                                                            Close
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                    >
                                        <i className="bx bx-xs bx-refresh"></i>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="flex flex-col items-center justify-center"
                                    >
                                        <Link
                                            href={`/app/servers/${serverId}/cases/${caseId}/edit`}
                                        >
                                            <i className="bx bx-xs bx-pencil"></i>
                                        </Link>
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button variant="secondary" size="icon">
                                                <i className="bx bx-xs bx-trash"></i>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Are you absolutely sure you want to delete this
                                                    case?
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently
                                                    delete the case from MYMOD, regardless if the
                                                    actions have been performed or not.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="default">
                                                    <a
                                                        href={`#`}
                                                    >
                                                        Yes, I&apos;m sure
                                                    </a>
                                                </Button>
                                                <DialogClose asChild>
                                                    <Button type="button" variant="secondary">
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={80}>
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="w-full h-screen"
                    >
                        <ResizablePanel defaultSize={15}>
                            <div className="p-6 flex flex-col items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <Image
                                        src={`https://cdn.discordapp.com/avatars/${memberData?.discordUser.id}/${memberData?.discordUser.avatar}.png`}
                                        alt={caseData?.assignee_info.username}
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-white">
                                            {caseData?.assignee_info.globalName}
                                        </span>
                                        <span className="text-xs font-normal text-gray-600">
                                            is assigned to this case
                                        </span>
                                    </div>
                                </div>
                                <br />
                                <Dialog>
                                    <DialogTrigger>
                                        <Button variant="default">Reassign case</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <form
                                            action={`/api/cases/reassignCase?caseId=${caseData?.caseID}`}
                                            method="POST"
                                        >
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Reassign Case:{" "}
                                                    <span className="capitalize">
                                                        {caseData?.case_info.case_type}{" "}
                                                        {caseData?.user_info.username}
                                                    </span>
                                                </DialogTitle>
                                                <DialogDescription>
                                                    <span>
                                                        This will reassign the case to another MYMOD user
                                                        within your server. Select a user from the list
                                                        below:
                                                    </span>
                                                    <br />
                                                    <br />
                                                    <Select name="assigneeId">
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select a MYMOD user" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {guildRelationshipData &&
                                                                guildRelationshipData?.relData.map(
                                                                    (relationship: any) => (
                                                                        <SelectItem
                                                                            value={relationship.userId}
                                                                            key={relationship.userId}
                                                                        >
                                                                            {relationship.memberName}
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                        </SelectContent>
                                                    </Select>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="default" type="submit">
                                                    Reassign
                                                </Button>
                                                <DialogClose asChild>
                                                    <Button type="button" variant="secondary">
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel>
                            <div className="p-4 h-[100%] overflow-y-scroll">
                                <Card>
                                    <CardContent className="p-4">
                                        <Tabs defaultValue="timeline">
                                            <TabsList>
                                                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                                <TabsTrigger value="details">Details</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="timeline">
                                                <form
                                                    action={`/api/cases/newCaseComment?caseId=${caseData?.caseID}&userId=${discordData?.id}&avatarUrl=${discordData?.avatar}`}
                                                    method="POST"
                                                    id="case_comments_form"
                                                >
                                                    <label htmlFor="comment" className="sr-only">
                                                        Write a comment...
                                                    </label>
                                                    <div className="flex items-center rounded-lg bg-gray-900 px-3 py-2">
                                                        <textarea
                                                            id="comment"
                                                            name="comment"
                                                            rows={1}
                                                            className="mx-4 block w-full rounded-lg bg-gray-800 p-2.5 text-sm text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                            placeholder="Write a comment..."
                                                        ></textarea>
                                                        <button
                                                            type="submit"
                                                            className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600"
                                                        >
                                                            <svg
                                                                className="h-5 w-5 rotate-90 rtl:-rotate-90"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 18 20"
                                                            >
                                                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                                            </svg>
                                                            <span className="sr-only">Send message</span>
                                                        </button>
                                                    </div>
                                                </form>
                                                <br />
                                                {caseData?.case_info.case_comments && (
                                                    <div className="rounded-lg flex flex-col items-center">
                                                        {caseData?.case_info.case_comments.map(
                                                            (comment: any) => (
                                                                <>
                                                                    <div className="flex items-start gap-2.5 m-2 bg-gray-900 rounded-md w-[50%]">
                                                                        <div className="leading-1.5 flex w-full max-w-[700px] flex-col rounded-e-xl rounded-es-xl border-gray-200 p-4">
                                                                            <div className="flex flex-row items-center w-full space-x-2 rtl:space-x-reverse">
                                                                                {comment.commentType === "system" && (
                                                                                    <i className="bx bx-sm bxs-bot"></i>
                                                                                )}
                                                                                {comment.commentType !== "system" && (
                                                                                    <Image
                                                                                        src={`https://cdn.discordapp.com/avatars/${comment.userId}/${comment.avatar}`}
                                                                                        alt={comment.userId}
                                                                                        width={30}
                                                                                        height={30}
                                                                                        className="rounded-full"
                                                                                    />
                                                                                )}
                                                                                <span className="text-sm font-semibold text-white capitalize">
                                                                                    {comment.userId}
                                                                                </span>
                                                                                {comment.commentType === "system" && (
                                                                                    <Badge variant="default">
                                                                                        SYSTEM
                                                                                    </Badge>
                                                                                )}
                                                                                <span className="text-sm font-normal text-gray-600 grow">
                                                                                    {moment(comment.commentDate).format(
                                                                                        "hh:mm a"
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                            <p className="py-2.5 text-sm font-normal text-gray-300">
                                                                                {comment.comment}
                                                                            </p>
                                                                            {comment.comment.includes(
                                                                                "Auto Close"
                                                                            ) && (
                                                                                    <Card>
                                                                                        <CardContent className="p-4">
                                                                                            <div className="flex flex-col gap-2 items-start">
                                                                                                <div className="w-full">
                                                                                                    <Label htmlFor="email">
                                                                                                        Case Status
                                                                                                    </Label>
                                                                                                    <br />
                                                                                                    <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                                                                        <span className="grow capitalize">
                                                                                                            {
                                                                                                                caseData?.case_info
                                                                                                                    .case_status
                                                                                                            }
                                                                                                        </span>
                                                                                                    </span>
                                                                                                    <Separator />
                                                                                                </div>
                                                                                            </div>
                                                                                        </CardContent>
                                                                                    </Card>
                                                                                )}
                                                                            {comment.comment.includes("Ban") && (
                                                                                <Card>
                                                                                    <CardContent className="p-4">
                                                                                        <div className="flex flex-col gap-2 items-start">
                                                                                            <div className="w-full">
                                                                                                <Label htmlFor="email">
                                                                                                    User banned
                                                                                                </Label>
                                                                                                <br />
                                                                                                <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                                                                    <span className="grow capitalize">
                                                                                                        Yes
                                                                                                    </span>
                                                                                                    <Switch checked={true} />
                                                                                                </span>
                                                                                                <Separator />
                                                                                            </div>
                                                                                        </div>
                                                                                    </CardContent>
                                                                                </Card>
                                                                            )}
                                                                            <div className="mt-2 flex flex-row justify-end">
                                                                                <Button variant="outline" size="icon">
                                                                                    <i className="bx bx-pencil"></i>
                                                                                </Button>
                                                                                <Button variant="outline" size="icon">
                                                                                    <i className="bx bx-trash"></i>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                                {!caseData?.case_info.case_comments && (
                                                    <div className="rounded-lg p-4">
                                                        <span className="text-md text-center font-normal text-gray-500">
                                                            No comments found.
                                                        </span>
                                                    </div>
                                                )}
                                            </TabsContent>
                                            <TabsContent value="details">
                                                <div className="flex flex-row gap-10 w-full">
                                                    <div className="w-[50%]">
                                                        <Label htmlFor="email">Assigned to User</Label>
                                                        <br />
                                                        <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                            <Image
                                                                src={caseData?.assignee_info.avatarURL}
                                                                alt={caseData?.user_info.username}
                                                                width={25}
                                                                height={25}
                                                                className="rounded-full"
                                                            />
                                                            <span className="grow capitalize">
                                                                {caseData?.user_info.username}
                                                            </span>
                                                            <a
                                                                onClick={() =>
                                                                    window.open(
                                                                        `/:d:/app/server/${serverId}/members`,
                                                                        "_blank",
                                                                        "width=800,height=600"
                                                                    )
                                                                }
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                View
                                                            </a>
                                                        </span>
                                                        <Separator />
                                                    </div>
                                                    <div className="w-[50%]">
                                                        <Label htmlFor="email">Owner Username</Label>
                                                        <br />
                                                        <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                            <Image
                                                                src={caseData?.assignee_info.avatarURL}
                                                                alt={caseData?.assignee_info.username}
                                                                width={25}
                                                                height={25}
                                                                className="rounded-full"
                                                            />
                                                            <span className="grow capitalize">
                                                                {caseData?.assignee_info.username}
                                                            </span>
                                                            <a
                                                                href={`/:d:/app/server/${serverId}/members`}
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                View
                                                            </a>
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
                                                            <span className="grow capitalize">
                                                                {caseData?.caseID}
                                                            </span>
                                                        </span>
                                                        <Separator />
                                                    </div>
                                                    <div className="w-[50%]">
                                                        <Label htmlFor="email">Case Type</Label>
                                                        <br />
                                                        <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                            <span className="grow capitalize">
                                                                {caseData?.case_info.case_type} User
                                                            </span>
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
                                                            <span className="grow capitalize">
                                                                {caseData?.case_info.case_duration == 7
                                                                    ? "1 week"
                                                                    : caseData?.case_info.case_duration == 14
                                                                        ? "2 weeks"
                                                                        : caseData?.case_info.case_duration == 0
                                                                            ? "No duration"
                                                                            : ""}
                                                            </span>
                                                            <a
                                                                href={`/:d:/app/server/${serverId}/cases/${caseData?.caseID}/edit`}
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                <i className="bx bx-pencil"></i>
                                                            </a>
                                                        </span>
                                                        <Separator />
                                                    </div>
                                                    <div className="w-[50%]">
                                                        <Label htmlFor="email">Case Description</Label>
                                                        <br />
                                                        <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                                            <Textarea disabled className="grow">
                                                                {caseData?.case_info.case_reason}
                                                            </Textarea>
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
                                                <div>
                                                    <Label htmlFor="actionsTaken">Case Actions</Label>
                                                    <div className="flex flex-row gap-4 p-2">
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex flex-row gap-1 items-center">
                                                                <Checkbox
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
                                                                <Checkbox
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
                                                                </Checkbox>
                                                                <span>Kick user</span>
                                                            </div>
                                                            <div className="flex flex-row gap-1 items-center">
                                                                <Checkbox
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
                                                                </Checkbox>
                                                                <span>Unban user</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex flex-row gap-1 items-center">
                                                                <Checkbox
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
                                                                </Checkbox>
                                                                <span>Timeout user</span>
                                                            </div>
                                                            <div className="flex flex-row gap-1 items-center">
                                                                <Checkbox
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
                                                                </Checkbox>
                                                                <span>Delete all messages sent by user</span>
                                                            </div>
                                                            <div className="flex flex-row gap-1 items-center">
                                                                <Checkbox
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
                                                                </Checkbox>
                                                                <span>Auto-complete case after creation</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex flex-row gap-1 items-center">
                                                                <Checkbox
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
                                                                </Checkbox>
                                                                <span>Reassign case after creation</span>
                                                            </div>
                                                            <div className="flex flex-row gap-1 items-center">
                                                                <Checkbox
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
                                                                </Checkbox>
                                                                <span>
                                                                    Send DM to use advising of case outcome
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-row gap-1 items-center">
                                                                <Checkbox
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
                                                                </Checkbox>
                                                                <span>
                                                                    Broadcast case details to case log channel
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Separator />
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={20}>
                            <div className="flex flex-col items-center p-6">
                                <span className="text-sm font-bold uppercase text-gray-400">
                                    Actions for this case
                                </span>
                                <br />
                                <br />
                                <ol className="relative">
                                    {caseData?.case_info.actions_taken.map((action: any) => (
                                        <li
                                            key={""}
                                            className={
                                                action === "default"
                                                    ? "mb-10 ms-4 hidden"
                                                    : "mb-10 ms-4"
                                            }
                                        >
                                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-blue-400"></div>
                                            <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                                                {action}
                                            </time>
                                            <h3 className="text-lg font-semibold text-white">
                                                {action === "purge_usr_msg"
                                                    ? "Purge user messages"
                                                    : ""}
                                                {action === "kick_user" ? "Kick user" : ""}
                                                {action === "ban_user" ? "Ban user" : ""}
                                                {action === "unban_user" ? "Unban user" : ""}
                                                {action === "timeout_user" ? "Timeout user" : ""}
                                                {action === "auto_close"
                                                    ? "Auto-complete case after creation"
                                                    : ""}
                                                {action === "reassign_after_create"
                                                    ? "Reassign case after creation"
                                                    : ""}
                                            </h3>
                                            <p className="text-base font-normal text-gray-500">
                                                {action === "kick_user" ? (
                                                    <span>Kicks the user from your server.</span>
                                                ) : (
                                                    ""
                                                )}
                                                {action === "ban_user" ? (
                                                    <span>Bans the user from your server.</span>
                                                ) : (
                                                    ""
                                                )}
                                                {action === "unban_user" ? (
                                                    <span>Unbans the user from your server.</span>
                                                ) : (
                                                    ""
                                                )}
                                                {action === "timeout_user" ? (
                                                    <span>Timeout the user from your server.</span>
                                                ) : (
                                                    ""
                                                )}
                                                {action === "purge_usr_msg" ? (
                                                    <span>
                                                        Purges all messages sent by this user from your
                                                        server.
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                                {action === "reassign_after_create" ? (
                                                    <span>
                                                        Reassigns the case to another staff member after
                                                        creation.
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                                {action === "auto_close" ? (
                                                    <span>
                                                        Automatically marks the case as complete after
                                                        creation.
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
            */