"use client";
import { editTheme } from "@/app/actions/theme_gallery/editTheme";
import { getThemesUnderReview } from "@/app/actions/theme_gallery/getThemesUnderReview";
import { SiteHeader } from "@/components/site-header";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloudUpload, RefreshCw, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ThemeGalleryReviewQueue() {
  const router = useRouter();
  const [themesUnderReview, setThemesUnderReview] = useState<any>();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const getData = async () => {
    const response = await getThemesUnderReview();
    setThemesUnderReview(response);
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

  const approveTheme = async (themeId: any, userId: any) => {
    const response = await editTheme(themeId, userId, {
      status: "active",
    });
    if (response === 200) {
      toast.success("Theme successfully approved.");
      router.refresh();
    }
  };

  const denyTheme = async (themeId: any, userId: any) => {
    const response = await editTheme(themeId, userId, {
      status: "denied",
    });
    if (response === 200) {
      toast.success("Theme successfully denied.");
      router.refresh();
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <SiteHeader />
      <div className="mt-4 flex flex-1 flex-col overflow-hidden w-full">
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full px-4 pb-4 md:px-6 md:pb-6 gap-4 md:gap-6 @container/main">
          <h1 className="text-white text-2xl font-bold">Review Queue</h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin-slow" />
            Updated {getTimeAgo(lastUpdated)}
          </div>
          <div className="flex flex-col items-start justify-start mt-2">
            {themesUnderReview?.data?.map((theme: any) => (
              <Card
                key={theme.id}
                className="overflow-hidden w-full h-[200px] p-0 border border-zinc-900"
              >
                <div className="relative w-full h-full">
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
                    className="absolute top-0 left-0 w-full h-[50px] rounded-[20px] blur-[40px] z-[30]"
                    style={{
                      background: `radial-gradient(circle at top center, ${theme.color_1}99 10%, ${theme.color_2}66 40%, ${theme.color_3}4D 70%)`,
                    }}
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-[40] self-end flex flex-col items-start justify-start gap-1 p-4 text-white">
                    <p className="text-lg font-semibold">{theme.name}</p>
                    <p className="text-sm font-normal">{theme.description}</p>
                    <p className="text-sm font-normal flex flex-row items-center gap-2">
                      <span>Submitted by:</span>
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={theme.creator_info.displayAvatarURL}
                          alt="Avatar"
                          className="rounded-full"
                        />
                      </Avatar>
                      <span>
                        {theme.creator_info.globalName ||
                          theme.creator_info.username}
                      </span>
                    </p>
                    <div className="flex mt-1 flex-row items-center gap-2 justify-start">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="cursor-pointer dark text-white"
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="dark min-w-[80vw] flex flex-col text-white">
                          <DialogTitle>
                            Review the {theme.name} theme
                          </DialogTitle>
                          <DialogDescription>
                            Ensure the theme is free of inappropriate, or vulgar
                            content, and respects MYMOD&apos;s guidelines.
                          </DialogDescription>
                          <br />
                          <h4 className="text-sm uppercase text-left w-full font-bold text-zinc-500 py-2">
                            Current theme configuration
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
                                  <h1 className="text-3xl font-bold">
                                    Heading
                                  </h1>
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
                          <div className="flex flex-row items-center self-send gap-2">
                            <Button
                              variant="destructive"
                              className="w-auto self-end dark text-white"
                              onClick={() =>
                                denyTheme(theme.id, theme.creator_info.id)
                              }
                            >
                              <ShieldX /> Deny
                            </Button>
                            <Button
                              onClick={() =>
                                approveTheme(theme.id, theme.creator_info.id)
                              }
                              className="cursor-pointer dark bg-green-700 hover:bg-green-900 text-white"
                            >
                              <CloudUpload /> Approve & publish
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        className="cursor-pointer dark text-white"
                        onClick={() =>
                          denyTheme(theme.id, theme.creator_info.id)
                        }
                      >
                        <ShieldX /> Deny
                      </Button>
                      <Button
                        onClick={() =>
                          approveTheme(theme.id, theme.creator_info.id)
                        }
                        className="cursor-pointer dark bg-green-700 hover:bg-green-900 text-white"
                      >
                        <CloudUpload /> Approve & publish
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {themesUnderReview?.data.length === 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                There aren&apos;t any themes to review.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
