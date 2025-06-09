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
            className={`${inter.className} ${poppins.className} ${roboto.className} ${barlowSemiCondensed.className} ${geistSans.className} ${hankenGrotesk.className} antialiased bg-background w-full h-screen`}
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
                </>
            )}

            {/* Gradient/image background if not a video */}
            {!isVideo && (
                <div
                    className="absolute inset-0 w-full h-full z-0"
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
            <div className="absolute inset-0 w-full h-full z-1 bg-gradient-to-b from-background/70 to-background/70 backdrop-blur-sm" />
            <SidebarInset
                className={`z-[10] relative w-full h-screen ${font} bg-transparent`}
                suppressHydrationWarning={true}
            >
                {children}
            </SidebarInset>
        </div>
    )
}