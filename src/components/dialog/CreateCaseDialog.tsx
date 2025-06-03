"use client"
import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import DatePicker from "../DatePicker"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { FormEvent, useEffect, useState } from "react"
import { createCase } from "@/app/actions/cases/createCase"
import { toast } from "sonner"
import { getCurrentGuildMembers } from "@/app/actions/getCurrentGuildMembers"
import { getCurrentGuildRelationships } from "@/app/actions/getCurrentGuildRelationships"
import { Avatar, AvatarImage } from "../ui/avatar"
import { useRouter } from "next/navigation"

export const CreateCaseDialog = ({ currentServerData }: any) => {
    const router = useRouter();
    const [actionsTaken, setActionsTaken] = useState<string[]>(["default"]);
    const [open, setOpen] = useState<boolean>(false);
    const [guildMembers, setGuildMembers] = useState<Array<any>>([]);
    const [guildRelationships, setGuildRelationships] = useState<any>({});
    const [caseTimestamp, setCaseTimestamp] = useState("");

    useEffect(() => {
        const getData = async () => {
            const getGuildMembers = await getCurrentGuildMembers(currentServerData?.data?.dsData?.id);
            setGuildMembers(getGuildMembers);
            const getGuildRelationships = await getCurrentGuildRelationships(currentServerData?.data?.dsData?.id);
            setGuildRelationships(getGuildRelationships);
        }
        getData();
    }, [currentServerData])

    const handleToggle = (action: string, enabled: boolean) => {
        setActionsTaken((prev) =>
            enabled
                ? [...prev, action]
                : prev.filter((item) => item !== action)
        );
    };

    const createCaseFrm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const response = await createCase({
            guildId: currentServerData?.data.dsData.id,
            assigneeId: form.get("assigneeId"),
            userId: form.get("userId"),
            case_type: form.get("caseType"),
            case_reason: form.get("caseReason"),
            case_duration: new Date(`${form.get("caseExpires")}`),
            actions_taken: actionsTaken,
        })

        if (response === 200) {
            toast.success(`Case has been created successfully.`);
            setOpen(false);
            router.refresh();
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(!open)} variant="outline" size="icon">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[60%]">
                <DialogTitle>Create a Case</DialogTitle>
                <form onSubmit={createCaseFrm}>
                    <div className="flex flex-row gap-10 w-full">
                        <div className="w-[50%]">
                            <Label htmlFor="email">Who is the case for?</Label>
                            <br />
                            <span className="text-sm w-full font-normal flex flex-row gap-2 py-2">
                                <Select name="userId">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a user..." />
                                    </SelectTrigger>
                                    <SelectContent>
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
                            <Label htmlFor="email">Who is the case assigned to?</Label>
                            <br />
                            <span className="text-sm w-full font-normal flex flex-row gap-2 py-2">
                                <Select name="assigneeId">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a MYMOD user..." />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                <Select name="caseType">
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
                                <DatePicker
                                    onChange={(value: any) => setCaseTimestamp(value)}
                                />
                                <input readOnly hidden name="caseExpires" value={caseTimestamp} />
                            </span>
                            <br />
                            <Label htmlFor="email" className="text-xs text-zinc-500">If a date is not selected, the case will be set to never expire.</Label>
                        </div>
                    </div>
                    <br />
                    <div className="flex flex-row gap-10 w-full">
                        <div className="w-[100%]">
                            <Label htmlFor="email">Case Description</Label>
                            <br />
                            <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                <Textarea name="caseReason" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <Separator />
                        <br />
                        <Label htmlFor="actionsTaken">Case Actions</Label>
                        <div className="flex flex-row gap-4 p-2 w-full items-start">
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <Label>Ban user</Label>
                                    <Switch
                                        onCheckedChange={(e) => handleToggle("ban_user", e)}
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <Label>Kick user</Label>
                                    <Switch
                                        onCheckedChange={(e) => handleToggle("kick_user", e)}
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <Label>Timeout user</Label>
                                    <Switch
                                        onCheckedChange={(e) => handleToggle("timeout_user", e)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <Label>Delete all messages sent by user</Label>
                                    <Switch
                                        onCheckedChange={(e) => handleToggle("purge_usr_msg", e)}
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <Label>Auto-complete case after creation</Label>
                                    <Switch
                                        onCheckedChange={(e) => handleToggle("auto_close", e)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <Label>Send DM to user advising of case outcome</Label>
                                    <Switch
                                        onCheckedChange={(e) =>
                                            handleToggle("send_dm_case_outcome", e)
                                        }
                                    />
                                </div>
                                <div className="flex flex-row items-center justify-between gap-2">
                                    <Label>Broadcast case details to case log channel</Label>
                                    <Switch
                                        onCheckedChange={(e) => handleToggle("broadcast_log_msg", e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <br />
                        <div className="flex flex-row items-center justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="ghost">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button variant="outline" type="submit">
                                Create case
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}