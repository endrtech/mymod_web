"use client"
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDiscordData } from "@/queries/users";
import { getUserThemes } from "@/app/actions/theme_gallery/getUserThemes";
import { Loader2 } from "lucide-react";

export default function MyThemes() {
    const router = useRouter();
    const { data: discordData, isLoading: isDiscordLoading } = useQuery(getDiscordData());
    const { data: createdThemesData, isLoading: isThemesLoading } = useQuery({
        queryKey: ['get_user_themes', discordData?.id],
        queryFn: () => getUserThemes(discordData?.id),
        enabled: !!discordData?.id
    });

    if (isDiscordLoading || isThemesLoading || !discordData?.id) {
        return (
            <div className="w-[70vw] h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-background flex flex-col items-start justify-start w-[70vw] h-full p-4">
            <div className="flex flex-col items-start gap-2 justify-start mb-4">
                <span className="text-2xl font-semibold text-foreground">My Themes</span>
                <span className="text-sm font-normal text-muted-foreground">Want to edit a theme? Head to Theme Creator to edit any of the themes listed here.</span>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
                {createdThemesData?.data?.map((theme: any) => (
                    <Card
                        key={theme.id}
                        className="overflow-hidden w-full h-[200px] p-0 border border-zinc-900"
                    >
                        <div className="overflow-hidden relative w-full h-full">
                            {/* Video background if .mp4 */}
                            {theme?.background.endsWith(".mp4") && (
                                <>
                                    <video
                                        className="absolute inset-0 w-full h-full object-cover z-0"
                                        src={theme.background}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className="relative w-full h-full z-[2] bg-black/90"></div>
                                </>
                            )}

                            {/* Image background if not video */}
                            {!theme?.background.endsWith(".mp4") && (
                                <div
                                    className="absolute inset-0 w-full h-full z-0"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('${theme.background}')`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                    }}
                                />
                            )}

                            {/* Gradient Overlay */}
                            <div
                                className="absolute overflow-hidden top-0 left-0 w-full h-[50px] rounded-[20px] blur-[40px] z-[10]"
                                style={{
                                    background: `radial-gradient(circle at top center, ${theme.color_1}99 10%, ${theme.color_2}66 40%, ${theme.color_3}4D 70%)`,
                                }}
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 z-[40] self-end flex flex-col items-start justify-start p-4 text-white">
                                <p className="text-lg font-semibold">
                                    {theme.name}
                                </p>
                                <p className="text-sm font-normal">
                                    {theme.description}
                                </p>
                                <p className="text-sm font-normal">
                                    Status:{" "}
                                    {theme.status === "pending_review"
                                        ? "Under review"
                                        : theme.status === "active"
                                            ? "Active"
                                            : "Draft"}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}