"use client"
import { Pencil } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import DatePicker from "../DatePicker"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { useEffect, useState } from "react"
import { getCurrentGuildMembers } from "@/app/actions/getCurrentGuildMembers"
import { getCurrentGuildRelationships } from "@/app/actions/getCurrentGuildRelationships"
import { Avatar, AvatarImage } from "../ui/avatar"
import { editCase } from "@/app/actions/cases/editCase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const EditCaseDialog = ({ serverId, caseData }: any) => {
    const router = useRouter();
    const [guildMembers, setGuildMembers] = useState<Array<any>>([]);
    const [guildRelationships, setGuildRelationships] = useState<any>({});
    const [open, setOpen] = useState(false);

    // FORM VALUES
    const [userId, setUserId] = useState(caseData?.user_info?.id || "");
    const [assigneeId, setAssigneeId] = useState(caseData?.assignee_info?.id || "");
    const [caseType, setCaseType] = useState(caseData?.case_info.case_type || "");
    const [caseExpires, setCaseExpires] = useState(caseData?.case_info.case_duration || "");
    const [caseReason, setCaseReason] = useState(caseData?.case_info.case_reason || "");
    const [actionsTaken, setActionsTaken] = useState<string[]>(caseData?.case_info.actions_taken || []);

    useEffect(() => {
        const getData = async () => {
            const getGuildMembers = await getCurrentGuildMembers(serverId);
            setGuildMembers(getGuildMembers);
            const getGuildRelationships = await getCurrentGuildRelationships(serverId);
            setGuildRelationships(getGuildRelationships);
        }
        getData();
    }, [caseData])

    const handleToggle = (action: string, enabled: boolean) => {
        setActionsTaken((prev) =>
            enabled
                ? [...prev, action]
                : prev.filter((item) => item !== action)
        );
    };

    const editCaseFrm = async () => {
        const response = await editCase(caseData?.caseID, {
            guildId: serverId,
            assigneeId: assigneeId,
            userId: userId,
            case_type: caseType,
            case_reason: caseReason,
            case_duration: new Date(`${caseExpires}`),
            actions_taken: actionsTaken,
        })

        if (response === 200) {
            toast.success(`Case has been edited successfully.`);
            setOpen(false);
            router.refresh();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen} variant="ghost" size="icon" className="dark w-auto px-2 text-white">
                    <Pencil className="text-yellow-500" size={16} />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="dark text-white min-w-[60%]">
                <DialogTitle>Edit Case: </DialogTitle>
                <div className="flex flex-row gap-10 w-full">
                    <div className="w-[50%]">
                        <Label htmlFor="email">Case User</Label>
                        <br />
                        <span className="text-sm w-full font-normal flex flex-row gap-2 py-2">
                            <Select value={userId} onValueChange={(e) => setUserId(e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a user..." />
                                </SelectTrigger>
                                <SelectContent className="dark text-white">
                                    {
                                        guildMembers?.map((member: any) => (
                                            <SelectItem value={member.id} className="flex flex-row items-center gap-2">
                                                <Avatar className="w-6 h-6 rounded-full">
                                                    <AvatarImage
                                                        src={`${member.avatar || "https://cdn.discordapp.com/embed/avatars/5.png"}`}
                                                    />
                                                </Avatar>
                                                <span>{member.globalName || member.username}</span>
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </span>
                        <Separator />
                    </div>
                    <div className="w-[50%]">
                        <Label htmlFor="email">Case Owner</Label>
                        <br />
                        <span className="text-sm w-full font-normal flex flex-row gap-2 py-2">
                            <Select value={assigneeId} onValueChange={(e) => setAssigneeId(e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a MYMOD user..." />
                                </SelectTrigger>
                                <SelectContent className="dark text-white">
                                    {
                                        guildRelationships.relData?.map((member: any) => (
                                            <SelectItem value={member.userId} className="flex flex-row items-center gap-2">
                                                <Avatar className="w-6 h-6 rounded-full">
                                                    <AvatarImage
                                                        src={`${member.avatar || "https://cdn.discordapp.com/embed/avatars/5.png"}`}
                                                    />
                                                </Avatar>
                                                <span>{member.globalName || member.username} ({member.role})</span>
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </span>
                        <Separator />
                    </div>
                </div>
                <br />
                <div className="flex flex-row gap-10 w-full">
                    <div className="w-[50%]">
                        <Label htmlFor="email">Case Type</Label>
                        <br />
                        <span className="text-sm w-full font-normal flex flex-row gap-2 py-2">
                            <Select value={caseType} onValueChange={(e) => setCaseType(e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a case type..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ban">Ban User</SelectItem>
                                    <SelectItem value="kick">Kick User</SelectItem>
                                    <SelectItem value="timeout">Timeout User</SelectItem>
                                    <SelectItem value="warn">Warn User</SelectItem>
                                </SelectContent>
                            </Select>
                        </span>
                        <Separator />
                    </div>
                    <div className="w-[50%]">
                        <Label htmlFor="email">Case Duration</Label>
                        <br />
                        <span className="text-sm w-full font-normal flex flex-row gap-2 py-2">
                            <DatePicker value={caseExpires} onChange={(e) => setCaseExpires(e)} />
                        </span>
                    </div>
                </div>
                <br />
                <div className="flex flex-row gap-10 w-full">
                    <div className="w-[100%]">
                        <Label htmlFor="email">Case Description</Label>
                        <br />
                        <span className="text-sm font-normal flex flex-row gap-2 py-2">
                            <Textarea value={caseReason} onChange={(e) => setCaseReason(e.target.value)} />
                        </span>
                    </div>
                </div>
                <div>
                    <Separator />
                    <br />
                    <Label htmlFor="actionsTaken">Case Actions</Label>
                    <br />
                    <div className="grid grid-cols-2 gap-4 p-1 w-full items-start">
                        <div className="flex flex-row items-center justify-between gap-2">
                            <Label>Ban user</Label>
                            <Switch className="dark" onCheckedChange={(e) => handleToggle("ban_user", e)} checked={actionsTaken.includes("ban_user") ? true : false} />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <Label>Kick user</Label>
                            <Switch className="dark" onCheckedChange={(e) => handleToggle("kick_user", e)} checked={actionsTaken.includes("kick_user") ? true : false} />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <Label>Unban user</Label>
                            <Switch className="dark" onCheckedChange={(e) => handleToggle("unban_user", e)} checked={actionsTaken.includes("unban_user") ? true : false} />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <Label>Timeout user</Label>
                            <Switch className="dark" onCheckedChange={(e) => handleToggle("timeout_user", e)} checked={actionsTaken.includes("timeout_user") ? true : false} />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <Label>Delete all messages sent by user</Label>
                            <Switch className="dark" onCheckedChange={(e) => handleToggle("purge_usr_msg", e)} checked={actionsTaken.includes("purge_usr_msg") ? true : false} />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <Label>Auto-complete case after creation</Label>
                            <Switch className="dark" onCheckedChange={(e) => handleToggle("auto_close", e)} checked={actionsTaken.includes("auto_close") ? true : false} />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <Label>Send DM to user advising of case outcome</Label>
                            <Switch className="dark" onCheckedChange={(e) =>
                                handleToggle("send_dm_case_outcome", e)
                            } checked={actionsTaken.includes("send_dm_case_outcome") ? true : false} />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <Label>Broadcast case details to case log channel</Label>
                            <Switch className="dark" onCheckedChange={(e) => handleToggle("broadcast_log_msg", e)} checked={actionsTaken.includes("broadcast_log_msg") ? true : false} />
                        </div>
                    </div>
                    <br />
                    <Separator />
                    <br />
                    <div className="flex flex-row items-center justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="ghost" className="dark text-zinc-400">
                                Close
                            </Button>
                        </DialogClose>
                        <Button onClick={() => editCaseFrm()} variant="outline" type="submit" className="dark text-white">
                            Edit case
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}