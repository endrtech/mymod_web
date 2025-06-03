"use client"
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Geist } from "next/font/google";
import { permanentRedirect, redirect } from "next/navigation";
import { montserrat } from "./server/[serverId]/fonts";
import { useEffect, useState } from "react";

export default function DiscordApp() {
  const [discordData, setDiscordData] = useState<any>();
  const [betaEnabled, setBetaEnabled] = useState<any>();

  useEffect(() => {
    const isBetaEnabled = window.localStorage.getItem("betaEnabled");

    if (isBetaEnabled === "true") {
      setBetaEnabled(true);
      return permanentRedirect("/beta");
    } else {
      setBetaEnabled(false);
      const getData = async () => {
        const discordData = await getDiscordUser();
        setDiscordData(discordData);
      }
  
      getData();
    }
  }, [])

  if(!betaEnabled) {
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
  } else {
    return (
      <div className="bg-black w-full h-screen">&nbsp;</div>
    )
  }
}
