"use client"
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { barlowSemiCondensed, geistSans, hankenGrotesk, inter, poppins, roboto } from "@/app/beta/fonts"
import { useServerStore } from "@/store/server-store";
import { useEffect, useState } from "react";
import { SidebarInset } from "../ui/sidebar";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getServerById} from "@/queries/servers";
import {useServer} from "@/context/server-provider";

export const WallpaperProvider = ({ children }: { children: React.ReactNode }) => {
    const serverId = useServerStore((state) => state.currentServerId);
    const { currentServerId } = useServer();

    const { data: currentServerData } = useSuspenseQuery(getServerById(serverId || currentServerId as string));

    let font;

    if (currentServerData?.data.mmData.module_config.appearance?.font) {
        font = currentServerData?.data.mmData.module_config.appearance?.font;
      } else {
        font = "font-montserrat";
      }

    const bg =
        currentServerData?.data.mmData.module_config.appearance?.background;
    const isVideo = bg?.endsWith(".mp4");

    return (
        <div
            className={`${inter.className} ${poppins.className} ${roboto.className} ${barlowSemiCondensed.className} ${geistSans.className} ${hankenGrotesk.className} antialiased bg-background w-full h-screen relative`}
            suppressHydrationWarning={true}
        >
            {/* Video background if it's an mp4 */}
            {isVideo && (
                <video
                    className="fixed inset-0 w-full h-full object-cover z-0"
                    src={bg}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            )}

            {/* Gradient/image background if not a video */}
            {!isVideo && (
                <div
                    className="fixed inset-0 w-full h-full z-0"
                    style={{
                        backgroundImage: bg
                            ? `url('${bg}')`
                            : "none",
                        backgroundColor: bg ? undefined : "var(--background)",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                />
            )}

            {/* SidebarInset now handles its own positioning and scrolling */}
            <div className="fixed z-[1] top-0 left-0 w-[100vw] h-full bg-background/20 backdrop-blur-md" />
            <SidebarInset
                className={`z-[10] top-0 left-0 w-[70vw] h-full ${font} bg-transparent`}
                suppressHydrationWarning={true}
            >
                {children}
            </SidebarInset>
        </div>
    )
}