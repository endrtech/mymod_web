"use client"
import { updateGuildSettings } from "@/app/actions/guilds/updateGuildSettings";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogDescription, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useServerStore } from "@/store/server-store";
import Image from "next/image";
import { permanentRedirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAllThemes } from "@/queries/themegallery";
import { useServer } from "@/context/server-provider";
import { getServerById } from "@/queries/servers";
import { getQueryClient } from "@/lib/query-client";
import { Loader2 } from "lucide-react";

export default function ThemeGallery() {
    const serverId = useServerStore((state) => state.currentServerId);
    const { currentServerId, isLoading: isServerContextLoading } = useServer();

    const effectiveServerId = serverId || currentServerId;

    const { data: themes, isLoading: isThemesLoading } = useQuery(getAllThemes());
    const { data: serverData, isLoading: isServerLoading } = useQuery({
        ...getServerById(effectiveServerId as string),
        enabled: !!effectiveServerId
    });

    if (isServerContextLoading || isThemesLoading || isServerLoading || !effectiveServerId) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    const setThemeMutation = useMutation({
        mutationKey: ['set_theme'],
        mutationFn: async (themeId: string) => {
            const findTheme = themes?.data.find((t: any) => t.id === themeId);
            const response = await updateGuildSettings(
                serverData.data.dsData.id,
                "appearance_set_theme",
                {
                    background: findTheme?.background,
                    font: findTheme?.font,
                    themeId: findTheme?.id,
                    color_1: findTheme?.color_1,
                    color_2: findTheme?.color_2,
                    color_3: findTheme?.color_3,
                    overlayPercent: findTheme?.overlayPercent,
                },
            )
            if (response === 200) {
                toast.success("Theme applied successfully.");
            } else {
                return toast.error("Unable to apply theme. Please contact support.");
            }
        }
    })

    return (
        <div className="w-full h-screen text-foreground">
            <div className="flex flex-col h-14 w-[80%] items-start justify-start gap-4 p-4">
                <div className="flex flex-row items-center gap-2 justify-start">
                    <Image
                        src={"/mymod_emblem.svg"}
                        alt="MYMOD"
                        width={40}
                        height={40}
                    />
                    <span className="text-lg font-semibold text-foreground">Theme Gallery</span>
                </div>
            </div>
            <Tabs
                defaultValue="featured"
                className="flex flex-col w-full items-start">
                <TabsContent value="featured" className="w-full p-2 ">
                    <div className="flex flex-col items-start justify-start gap-1 px-4 py-1">
                        <span className="text-md font-semibold text-foreground">Featured Themes</span>
                        <span className="text-sm font-normal text-muted-foreground">
                            These themes are curated by MYMOD staff, and by the community.
                        </span>
                        <span className="text-sm font-normal text-foreground py-1 px-2 rounded-md border-1 border-yellow-500 bg-yellow-500/40">
                            NOTE: Themes are applied at server-level, not at user-level. Soon, you will be able to apply themes system-wide for your profile, rather than a server.
                        </span>
                    </div>
                    <br />
                    <div className="h-[70vh] w-full overflow-y-scroll p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[60vw]">
                            {themes?.data?.map((theme: any) => (
                                <Dialog key={theme.id}>
                                    <DialogTrigger asChild>
                                        <Card
                                            key={theme.id}
                                            className="overflow-hidden cursor-pointer w-full h-[200px] p-0"
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
                                                    </>
                                                )}

                                                {/* Image background if not video */}
                                                {!theme?.background.endsWith(".mp4") && (
                                                    <div
                                                        className="absolute inset-0 w-full h-full z-0"
                                                        style={{
                                                            backgroundImage: `url('${theme.background}')`,
                                                            backgroundSize: "cover",
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundPosition: "center",
                                                        }}
                                                    />
                                                )}

                                                {/* Gradient Overlay */}
                                                <div
                                                    className="relative overflow-hidden top-0 left-0 w-full h-[50px] rounded-[20px] blur-[40px] z-[20]"
                                                    style={{
                                                        background: `radial-gradient(circle at top center, ${theme.color_1}99 10%, ${theme.color_2}66 40%, ${theme.color_3}4D 70%)`,
                                                    }}
                                                />

                                                {/* Content Overlay */}
                                                <div className="bg-gradient-to-b from-transparent to-background absolute inset-0 z-[40] self-end flex flex-col items-start justify-end p-4 text-foreground">
                                                    <p className="text-lg font-semibold">
                                                        {theme.name}
                                                    </p>
                                                    <p className="text-sm font-normal truncate w-full overflow-hidden">
                                                        {theme.description}
                                                    </p>
                                                    <Badge className="mt-1 bg-background text-foreground flex flex-row items-center gap-2">
                                                        {theme.system_theme === true ? (
                                                            "Made by MYMOD"
                                                        ) : (
                                                            <div className="flex flex-row items-center gap-2">
                                                                <Avatar className="w-4 h-4">
                                                                    <AvatarImage
                                                                        src={
                                                                            theme.creator_info.displayAvatarURL
                                                                        }
                                                                        alt="Avatar"
                                                                        className="rounded-full"
                                                                    />
                                                                </Avatar>
                                                                <span>
                                                                    {"Made by " +
                                                                        theme.creator_info.globalName ||
                                                                        theme.creator_info.username}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Card>
                                    </DialogTrigger>
                                    <DialogContent className="min-w-[80vw] flex flex-col">
                                        <DialogTitle>
                                            Install the {theme.name} theme
                                        </DialogTitle>
                                        <DialogDescription>
                                            {theme.description}
                                        </DialogDescription>
                                        <br />
                                        <h4 className="text-sm uppercase text-left w-full font-bold text-muted-foreground py-2">
                                            What you get
                                        </h4>
                                        <div className="flex flex-row w-full items-start gap-2">
                                            <div className="flex flex-col w-full items-start gap-2">
                                                <h4 className="text-lg text-left w-full font-bold text-foreground">
                                                    Gradient
                                                </h4>
                                                <Card
                                                    className={`overflow-hidden w-full h-[200px] bg-background p-0 border border-muted`}
                                                >
                                                    <div className={`relative w-full h-full`}>
                                                        {/* Gradient */}
                                                        <div
                                                            className="absolute top-0 left-0 w-full h-[50px] rounded-[20px] blur-[40px] z-0"
                                                            style={{
                                                                background: `radial-gradient(circle at top center, ${theme.color_1}99 10%, ${theme.color_2}66 40%, ${theme.color_3}4D 70%)`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </Card>
                                            </div>
                                            <div className="flex flex-col w-full items-start gap-2">
                                                <h4 className="text-lg text-left w-full font-bold text-foreground">
                                                    Background
                                                </h4>
                                                <Card
                                                    className={`overflow-hidden w-full h-[200px] bg-background p-0 border border-muted`}
                                                >
                                                    <div className={`relative w-full h-full`}>
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
                                                            </>
                                                        )}

                                                        {/* Image background if not video */}
                                                        {!theme?.background.endsWith(".mp4") && (
                                                            <div
                                                                className="absolute inset-0 w-full h-full z-0"
                                                                style={{
                                                                    backgroundImage: `url('${theme.background}')`,
                                                                    backgroundSize: "cover",
                                                                    backgroundRepeat: "no-repeat",
                                                                    backgroundPosition: "center",
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="flex flex-row items-center justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setThemeMutation.mutate(theme.id);
                                                }}
                                            >
                                                Apply Theme
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}