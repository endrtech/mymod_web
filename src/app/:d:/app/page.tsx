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
          What would you like to do today? Or, select a server from the left to
          get started.
        </p>
        <div className="relative w-full max-w-md p-[2px] rounded-full animated-gradient mt-6 -ml-2">
          <input
            type="text"
            placeholder="Try a prompt like: ban a user from my server..."
            className="w-full px-4 py-2 rounded-full placeholder:text-zinc-600 text-white border-none focus:outline-none bg-zinc-800 relative z-10"
          />
        </div>
      </div>
    </div>
  );
}
