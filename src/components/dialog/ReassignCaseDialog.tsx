"use client"
import { ChevronRight, UserSearch } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormEvent, useEffect, useState } from "react"
import { getCurrentGuildRelationships } from "@/app/actions/getCurrentGuildRelationships"
import { Avatar, AvatarImage } from "../ui/avatar"
import { reassignCase } from "@/app/actions/cases/reassignCase"
import { getDiscordUser } from "@/app/actions/getDiscordUser"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const ReassignCaseDialog = ({ caseData }: any) => {
    const router = useRouter();
    const [guildRelationshipData, setGuildRelationshipData] = useState<any>({});
    const [userData, setUserData] = useState<any>({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchGuildRelationshipData = async () => {
            const response = await getCurrentGuildRelationships(caseData?.guildID);
            const response2 = await getDiscordUser();
            if (response) {
                setGuildRelationshipData(response);
            }
            if(response2) {
                setUserData(response2);
            }
        }
        fetchGuildRelationshipData();
    }, [caseData]);

    const reassignCaseFrm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const response = await reassignCase(caseData?.caseID, {
            assigneeId: form.get("assigneeId"),
            executorId: userData?.id,
        })

        if(response === 200) {
            setOpen(false);
            toast.success(`Case reassigned successfully.`)
            router.refresh();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(!open)} variant="ghost" className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-start gap-1">
                        <UserSearch className="text-cyan-500" size={16} />
                        <span>Reassign</span>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="dark text-white">
                <form
                    onSubmit={reassignCaseFrm}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Reassign Case:{" "}
                            <span className="capitalize">
                                {caseData?.case_info.case_type}{" "}
                                {caseData?.user_info.globalName || caseData?.user_info.username}
                            </span>
                        </DialogTitle>
                        <DialogDescription>
                            <span>
                                This will reassign the case to another MYMOD user
                                within your server. Select a user from the list
                                below.
                            </span>
                            <br />
                            <br />
                            <Select name="assigneeId">
                                <SelectTrigger className="w-auto dark">
                                    <SelectValue placeholder="Select a MYMOD user" />
                                </SelectTrigger>
                                <SelectContent className="dark">
                                    {guildRelationshipData &&
                                        guildRelationshipData.relData?.map(
                                            (relationship: any) => (
                                                <SelectItem
                                                    value={relationship.userId}
                                                    key={relationship.userId}
                                                    className="flex flex-row items-center gap-2"
                                                >
                                                    <Avatar className="w-6 h-6 rounded-full">
                                                        <AvatarImage
                                                            src={relationship.avatar}
                                                        />
                                                    </Avatar>
                                                    <span>{relationship.globalName || relationship.username}</span>
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
    )
}