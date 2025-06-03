"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { importAuditLogData } from "@/app/actions/importAuditLogData"

export const AuditLogImportDialog = ({ serverId }: any) => {
    const importDSAuditData = async () => {
        await importAuditLogData(serverId);
        toast("Importing your audit logs from Discord...", {
          description:
            "This may take a few minutes. Feel free to grab a coffee while you wait.",
        });
        setTimeout(() => {
          toast("Audit logs imported!", {
            description: "Click 'OK' to update the page.",
            action: {
              label: "OK",
              onClick: () => {
                toast.dismiss();
                location.reload();
              },
            },
          });
        }, 30000);
      };

    return (
        <>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Import from Discord</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to import audit logs from
                        Discord?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        With the power of the Discord API, MYMOD is able to
                        pull in your audit log data from the last 45 days that
                        has been recorded on Discord.
                        <br />
                        <br />
                        <b>By continuing,</b> you confirm that you wish to
                        import the last <b>45 days</b> worth of your Discord
                        audit log data. <b>This is irreversible,</b> and
                        private data may be held in your Discord audit log
                        data. We aim to keep your data safe under our Privacy
                        Policy, but ensure that you only add people you trust
                        to your MYMOD team to view this data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-muted-foreground">
                        I&apos;ve changed my mind
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => importDSAuditData()}>
                        I agree, import!
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <Toaster className="dark" />
        </>
    )
}