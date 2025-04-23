"use client"
import { useEffect } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { completeCase } from "@/app/actions/cases/completeCase";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Check, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { rollbackCase } from "@/app/actions/cases/rollbackCase";

export const RollbackCaseDialog = ({ serverId, caseData }: any) => {
    const router = useRouter();
    const rollBackCase = async () => {
        const response = await rollbackCase(caseData?.caseID);

        if (response === 200) {
            toast.success("Case rolled back to its previous state.");
            return router.refresh();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="dark w-auto text-white px-2">
                    <RefreshCcw className="text-blue-500" size={16} />
                    Rollback Case
                </Button>
            </DialogTrigger>
            <DialogContent className="dark text-white">
                <DialogHeader>
                    <DialogTitle>
                        Are you absolutely sure you want to rollback this case?
                    </DialogTitle>
                    <DialogDescription>
                        This action can be undone. All actions already performed against <span className="capitalize">{caseData?.user_info.globalName || caseData?.user_info.username}</span> will be rolled back to the previous state. You will be able to make any comments after this case is rolled back.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="default" onClick={() => rollBackCase()}>
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