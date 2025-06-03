"use client"
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getThemes } from "@/app/actions/getThemes";
import { updateGuildSettings } from "@/app/actions/guilds/updateGuildSettings";
import { getUserThemes } from "@/app/actions/theme_gallery/getUserThemes";
import { ThemeGallery_ThemeCreator } from "@/components/theme_gallery/ThemeGallery_ThemeCreator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogDescription, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useServerStore } from "@/store/server-store";
import Image from "next/image";
import { permanentRedirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ThemeGallery() {
    const router = useRouter();
    const [themes, setThemes] = useState<any>();
    const [userData, setUserData] = useState<any>();
    const [createdThemesData, setCreatedThemesData] = useState<any>();
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const serverId = useServerStore((state) => state.currentServerId);
    const setServerId = useServerStore((state) => state.setServerId);

    const getData = async () => {
        const response = await getThemes();
        const response2 = await getDiscordUser();
        const response3 = await getUserThemes(response2.id);
        setThemes(response);
        setUserData(response2);
        setCreatedThemesData(response3);
        setLastUpdated(new Date());
    };

    useEffect(() => {
        getData();

        const interval = setInterval(() => {
            getData();
        }, 60000); // refresh every 60 seconds

        return () => clearInterval(interval);
    }, []);

    function getTimeAgo(date: Date | null) {
        if (!date) return "";
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        return `${minutes}m ago`;
    }

    const setTheme = async (theme: any) => {
        const findTheme = themes?.data?.find((t: any) => t.id === theme);

        if (serverId === null) {
            const lsServerId = window.localStorage.getItem("currentServerId");
            setServerId(lsServerId as string);

            const currentServerData = await getCurrentGuild(lsServerId);
            const response = await updateGuildSettings(
                currentServerData?.data.dsData.id,
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
            );
    
            if (response === 200) {
                toast.success("Theme applied successfully.");
                return permanentRedirect("/beta/customisation/theme-gallery");
            }
        } else {
            const currentServerData = await getCurrentGuild(serverId);
            const response = await updateGuildSettings(
                currentServerData?.data.dsData.id,
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
            );
    
            if (response === 200) {
                toast.success("Theme applied successfully.");
                return permanentRedirect("/beta/customisation/theme-gallery");
            }
        }

        
    };

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
                <div className="flex flex-row items-center gap-2 justify-start px-4 py-2">
                    <Input
                        type="text"
                        placeholder="Search for a theme..."
                    />
                    <TabsList className="bg-background text-foreground flex flex-row items-center gap-2">
                        <TabsTrigger value="featured">Featured</TabsTrigger>
                        <TabsTrigger value="featured" disabled>
                            Favourites
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="featured" className="w-full p-2 ">
                    <div className="flex flex-col items-start justify-start gap-1 px-4 py-1">
                        <span className="text-md font-semibold text-foreground">Featured Themes</span>
                        <span className="text-sm font-normal text-muted-foreground">
                            These themes are curated by MYMOD staff, and by the community.
                        </span>
                        <span className="text-sm font-normal text-white py-1 px-2 rounded-md border-1 border-yellow-500 bg-yellow-700">
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
                                                    className="absolute overflow-hidden top-0 left-0 w-full h-[50px] rounded-[20px] blur-[40px] z-[10]"
                                                    style={{
                                                        background: `radial-gradient(circle at top center, ${theme.color_1}99 10%, ${theme.color_2}66 40%, ${theme.color_3}4D 70%)`,
                                                    }}
                                                />

                                                {/* Content Overlay */}
                                                <div className="bg-background/90 absolute inset-0 z-[40] self-end flex flex-col items-start justify-start p-4 text-foreground">
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
                                    <DialogContent className="dark min-w-[80vw] flex flex-col text-white">
                                        <DialogTitle>
                                            Install the {theme.name} theme
                                        </DialogTitle>
                                        <DialogDescription>
                                            {theme.description}
                                        </DialogDescription>
                                        <br />
                                        <h4 className="text-sm uppercase text-left w-full font-bold text-zinc-500 py-2">
                                            What you get
                                        </h4>
                                        <div className="flex flex-row w-full items-start gap-2">
                                            <div className="flex flex-col w-full items-start gap-2">
                                                <h4 className="text-lg text-left w-full font-bold text-zinc-300">
                                                    Gradient
                                                </h4>
                                                <Card
                                                    className={`overflow-hidden w-full h-[200px] bg-black p-0 border border-zinc-900`}
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
                                                <h4 className="text-lg text-left w-full font-bold text-zinc-300">
                                                    Wallpaper
                                                </h4>
                                                <Card
                                                    className={`overflow-hidden w-full h-[200px] bg-black p-0 border border-zinc-900`}
                                                >
                                                    {theme?.background.endsWith(".mp4") && (
                                                        <>
                                                            <video
                                                                className="relative inset-0 w-full h-fit object-cover z-0"
                                                                src={theme.background}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                            />
                                                            <div className="relative w-full h-full z-[2] bg-black/90">
                                                                &nbsp;
                                                            </div>
                                                        </>
                                                    )}

                                                    {/* Image background if not video */}
                                                    {!theme?.background.endsWith(".mp4") && (
                                                        <div
                                                            className="relative inset-0 w-full h-full z-0"
                                                            style={{
                                                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,${theme.overlayPercent}), rgba(0,0,0,${theme.overlayPercent})), url('${theme.background}')`,
                                                                backgroundSize: "cover",
                                                                backgroundRepeat: "no-repeat",
                                                                backgroundPosition: "center",
                                                            }}
                                                        />
                                                    )}
                                                </Card>
                                            </div>
                                            <div className="flex flex-col w-full items-start gap-2">
                                                <h4 className="text-lg text-left w-full font-bold text-zinc-300">
                                                    Font
                                                </h4>
                                                <Card
                                                    className={`${theme.font} overflow-hidden w-full h-[200px] bg-black p-0 border border-zinc-900`}
                                                >
                                                    <div
                                                        className={`relative w-full h-full flex flex-col justify-center p-2`}
                                                    >
                                                        <h1 className="text-3xl font-bold">Heading</h1>
                                                        <h1 className="text-xl font-semibold">
                                                            Subheading
                                                        </h1>
                                                        <h1 className="text-md font-normal">
                                                            Paragraph
                                                        </h1>
                                                        <h1 className="text-sm font-normal text-zinc-400">
                                                            Subtext
                                                        </h1>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => setTheme(theme.id)}
                                            variant="outline"
                                            className="w-auto self-end dark text-white"
                                        >
                                            Apply theme
                                        </Button>
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