import Image from "next/image";
import { Card } from "../ui/card";
import { ServerSwitcher } from "./ServerSwitcher";
import { UpdaterDialog } from "../UpdaterDialog";
import { NotificationDialog } from "../dialog/NotificationDialog";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const ApplicationNavBar = ({ notificationsData }: any) => {
  return (
    <div className="fixed top-0 left-0 z-[20] w-full">
      <Card className="p-0 m-0 h-14 w-full bg-black/40 backdrop-blur-2xl border-none border-b-1 border-zinc-800 rounded-none flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start px-2 py-1 gap-3">
          <Image src={"/mymod_emblem.svg"} width={30} height={30} alt="MYMOD" />
          <ServerSwitcher />
        </div>
        <div className="flex flex-row items-center justify-start px-2 py-1 gap-3 mr-3">
          <UpdaterDialog />
          <NotificationDialog notificationsData={notificationsData} />
          <UserButton appearance={{ baseTheme: dark }} />
        </div>
      </Card>
    </div>
  );
};
