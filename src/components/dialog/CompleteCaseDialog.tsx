"use client"
import { useEffect } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { completeCase } from "@/app/actions/cases/completeCase";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

export const CompleteCaseDialog = ({ serverId, caseData }: any) => {
    const router = useRouter();
    const markCaseComplete = async () => {
        const response = await completeCase(caseData?.caseID);

        if (response === 200) {
            toast.success("Case completed.");
            return router.refresh();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="w-auto px-2">
                    <Check size={16} className="text-green-500" />
                    Complete Case
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you absolutely sure you want to mark this case as complete?
                    </DialogTitle>
                    <DialogDescription>
                        This action can be undone. All actions will be performed against <span className="capitalize">{caseData?.user_info.globalName || caseData?.user_info.username}</span>. You will be able to make any comments after this case is marked complete.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="default" onClick={() => markCaseComplete()}>
                        Yes, I&apos;m sure
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}