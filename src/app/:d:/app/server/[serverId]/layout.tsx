import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "../../../../globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getUser } from "@/app/actions/getUser";
import Link from "next/link";
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getCurrentGuildMembers } from "@/app/actions/getCurrentGuildMembers";
import {
  Group,
  MessageSquare,
  PaintRoller,
  Sparkles,
  Users,
} from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserGuildRelationship } from "@/app/actions/guilds/getUserGuildRelationship";
import { SearchDialog } from "@/components/dialog/SearchDialog";

import {
  geistSans,
  roboto,
  poppins,
  barlowSemiCondensed,
  inter,
  hankenGrotesk,
} from "./fonts";
import { RefreshApplicationNav } from "@/components/RefreshApplicationNav";
import { Button } from "@/components/ui/button";
import { ToggleAISidebar } from "@/components/ToggleAISidebar";

export const metadata: Metadata = {
  title: `MYMOD`,
  description: "Welcome to the futue of moderation.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ serverId: string }>;
  children: React.ReactNode;
}>) {
  let font;
  const serverId = (await params).serverId;
  const discordData = await getDiscordUser();
  const userData = await getUser(discordData?.id);
  const currentServerData = await getCurrentGuild(serverId);
  const currentServerMembersData = await getCurrentGuildMembers(serverId);
  const getGuildRelationship = await getUserGuildRelationship(
    serverId,
    discordData?.id,
  );

  if (currentServerData?.data.mmData.module_config.appearance?.font) {
    font = currentServerData?.data.mmData.module_config.appearance?.font;
  } else {
    font = "font-montserrat";
  }

  const bg =
    currentServerData?.data.mmData.module_config.appearance?.background;
  const isVideo = bg?.endsWith(".mp4");

  return (
    <SidebarProvider defaultOpen={false}>
      <div
        className={`${inter.className} ${poppins.className} ${roboto.className} ${barlowSemiCondensed.className} ${geistSans.className} ${hankenGrotesk.className} antialiased bg-zinc-900 w-full h-screen`}
        suppressHydrationWarning={true}
      >
        {/* Video background if it's an mp4 */}
        {isVideo && (
          <>
            <video
              className="absolute inset-0 w-full h-screen object-cover z-0"
              src={bg}
              autoPlay
              loop
              muted
              playsInline
            />
            <div
              className="absolute z-[1] left-0 w-[100vw] h-screen"
              style={{
                backgroundImage: bg
                  ? `linear-gradient(to bottom, rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"}), rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"})), url('${bg}')`
                  : "none",
                backgroundColor: bg ? undefined : "black",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          </>
        )}

        {/* Gradient/image background if not a video */}
        {!isVideo && (
          <div
            className="absolute inset-0 w-full h-full z-0"
            style={{
              backgroundImage: bg
                ? `linear-gradient(to bottom, rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"}), rgba(0,0,0,${currentServerData?.data.mmData.module_config.appearance?.overlay_percent ? currentServerData?.data.mmData.module_config.appearance?.overlay_percent : "0.9"})), url('${bg}')`
                : "none",
              backgroundColor: bg ? undefined : "black",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
        )}
        <div
          className="w-full fixed top-0 left-0 z-[5] h-[50px] rounded-[20px] blur-[40px] bg-black/40"
          style={{
            background: `radial-gradient(circle at top center, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_1 : "#00BFFF"}99 10%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_2 : "#8A2BE6"}66 40%, ${currentServerData?.data.mmData.module_config.appearance ? currentServerData?.data.mmData.module_config.appearance.gradient.color_3 : "#FF0080"}4D 70%)`,
          }}
        ></div>
        <div
          className={`flex z-[10] relative flex-col items-left justify-left w-full h-screen ${font}`}
        >
          <div className="z-[20] flex items-center justify-end gap-2 mr-4 mt-2">
            <RefreshApplicationNav />
            <ToggleAISidebar />
          </div>
          <div className="w-full h-full overflow-y-scroll">{children}</div>
        </div>
        {currentServerData.data?.mmData.module_config.mymod_intelligence
          .enabled === true && (
          <ChatWidget
            serverId={(await params).serverId}
            userId={discordData?.id}
          />
        )}
      </div>
    </SidebarProvider>
  );
}
