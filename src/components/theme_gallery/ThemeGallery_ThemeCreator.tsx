"use client";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus, Cog, Home, Box, Package, Save, CircleFadingArrowUp, ChevronRight, Paintbrush } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ColorPickerInput } from "../ColorPickerInput";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { createTheme } from "@/app/actions/theme_gallery/createTheme";
import { submitThemeForReview } from "@/app/actions/theme_gallery/submitThemeForReview";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { editTheme } from "@/app/actions/theme_gallery/editTheme";
import { getTheme } from "@/app/actions/theme_gallery/getTheme";
import { getUserThemes } from "@/app/actions/theme_gallery/getUserThemes";

export const ThemeGallery_ThemeCreator = ({ user }: any) => {
  const [colorStop1, setColorStop1] = useState("#00BFFF");
  const [colorStop2, setColorStop2] = useState("#8A2BE6");
  const [colorStop3, setColorStop3] = useState("#FF0080");
  const [wallpaper, setWallpaper] = useState("");
  const [overlayPercent, setOverlayPercent] = useState("0.6");
  const [selectedFont, setSelectedFont] = useState("font-geist");
  const [themeId, setThemeId] = useState("");
  const [themeName, setThemeName] = useState("");
  const [themeDescription, setThemeDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [createdThemes, setCreatedThemes] = useState<any>([]);
  const [themeStatus, setThemeStatus] = useState("");

  console.log(user);
  console.log(themeId);

  useEffect(() => {
    const getData = async () => {
      const getUsrThemesData = await getUserThemes(user);
      if (getUsrThemesData) {
        setCreatedThemes(getUsrThemesData);
      }
    }
    getData();
  }, [getUserThemes])

  console.log(createdThemes);

  const createThemeFn = async () => {
    const response = await createTheme();
    if (response) {
      setThemeId(response);
      toast.success("Created a new project. Head to Project Settings to setup your project.");
    }
  }

  const loadThemeFn = async (themeId: any) => {
    const response = await getTheme(themeId);
    if (response) {
      setThemeId(response);
      setThemeName(response.name)
      setThemeDescription(response.description)
      setColorStop1(response.color_1)
      setColorStop2(response.color_2)
      setColorStop3(response.color_3)
      setWallpaper(response.background)
      setOverlayPercent(response.overlayPercent)
      setSelectedFont(response.font)
      setThemeStatus(response.status);
      toast.success("Loaded project into Theme Creator.");
    }
  }

  const submitThemeForReviewFn = async () => {
    const response = await submitThemeForReview(
      themeId,
      user,
      {
        name: themeName,
        description: themeDescription,
        color_1: colorStop1,
        color_2: colorStop2,
        color_3: colorStop3,
        background: wallpaper,
        font: selectedFont,
        overlayPercent: overlayPercent,
        status: "pending_review",
      }
    )

    if (response === 200) {
      toast.success("Theme submitted for review. Check it's status in the Theme Gallery.");
      setOpen(false);
    }
  }

  const saveDraft = async () => {
    const response = await editTheme(
      themeId,
      user, {
      name: `${themeName}`,
      description: `${themeDescription}`,
      color_1: `${colorStop1}`,
      color_2: `${colorStop2}`,
      color_3: `${colorStop3}`,
      background: `${wallpaper}`,
      font: `${selectedFont}`,
      overlayPercent: `${overlayPercent}`,
      status: "draft",
    }
    )

    if (response === 200) {
      toast.success("Changes saved successfully.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen}
          className="dark hover:bg-zinc-800 p-2 rounded-lg transition-all duration-200 h-auto text-white text-left w-[60%]"
        >
          <div className="flex flex-col gap-2 items-start text-left">
            <Plus className="text-green-500" size={30} />
            <div className="flex flex-col gap-1 items-start">
              <span className="text-md font-bold">Theme Creator</span>
              <span className="text-wrap text-sm">Build, edit, and publish themes using Theme Creator.</span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-transparent fixed min-w-[100%] p-0 dark text-white rounded-none min-h-[100%]">
        <Card className="rounded-none border-none bg-black flex flex-col items-start justify-start gap-0 p-0 m-0">
          <div className="flex flex-row items-center p-1.5 bg-zinc-900 w-full h-12">
            <DialogTitle className="text-sm text-zinc-400 flex flex-row items-center gap-2">
              <Avatar className="w-6 h-6 rounded-full">
                <AvatarImage src="/mymod_emblem.svg" alt="MYMOD" />
              </Avatar>
              <span>MYMOD THEME CREATOR</span>
            </DialogTitle>
          </div>
          <Tabs
            className="w-full h-[100%] flex flex-row gap-0 items-start justify-start"
            defaultValue="home"
          >
            <div className="h-[100%] w-[15%] flex flex-col justify-start bg-zinc-800">
              <div className="bg-background p-1 uppercase text-zinc-600 text-sm font-semibold">
                Main Menu
              </div>
              <TabsList className="w-full flex flex-col p-0 justify-start">
                <TabsTrigger value="home" asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-none flex flex-row items-center justify-start border-none border-b-1"
                  >
                    <Home />
                    <span>Welcome</span>
                  </Button>
                </TabsTrigger>
                {
                  themeId && (
                    <>
                      <TabsTrigger value="project-settings" asChild>
                        <Button
                          variant="outline"
                          className="w-full rounded-none flex flex-row items-center justify-start border-none border-b-1"
                        >
                          <Cog />
                          <span>Project Settings</span>
                        </Button>
                      </TabsTrigger>
                      <div className="bg-background w-full p-1 uppercase text-zinc-600 text-sm font-semibold">
                        Configure Theme
                      </div>
                      <TabsTrigger value="configurator" asChild>
                        <Button
                          variant="outline"
                          className="w-full rounded-none flex flex-row items-center justify-start border-none border-b-1"
                        >
                          <Package />
                          <span>Configurator</span>
                        </Button>
                      </TabsTrigger>
                    </>
                  )
                }
              </TabsList>
            </div>
            <TabsContent
              value="home"
              className="text-white w-full h-[100%] flex flex-col justify-center items-center"
            >
              <div className="flex flex-row items-center justify-center w-[60%] gap-5">
                <div className="flex flex-col items-start justify-center w-full">
                  <Avatar className="w-20 h-20 rounded-full">
                    <AvatarImage src="/mymod_emblem.svg" alt="MYMOD" />
                  </Avatar>
                  <span className="text-white font-semibold text-xl">
                    Welcome to MYMOD Theme Creator!
                  </span>
                  <Button onClick={() => createThemeFn()} variant="outline" className="mt-2 w-full flex flex-row items-center justify-between">
                    <span className="flex flex-row items-center gap-2">
                      <Plus />
                      <span>Create new project</span>
                    </span>
                    <ChevronRight />
                  </Button>
                  <span className="my-2" />
                  <div className="relative w-full text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-black px-2 text-muted-foreground">
                      or select a theme below:
                    </span>
                  </div>
                  {
                    createdThemes.data?.length > 0 && createdThemes.data?.map((theme: any) => (
                      <Button key={theme.id} onClick={() => loadThemeFn(theme.id)} variant="outline" className="mt-2 w-full flex flex-row items-center justify-between">
                        <span className="flex flex-row items-center gap-2">
                          <Paintbrush />
                          <span>{theme.name}</span>
                        </span>
                        <ChevronRight />
                      </Button>
                    ))
                  }
                </div>
                <Separator orientation="vertical" />
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Whats new in Theme Creator</CardTitle>
                    <CardDescription>
                      Introducting Theme Creator!
                      <br />
                      It is the new way to create and share themes for MYMOD users to use!
                      <br /><br />
                      When you open Theme Creator to create a theme, a new theme configuration is created automatically.
                      <br />
                      Use the Configurator tool to configure your theme, and when you're ready to show the world, hit "Submit for review" in Project Settings!
                      <br /><br />
                      Have fun creating amazing themes!
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
            <TabsContent
              value="project-settings"
              className="text-white w-full h-[100%] flex flex-col justify-start items-start"
            >
              <div className="bg-background w-[15%] p-1 text-zinc-300 text-sm font-semibold">
                Project Settings
              </div>
              <div className="bg-zinc-900 flex flex-col gap-4 w-full h-[100%] p-8">
                <div className="flex flex-row w-full gap-4 items-start justify-start">
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h1 className="text-white text-lg font-semibold">Project Settings</h1>
                    {
                      themeStatus === "pending_review" && (
                        <Card className="w-full bg-yellow-500/10">
                          <CardHeader>
                            <CardTitle>Heads up!</CardTitle>
                            <CardDescription>Your project is currently <b>under review.</b> If you wish to unsubmit your project, click "Save changes", to make the project a draft again.</CardDescription>
                          </CardHeader>
                        </Card>
                      )
                    }
                    <div className="flex w-full flex-col items-start gap-1 justify-start">
                      <Label>Theme name</Label>
                      <Input className="w-full" value={themeName} onChange={(e) => {
                        const { value } = e.target;

                        if (value.length > 0) {
                          setThemeName(value)
                        } else {
                          setThemeName("");
                        }
                      }} />
                      <Label className="text-xs text-zinc-400">This is what will display on the Theme Gallery.</Label>
                    </div>
                    <div className="flex w-full flex-col items-start gap-1 justify-start">
                      <Label>Theme description</Label>
                      <Textarea value={themeDescription} onChange={(e) => {
                        const { value } = e.target;

                        if (value.length > 0) {
                          setThemeDescription(value)
                        } else {
                          setThemeDescription("");
                        }
                      }} />
                      <Label className="text-xs text-zinc-400">Use this to express the design of the theme.</Label>
                    </div>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col w-full items-start gap-2 justify-start w-full">
                    <h1 className="text-white text-lg font-semibold">Theme Gallery Preview</h1>
                    <Card className="overflow-hidden w-full h-[300px] p-0 border border-zinc-900">
                      <div className="relative w-full h-full">
                        {/* Video background if .mp4 */}
                        {wallpaper.endsWith(".mp4") && (
                          <>
                            <video
                              className="absolute inset-0 w-full h-full object-cover z-0"
                              src={wallpaper}
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                            <div className="relative w-full h-full z-[2]" style={{
                              background: `linear-gradient(to bottom, rgba(0,0,0,${overlayPercent}), rgba(0,0,0,${overlayPercent}))`,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center"
                            }}></div>
                          </>
                        )}

                        {/* Image background if not video */}
                        {!wallpaper.endsWith(".mp4") && (
                          <div
                            className="absolute inset-0 w-full h-full z-0"
                            style={{
                              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,${overlayPercent}), rgba(0,0,0,${overlayPercent})), url('${wallpaper}')`,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center"
                            }}
                          />
                        )}

                        {/* Gradient Overlay */}
                        <div
                          className="absolute top-0 left-0 w-full h-[50px] rounded-[20px] blur-[40px] z-[30]"
                          style={{
                            background: `radial-gradient(circle at top center, ${colorStop1}99 10%, ${colorStop2}66 40%, ${colorStop3}4D 70%)`,
                          }}
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 z-[40] self-end flex flex-col items-start justify-start p-4 text-white">
                          <p className="text-lg font-semibold">{themeName || "My Theme"}</p>
                          <p className="text-sm font-normal">{themeDescription || 'My amazing theme!'}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-end w-full gap-2">
                  <Button onClick={() => saveDraft()} variant="outline" className="dark self-end text-white">
                    <Save /> Save changes
                  </Button>
                  <Button onClick={() => submitThemeForReviewFn()} className="bg-green-500 hover:bg-green-700 self-end text-white">
                    <CircleFadingArrowUp /> Submit for review
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="configurator"
              className="text-white w-full h-[100%] flex flex-col justify-start items-start"
            >
              <div className="bg-background w-[10%] p-1 text-zinc-300 text-sm font-semibold">
                Configurator
              </div>
              <Tabs className="w-full h-[100%]" defaultValue="configurator-theme-gradient">
                <div className="bg-zinc-900 flex flex-row gap-0 w-full h-[100%]">
                  <div className="h-[100%] w-[10%] bg-background">
                    <TabsList className="w-full rounded-none bg-background p-0 -mt-[1px] flex flex-col items-start justify-start">
                      <TabsTrigger value="configurator-theme-gradient" asChild>
                        <Button
                          variant="outline"
                          className="w-full rounded-none flex flex-row items-center justify-start border-none border-b-1"
                        >
                          <span>Gradient</span>
                        </Button>
                      </TabsTrigger>
                      <TabsTrigger value="configurator-theme-wallpaper" asChild>
                        <Button
                          variant="outline"
                          className="w-full rounded-none flex flex-row items-center justify-start border-none border-b-1"
                        >
                          <span>Wallpaper</span>
                        </Button>
                      </TabsTrigger>
                      <TabsTrigger value="configurator-theme-system-font" asChild>
                        <Button
                          variant="outline"
                          className="w-full rounded-none flex flex-row items-center justify-start border-none border-b-1"
                        >
                          <span>System Font</span>
                        </Button>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="configurator-theme-gradient" className="w-full h-[100%] p-4">
                    <div className="flex flex-row gap-4 w-full h-[100%]">
                      <div className="flex flex-col w-[30%]">
                        <h1 className="text-white text-lg font-semibold">Dashboard Gradient</h1>
                        <span className="text-zinc-400 font-medium text-sm">This gradient applies for all users on a specific server Dashboard.</span>
                        <br />
                        <div className="flex flex-col items-start gap-1 mt-2">
                          <ColorPickerInput value={colorStop1} onChange={setColorStop1} />
                          <ColorPickerInput value={colorStop2} onChange={setColorStop2} />
                          <ColorPickerInput value={colorStop3} onChange={setColorStop3} />
                          <Button variant="outline" className="dark self-start text-white">
                            <Save /> Save
                          </Button>
                        </div>
                      </div>
                      <Separator orientation="vertical" />
                      <div className="flex flex-col gap-2 w-full">
                        <h1 className="text-white text-lg font-semibold">Preview</h1>
                        <Card className="overflow-hidden w-full h-[200px] bg-black p-0 border-1 border-zinc-900 clip-none">
                          <div
                            className="w-full h-[50px] rounded-[20px] blur-[40px]"
                            style={{
                              background: `radial-gradient(circle at top center, ${colorStop1}99 10%, ${colorStop2}66 40%, ${colorStop3}4D 70%)`,
                            }}
                          ></div>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="configurator-theme-wallpaper" className="w-full h-[100%] p-4">
                    <div className="flex flex-row gap-4 w-full h-[100%]">
                      <div className="flex flex-col w-[30%]">
                        <h1 className="text-white text-lg font-semibold">Wallpaper</h1>
                        <span className="text-zinc-400 font-medium text-sm">This wallpaper applies at server-level, not user-level. .mp4 video wallpapers are supported, however, using this may hinder performance when using MYMOD.</span>
                        <br /><br />
                        <div className="flex flex-col gap-1 items-start justify-start mt-2">
                          <h4 className="text-sm text-left w-full font-medium text-zinc-500 pb-1">Link to wallpaper</h4>
                          <Input type="text" value={wallpaper} onChange={(e) => setWallpaper(e.target.value)} placeholder="Paste your link here..." className="dark text-white" />
                          <h4 className="text-sm text-left w-full font-medium text-zinc-500 py-1">Opacity (in deminal value)</h4>
                          <Input type="text" value={overlayPercent} onChange={(e) => setOverlayPercent(e.target.value)} placeholder="Set the opacity of the overlay..." className="dark text-white" />
                          <h4 className="text-xs text-left w-full font-medium text-zinc-500 pb-1">Enter in any value from 0 - 1.</h4>
                          <Button variant="outline" size="icon" className="dark self-end text-white">
                            <Save />
                          </Button>
                        </div>
                      </div>
                      <Separator orientation="vertical" />
                      <div className="flex flex-col gap-2 w-full">
                        <h1 className="text-white text-lg font-semibold">Preview</h1>
                        <Card className={`overflow-hidden w-full h-[400px] bg-black p-0 border border-zinc-900`}>
                          {wallpaper?.endsWith(".mp4") && (
                            <div className="grid w-full h-full">
                              <video
                                className="w-full h-full object-cover col-start-1 row-start-1 z-0"
                                src={wallpaper}
                                autoPlay
                                loop
                                muted
                                playsInline
                              />
                              <div
                                className="w-full h-full col-start-1 row-start-1 z-10"
                                style={{
                                  background: `linear-gradient(to bottom, rgba(0,0,0,${overlayPercent}), rgba(0,0,0,${overlayPercent}))`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center"
                                }}
                              />
                            </div>
                          )}

                          {/* Image background if not video */}
                          {!wallpaper?.endsWith(".mp4") && (
                            <div
                              className="relative inset-0 w-full h-full z-0"
                              style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,${overlayPercent}), rgba(0,0,0,${overlayPercent})), url('${wallpaper}')`,
                                backgroundColor: wallpaper ? undefined : "black",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                              }}
                            />
                          )}
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="configurator-theme-system-font" className="w-full h-[100%] p-4">
                    <div className="flex flex-row gap-4 w-full h-[100%]">
                      <div className="flex flex-col w-[30%]">
                        <h1 className="text-white text-lg font-semibold">System Font</h1>
                        <span className="text-zinc-400 font-medium text-sm">This font applies at server-level, not user-level. Currently, Google Fonts are supported, and you are able to select available fonts from the dropdown.</span>
                        <br />
                        <div className="mt-4 flex flex-row items-center justify-start gap-2">
                          <Select value={selectedFont} onValueChange={(e) => setSelectedFont(e)}>
                            <SelectTrigger className="dark text-white">
                              <SelectValue placeholder="Select a font..." />
                            </SelectTrigger>
                            <SelectContent className="dark text-white">
                              <SelectItem value="font-geist">Geist</SelectItem>
                              <SelectItem value="font-inter">Inter</SelectItem>
                              <SelectItem value="font-roboto">Roboto</SelectItem>
                              <SelectItem value="font-poppins">Poppins</SelectItem>
                              <SelectItem value="font-barlow-semi-condensed">Barlow Semi Condensed</SelectItem>
                              <SelectItem value="font-montserrat">Montserrat</SelectItem>
                              <SelectItem value="font-dm-sans">DM Sans</SelectItem>
                              <SelectItem value="font-hanken-grotesk">Hanken Grotesk</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="icon" className="dark self-end text-white">
                            <Save />
                          </Button>
                        </div>
                      </div>
                      <Separator orientation="vertical" />
                      <div className="flex flex-col gap-2 w-full">
                        <h1 className="text-white text-lg font-semibold">Preview</h1>
                        <Card className={`${selectedFont} overflow-hidden w-full h-[200px] bg-black p-0 border border-zinc-900`}>
                          <div className={`relative w-full h-full flex flex-col justify-center p-2`}>
                            <h1 className="text-3xl font-bold">Heading</h1>
                            <h1 className="text-xl font-semibold">Subheading</h1>
                            <h1 className="text-md font-normal">Paragraph</h1>
                            <h1 className="text-sm font-normal text-zinc-400">Subtext</h1>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </TabsContent>
          </Tabs>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
