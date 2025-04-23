"use client"
import { Trash } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { deleteCase } from "@/app/actions/cases/deleteCase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
    subsets: ["latin"],
})

export const DeleteCaseDialog = ({ serverId, caseId }: any) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const caseDeleteSubmit = async () => {
        const response = await deleteCase(caseId);
        if(response === 200) {
            toast.success("Case deleted successfully.");
            setOpen(false);
            router.push(`/:d:/app/server/${serverId}/cases`);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="dark w-auto text-white px-2">
                    <Trash size={16} className="text-red-500" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className={`${montserrat.className} dark text-white`}>
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
                    <Button onClick={caseDeleteSubmit} variant="destructive" className="dark text-white">
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