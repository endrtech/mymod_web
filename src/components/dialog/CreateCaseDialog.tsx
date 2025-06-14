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
import { LiquidGlassDialog } from "../beta/liquid-glass-dialog"
import { InteractiveButton } from "../ui/interactive-button"
import { LiquidGlassSwitch } from "../beta/liquid-glass-switch"

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
        <>
            <InteractiveButton onClick={() => setOpen(!open)} variant="outline" className="w-fit p-2">
                <Plus />
            </InteractiveButton>
            <LiquidGlassDialog open={open} onOpenChange={setOpen} className="min-w-[60%]">
                <DialogTitle>Create a Case</DialogTitle>
                <form onSubmit={createCaseFrm}>
                    <div className="flex flex-row gap-10 w-full">
                        <div className="w-[50%]">
                            <Label htmlFor="email">Who is the case for?</Label>
                            <br />
                            <span className="text-sm w-full font-normal flex flex-row gap-2 py-2">
                                <Select name="userId">
                                    <SelectTrigger className="w-full bg-background/50 backdrop-blur-xl border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] rounded-full">
                                        <SelectValue placeholder="Select a user..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background/50 backdrop-blur-md border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] pointer-events-none rounded-3xl">
                                        {
                                            guildMembers?.map((member: any) => (
                                                <SelectItem value={member.id} className="flex flex-row items-center gap-2 cursor-pointer hover:bg-background/70 hover:underline rounded-full">
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
                                    <SelectTrigger className="w-full bg-background/50 backdrop-blur-xl border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] rounded-full">
                                        <SelectValue placeholder="Select a MYMOD user..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background/50 backdrop-blur-md border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] pointer-events-none rounded-3xl">
                                        {
                                            guildRelationships.relData?.map((member: any) => (
                                                <SelectItem value={member.userId} className="flex flex-row items-center gap-2 cursor-pointer hover:bg-background/70 hover:underline rounded-full">
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
                                    <SelectTrigger className="w-full bg-background/50 backdrop-blur-xl border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] rounded-full">
                                        <SelectValue placeholder="Select a case type..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background/50 backdrop-blur-md border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] pointer-events-none rounded-3xl">
                                        <SelectItem value="ban" className="flex flex-row items-center gap-2 cursor-pointer hover:bg-background/70 hover:underline rounded-full">Ban User</SelectItem>
                                        <SelectItem value="kick" className="flex flex-row items-center gap-2 cursor-pointer hover:bg-background/70 hover:underline rounded-full">Kick User</SelectItem>
                                        <SelectItem value="timeout" className="flex flex-row items-center gap-2 cursor-pointer hover:bg-background/70 hover:underline rounded-full">Timeout User</SelectItem>
                                        <SelectItem value="warn" className="flex flex-row items-center gap-2 cursor-pointer hover:bg-background/70 hover:underline rounded-full">Warn User</SelectItem>
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
                            <Separator />
                            <Label htmlFor="email" className="text-xs text-muted py-1">If a date is not selected, the case will be set to never expire.</Label>
                        </div>
                    </div>
                    <br />
                    <div className="flex flex-row gap-10 w-full">
                        <div className="w-[100%]">
                            <Label htmlFor="email">Case Description</Label>
                            <br />
                            <span className="text-sm font-normal flex flex-row gap-2 py-2">
                                <Textarea name="caseReason" className="bg-background/50 backdrop-blur-xl border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)]" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <Separator />
                        <br />
                        <Label htmlFor="actionsTaken">Case Actions</Label>
                        <div className="flex flex-row gap-4 py-2">
                            <div className="flex flex-col gap-2 p-4 w-full">
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

                            <div className="flex flex-col gap-2 p-4 rounded-lg w-full">
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

                            <div className="flex flex-col gap-2 rounded-lg w-full p-4">
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
                            <DialogClose className="text-sm cursor-pointer hover:underline">
                                Close
                            </DialogClose>
                            <InteractiveButton className="w-fit font-semibold cursor-pointer py-2 px-4">
                                Create case
                            </InteractiveButton>
                        </div>
                    </div>
                </form>
            </LiquidGlassDialog>
        </>
    )
}