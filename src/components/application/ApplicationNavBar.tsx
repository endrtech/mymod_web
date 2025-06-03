"use client"
import Image from "next/image";
import { Card } from "../ui/card";
import { ServerSwitcher } from "./ServerSwitcher";
import { UpdaterDialog } from "../UpdaterDialog";
import { NotificationDialog } from "../dialog/NotificationDialog";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { Button } from "../ui/button";
import { Stars } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { usePlatform } from "@/hooks/use-platform";
import { permanentRedirect } from "next/navigation";

export const ApplicationNavBar = ({ notificationsData }: any) => {
  const { isElectron, isMac, isWindows } = usePlatform();

  return (
    <div className="fixed top-0 left-0 z-[20] w-full">
      <Card className="dragRegion p-0 m-0 h-14 w-full bg-black/70 backdrop-blur-2xl border-none border-b-1 border-zinc-800 rounded-none flex flex-row items-center justify-between">
        <div className={`${(isElectron && isMac) ? "ml-16" : ""} flex flex-row items-center justify-start px-2 py-1 gap-3`}>
          <Image src={"/mymod_emblem.svg"} width={30} height={30} alt="MYMOD" className="noDrag" />
          <div className="noDrag">
            <ServerSwitcher />
          </div>
        </div>
        <div className="flex flex-row items-center justify-start px-2 py-1 gap-3 mr-3 noDrag">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="md:flex hidden dark text-white hover:shadow-md hover:shadow-zinc-800">
                <Stars /> Access modUI 2 Beta
              </Button>
            </DialogTrigger>
            <DialogContent className="dark text-white md:min-w-[1000px] min-w-[600px]">
              <div className="flex flex-row w-full h-full pt-4">
                <div className="w-1/3 h-full">
                  <DialogTitle>The all-new modUI 2 is here.</DialogTitle>
                  <DialogDescription>
                    <br /><br />
                    The team at ENDR has been hard at work on this one.
                    <br /><br />
                    Introducing modUI 2, a UI system redesigned for the desktop, giving you access to the tools you need quicker.
                    <br /><br />
                    Currently, modUI 2 is in beta, meaning things may not work as expected, and there is currently no mobile support for modUI 2.
                    <br />
                    If you don't like the new UI system, you can switch back at anytime.
                  </DialogDescription>
                </div>
                <div className="flex-1 w-1/2">
                <Image
                  src="/modui-2-beta-header.png"
                  alt="modUI 2 Beta"
                  width={700}
                  height={700}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost" className="dark text-zinc-400">
                        Close
                      </Button>
                    </DialogClose>
                      <Button variant="outline" className="dark text-white" onClick={() => permanentRedirect("/welcome")}>
                        Access Beta
                      </Button>
                  </DialogFooter>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <UpdaterDialog />
          <NotificationDialog notificationsData={notificationsData} />
          <UserButton appearance={{ baseTheme: dark }} />
          <div className={`${(isElectron && isWindows) ? "mr-20" : "w-0"}`}>&nbsp;</div>
        </div>
      </Card>
    </div>
  );
};
