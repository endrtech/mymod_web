"use client";

import { getThemes } from "@/app/actions/getThemes";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardAction, CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { updateGuildSettings } from "@/app/actions/guilds/updateGuildSettings";
import { toast } from "sonner";
import { Paintbrush, Plus, RefreshCw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { ThemeGallery_ThemeCreator } from "./ThemeGallery_ThemeCreator";
import { getUserThemes } from "@/app/actions/theme_gallery/getUserThemes";
import { Badge } from "../ui/badge";

type Theme = {
  id: string;
  name: string;
  description: string;
  color_1: string;
  color_2: string;
  color_3: string;
  background: string;
  font: string;
  overlayPercent: string;
};

export const ThemeGalleryMain = ({ currentServerData }: any) => {
  const router = useRouter();
  const [themes, setThemes] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [createdThemesData, setCreatedThemesData] = useState<any>();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const getData = async () => {
    const response = await getThemes();
    const response2 = await getDiscordUser();
    const response3 = await getUserThemes(response2.id);
    setThemes(response);
    setUserData(response2);
    setCreatedThemesData(response3);
    setLastUpdated(new Date());
  };

  console.log(currentServerData);

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
      router.refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="dark text-white">
          Access Theme Gallery
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`bg-transparent p-0 border-none w-full h-full md:min-w-[90%] md:min-h-[80%] md:h-[70%] md:w-[90%] dark text-white -ml-4 md:-mt-20`}
      >
        <Card
          className={`${currentServerData?.data.mmData.module_config.appearance.font || "font-montserrat"} bg-background h-[100%] w-full px-3 md:p-8`}
        >
          <DialogTitle className="flex flex-row items-center justify start h-fit gap-2 py-6 px-2 md:p-0">
            <Avatar className="w-6 h-6 rounded-full">
              <AvatarImage src="/mymod_emblem.svg" alt="MYMOD" />
            </Avatar>
            <span>MYMOD Theme Gallery</span>
          </DialogTitle>
          <Tabs
            defaultValue="featured"
            className="flex flex-col w-full items-start"
          >
            <div className="flex flex-row gap-2 items-center justify-between w-full h-fit mb-4">
              <TabsList className="dark text-white flex flex-row items-center gap-2">
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="featured" disabled>
                  Favourites
                </TabsTrigger>
              </TabsList>
              <span className="flex-grow" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin-slow" />
                Updated {getTimeAgo(lastUpdated)}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="w-8 h-8 rounded-full">
                    <AvatarImage
                      src={`https://cdn.discordapp.com/avatars/${userData?.id}/${userData?.avatar}`}
                      alt={userData?.globalName || userData?.username}
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="p-2 dark w-fit text-white"
                >
                  <div className="flex flex-row items-center justify-start gap-2 p-4 bg-background rounded-lg border-1 border-zinc-800 mb-2">
                    <Avatar className="w-12 h-12 rounded-full shadow-lg shadow-background">
                      <AvatarImage
                        src={`https://cdn.discordapp.com/avatars/${userData?.id}/${userData?.avatar}`}
                        alt={userData?.globalName || userData?.username}
                      />
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-semibold ml-1">
                        {userData?.globalName || userData?.username}
                      </span>
                      <span className="text-sm text-zinc-400 bg-zinc-800 px-2 rounded-full">
                        @{userData?.username}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full gap-2">
                    <ThemeGallery_ThemeCreator user={userData?.id} />
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="dark hover:bg-zinc-800 p-2 rounded-lg transition-all duration-200 h-auto text-white text-left w-[60%]">
                          <div className="flex flex-col gap-2 items-start text-left">
                            <Paintbrush className="text-purple-500" size={30} />
                            <div className="flex flex-col gap-1 items-start">
                              <span className="text-md font-bold">
                                My Themes
                              </span>
                              <span className="text-wrap text-sm">
                                View themes you've created, and their status.
                              </span>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="dark text-white">
                        <DialogTitle>Your Themes</DialogTitle>
                        <DialogDescription>
                          To modify a theme, head to Theme Creator.
                        </DialogDescription>
                        <div className="flex flex-col gap-2 max-h-[60%] overflow-y-auto">
                          {createdThemesData?.data?.map((theme: any) => (
                            <Card
                              key={theme.id}
                              className="overflow-hidden w-full md:w-[370] h-[200px] p-0 border border-zinc-900"
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
                      </DialogContent>
                    </Dialog>
                  </div>
                </PopoverContent>
              </Popover>
              <Input
                type="text"
                placeholder="Search for a theme..."
                className="w-[20%]"
              />
            </div>
            <TabsContent value="featured" className="w-full p-2 ">
              <CardTitle>Featured Themes</CardTitle>
              <CardDescription>
                These themes are curated by MYMOD staff. Currently, only
                MYMOD-made themes are displayed here.
              </CardDescription>
              <br />
              <div className="h-[70vh] w-full overflow-y-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                  {themes?.data?.map((theme: any) => (
                    <Dialog key={theme.id}>
                      <DialogTrigger asChild>
                        <Card
                          key={theme.id}
                          className="overflow-hidden cursor-pointer w-full h-[200px] p-0 border border-zinc-900"
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
                              <p className="text-sm font-normal truncate w-full overflow-hidden">
                                {theme.description}
                              </p>
                              <Badge className="mt-1 dark bg-zinc-900 text-white flex flex-row items-center gap-2">
                                {theme.system_theme === true ? (
                                  "Made by MYMOD"
                                ) : (
                                  <div className="flex flex-row items-center gap-2">
                                    <Avatar className="w-6 h-6">
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
        </Card>
      </DialogContent>
    </Dialog>
  );
};
