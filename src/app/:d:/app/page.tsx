import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Geist } from "next/font/google";
import { redirect } from "next/navigation";
import { montserrat } from "./server/[serverId]/fonts";

export default async function DiscordApp() {
  const discordData = await getDiscordUser();

  return (
    <div className="w-full h-screen bg-black" suppressHydrationWarning={true}>
      <div className="bkg-gradient w-full h-screen"></div>
      <div className="flex flex-col items-left mt-[55px] w-full p-10">
        <div className="flex items-center justify-start gap-2">
          <div
            className={`font-semibold text-4xl ${montserrat.className} text-gradient`}
          >
            Welcome back, {discordData?.username}.
          </div>
        </div>
        <p
          className={`font-medium text-lg ${montserrat.className} text-zinc-500`}
        >
          Select a server from the navigation bar to get started.
        </p>
      </div>
    </div>
  );
}
