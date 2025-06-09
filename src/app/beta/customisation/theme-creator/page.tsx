"use client"

import { Button } from "@/components/ui/button";
import { Plus, Cog, Home, Box, Package, Save, CircleFadingArrowUp, ChevronRight, Paintbrush, Code, Loader2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ColorPickerInput } from "@/components/ColorPickerInput";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createTheme } from "@/app/actions/theme_gallery/createTheme";
import { submitThemeForReview } from "@/app/actions/theme_gallery/submitThemeForReview";
import { toast } from "sonner";
import { editTheme } from "@/app/actions/theme_gallery/editTheme";
import { getTheme } from "@/app/actions/theme_gallery/getTheme";
import { useQuery } from "@tanstack/react-query";
import { getDiscordData } from "@/queries/users";
import { getUserThemes } from "@/app/actions/theme_gallery/getUserThemes";

export default function ThemeCreator() {
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
  const [themeStatus, setThemeStatus] = useState("");

  const { data: discordData, isLoading: isDiscordLoading } = useQuery(getDiscordData());
  const { data: createdThemes, isLoading: isThemesLoading } = useQuery({
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

  const createThemeFn = async () => {
    try {
      const response = await createTheme();
      if (response) {
        setThemeId(response);
        toast.success("Created a new project. Head to Project Settings to setup your project.");
      }
    } catch (error) {
      console.error('Error creating theme:', error);
      toast.error("Failed to create theme. Please try again.");
    }
  }

  const loadThemeFn = async (themeId: any) => {
    try {
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
    } catch (error) {
      console.error('Error loading theme:', error);
      toast.error("Failed to load theme. Please try again.");
    }
  }

  const submitThemeForReviewFn = async () => {
    try {
      const response = await submitThemeForReview(
        themeId,
        discordData?.id,
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
    } catch (error) {
      console.error('Error submitting theme:', error);
      toast.error("Failed to submit theme. Please try again.");
    }
  }

  const saveDraft = async () => {
    try {
      const response = await editTheme(
        themeId,
        discordData?.id, {
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
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error("Failed to save changes. Please try again.");
    }
  }

  return (
    <div className="bg-background flex flex-col items-start justify-start w-[70vw] h-screen">
      <Tabs
        className="flex flex-row w-full h-full"
        defaultValue="home"
      >
        <div className="w-1/5 h-full border-r-1 px-2">
          <TabsList defaultValue="home" className="bg-transparent flex flex-col w-full h-full rounded-none justify-start items-start">
            <span className="text-muted-foreground text-left text-sm uppercase font-semibold py-2">Main Menu</span>
            <TabsTrigger value="home" className="w-full rounded-none flex flex-row items-center justify-start max-h-8"><Home /> Home</TabsTrigger>
            {
              themeId && (
                <>
                  <span className="text-muted-foreground text-left text-sm uppercase font-semibold py-2">Current Project</span>
                  <TabsTrigger value="configuration" className="w-full rounded-none flex flex-row items-center justify-start max-h-8"><Cog /> Configuration</TabsTrigger>
                  <TabsTrigger value="editor" className="w-full rounded-none flex flex-row items-center justify-start max-h-8"><Code /> Editor</TabsTrigger>
                </>
              )
            }
          </TabsList>
        </div>
        <div className="w-[65%] h-full bg-background">
          <TabsContent value="home" className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-start justify-center w-full">
              <Avatar className="w-20 h-20 rounded-full">
                <AvatarImage src="/mymod_emblem.svg" alt="MYMOD" />
              </Avatar>
              <span className="text-white font-semibold text-xl">
                Welcome to MYMOD Theme Creator!
              </span>
            </div>
            <Button onClick={() => createThemeFn()} variant="outline" className="mt-2 w-full flex flex-row items-center justify-between">
              <span className="flex flex-row items-center gap-2">
                <Plus />
                <span>Create new project</span>
              </span>
              <ChevronRight />
            </Button>
            <span className="my-2" />
            <div className="relative w-full text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                or select a theme below:
              </span>
            </div>
            {
              createdThemes?.data?.length > 0 && createdThemes?.data?.map((theme: any) => (
                <Button key={theme.id} onClick={() => loadThemeFn(theme.id)} variant="outline" className="mt-2 w-full flex flex-row items-center justify-between">
                  <span className="flex flex-row items-center gap-2">
                    <Paintbrush />
                    <span>{theme.name}</span>
                  </span>
                  <ChevronRight />
                </Button>
              ))
            }
          </TabsContent>
          <TabsContent
            value="configuration"
            className="text-white w-full h-[100%] flex flex-col justify-start items-start"
          >
            <div className="border-b-1 w-full p-2 text-zinc-300 text-sm font-semibold">
              Configure {themeName}
            </div>
            <div className="bg-background flex flex-col gap-4 w-full h-[100%] p-8">
              <div className="flex flex-row w-full gap-4 items-start justify-start">
                <div className="flex flex-col items-start gap-4 w-full">
                  <h1 className="text-white text-lg font-semibold">What should we call your theme?</h1>
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
                      setThemeName(value);
                    }} />
                  </div>
                  <div className="flex w-full flex-col items-start gap-1 justify-start">
                    <Label>Theme description</Label>
                    <Textarea className="w-full" value={themeDescription} onChange={(e) => {
                      const { value } = e.target;
                      setThemeDescription(value);
                    }} />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex flex-row w-full gap-4 items-start justify-start">
                <div className="flex flex-col items-start gap-4 w-full">
                  <h1 className="text-white text-lg font-semibold">Customize your theme</h1>
                  <div className="flex w-full flex-col items-start gap-1 justify-start">
                    <Label>Gradient colors</Label>
                    <div className="flex flex-row items-center gap-2">
                      <ColorPickerInput value={colorStop1} onChange={setColorStop1} />
                      <ColorPickerInput value={colorStop2} onChange={setColorStop2} />
                      <ColorPickerInput value={colorStop3} onChange={setColorStop3} />
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-start gap-1 justify-start">
                    <Label>Background</Label>
                    <Input className="w-full" value={wallpaper} onChange={(e) => {
                      const { value } = e.target;
                      setWallpaper(value);
                    }} />
                  </div>
                  <div className="flex w-full flex-col items-start gap-1 justify-start">
                    <Label>Overlay opacity</Label>
                    <Input className="w-full" type="number" min="0" max="1" step="0.1" value={overlayPercent} onChange={(e) => {
                      const { value } = e.target;
                      setOverlayPercent(value);
                    }} />
                  </div>
                  <div className="flex w-full flex-col items-start gap-1 justify-start">
                    <Label>Font</Label>
                    <Select value={selectedFont} onValueChange={setSelectedFont}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="font-geist">Geist</SelectItem>
                        <SelectItem value="font-inter">Inter</SelectItem>
                        <SelectItem value="font-roboto">Roboto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-end gap-2">
                <Button onClick={() => saveDraft()} variant="outline">
                  Save changes
                </Button>
                <Button onClick={() => submitThemeForReviewFn()} variant="default">
                  Submit for review
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}