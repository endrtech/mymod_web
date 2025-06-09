"use client";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { updateGuildSettings } from "@/app/actions/guilds/updateGuildSettings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPickerInput } from "@/components/ColorPickerInput";
import { ThemeGalleryMain } from "@/components/theme_gallery/ThemeGalleryMain";
import { getThemes } from "@/app/actions/getThemes";
import { ThemeGalleryDrawer } from "@/components/theme_gallery/ThemeGalleryDrawer";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

export const BetaAppearanceSettingsCard = ({ currentServerData }: any) => {
  const router = useRouter();
  const [themes, setThemes] = useState<any>();
  const [colorStop1, setColorStop1] = useState(
    currentServerData?.data.mmData.module_config.appearance?.gradient.color_1 ||
      "#00BFFF",
  );
  const [colorStop2, setColorStop2] = useState(
    currentServerData?.data.mmData.module_config.appearance?.gradient.color_2 ||
      "#8A2BE6",
  );
  const [colorStop3, setColorStop3] = useState(
    currentServerData?.data.mmData.module_config.appearance?.gradient.color_3 ||
      "#FF0080",
  );
  const [wallpaper, setWallpaper] = useState(
    currentServerData?.data.mmData.module_config.appearance?.background || "",
  );
  const [overlayPercent, setOverlayPercent] = useState(
    currentServerData?.data.mmData.module_config.appearance?.overlay_percent ||
      "0.6",
  );
  const [selectedFont, setSelectedFont] = useState(
    currentServerData?.data.mmData.module_config.appearance?.font ||
      "font-geist",
  );

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const themes = await getThemes();
      setThemes(themes);
    };

    getData();
  }, []);

  const currentlySelectedPreset =
    currentServerData?.data.mmData.module_config.appearance?.theme_id !==
    "custom"
      ? themes?.data?.find(
          (t) =>
            t.id ===
            currentServerData?.data.mmData.module_config.appearance?.theme_id,
        )
      : {
          background:
            currentServerData?.data.mmData.module_config.appearance?.background,
          font: currentServerData?.data.mmData.module_config.appearance?.font,
          name: "Your Theme",
          description: "Your very own custom theme!",
          color_1:
            currentServerData?.data.mmData.module_config.appearance?.color_1,
          color_2:
            currentServerData?.data.mmData.module_config.appearance?.color_2,
          color_3:
            currentServerData?.data.mmData.module_config.appearance?.color_3,
          overlayPercent:
            currentServerData?.data.mmData.module_config.appearance
              ?.overlayPercent || "0.9",
        };

  const bg =
    currentServerData?.data.mmData.module_config.appearance?.background;
  const isVideo = bg?.endsWith(".mp4");

  const updateGradient = async () => {
    const response = await updateGuildSettings(
      currentServerData?.data.dsData.id,
      "appearance_mymod_gradient",
      {
        color_1: colorStop1,
        color_2: colorStop2,
        color_3: colorStop3,
      },
    );

    if (response === 200) {
      toast.success("Setting successfully updated.");
      router.refresh();
    }
  };

  const updateWallpaper = async () => {
    const response = await updateGuildSettings(
      currentServerData?.data.dsData.id,
      "appearance_wallpaper",
      wallpaper,
    );

    if (response === 200) {
      toast.success("Setting successfully updated.");
      router.refresh();
    }
  };

  const updateFont = async () => {
    const response = await updateGuildSettings(
      currentServerData?.data.dsData.id,
      "appearance_font",
      wallpaper,
    );

    if (response === 200) {
      toast.success("Setting successfully updated.");
      router.refresh();
    }
  };

  return (
    <Card
      className={`w-full h-[100%] overflow-y-auto bg-background p-4`}
    >
      <div className="flex flex-col gap-2 items-start w-full text-white">
        <h4 className="text-xl text-left w-full font-bold text-foreground">
          Change how MYMOD looks
        </h4>
        <h4 className="text-sm text-left w-full font-medium text-muted-foreground">
          All settings changed here affect <b>every member</b> that has access
          to your server&apos;s Dashboard. Want to change it up? Use the Theme Gallery on the right.
        </h4>
        <br />
        <h4 className="text-xl text-left w-full font-bold text-foreground">
          Currently selected preset
        </h4>
        <Card
            className="overflow-hidden w-full h-[200px] p-0"
        >
          <div className="overflow-hidden relative w-full h-full">
            {/* Video background if .mp4 */}
            {currentlySelectedPreset?.background.endsWith(".mp4") && (
                <>
                  <video
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      src={currentlySelectedPreset?.background}
                      autoPlay
                      loop
                      muted
                      playsInline
                  />
                </>
            )}

            {/* Image background if not video */}
            {!currentlySelectedPreset?.background.endsWith(".mp4") && (
                <div
                    className="absolute inset-0 w-full h-full z-0"
                    style={{
                      backgroundImage: `url('${currentlySelectedPreset?.background}')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                />
            )}

            {/* Gradient Overlay */}
            <div
                className="absolute overflow-hidden top-0 left-0 w-full h-[50px] rounded-[20px] blur-[20px] z-[10]"
                style={{
                  background: `radial-gradient(circle at top center, ${currentlySelectedPreset?.color_1}99 10%, ${currentlySelectedPreset?.color_2}66 40%, ${currentlySelectedPreset?.color_3}4D 70%)`,
                }}
            />

            {/* Content Overlay */}
            <div className="bg-gradient-to-b from-transparent to-background/90 absolute inset-0 z-[40] self-end flex flex-col items-start justify-end p-4 text-foreground">
              <p className="text-lg font-semibold">
                {currentlySelectedPreset?.name}
              </p>
              <p className="text-sm font-normal truncate w-full overflow-hidden">
                {currentlySelectedPreset?.description}
              </p>
            </div>
          </div>
        </Card>
        <br />
        <h4 className="text-xl text-left w-full font-bold text-foreground">
          Gradient Colors
        </h4>
        <h4 className="text-sm text-left w-full font-medium text-muted-foreground py-2">
          This setting changes the colors of the gradients you see in your
          Dashboard.
        </h4>
        <h4 className="text-xs text-left uppercase w-full font-medium text-foreground py-2">
          Preview
        </h4>
        <div className="flex flex-col md:flex-row gap-1 items-start justify-between w-full">
          <Card className="overflow-hidden w-full h-[200px] bg-background p-0 clip-none">
            <div
              className="w-full h-[50px] rounded-[20px] blur-[40px]"
              style={{
                background: `radial-gradient(circle at top center, ${colorStop1}99 10%, ${colorStop2}66 40%, ${colorStop3}4D 70%)`,
              }}
            ></div>
          </Card>
          <span className="flex-grow" />
          <div className="flex flex-col w-full md:w-[200px] items-start gap-1">
            <ColorPickerInput value={colorStop1} onChange={setColorStop1} />
            <ColorPickerInput value={colorStop2} onChange={setColorStop2} />
            <ColorPickerInput value={colorStop3} onChange={setColorStop3} />
            <Button
              onClick={updateGradient}
              variant="outline"
              size="icon"
              className="self-end text-foreground"
            >
              <Save />
            </Button>
          </div>
        </div>
        <br />
        <h4 className="text-xl text-left w-full font-bold text-foreground">
          Wallpaper
        </h4>
        <h4 className="text-sm text-left w-full font-medium text-muted-foreground py-2">
          This setting changes the wallpaper of your Dashboard. The wallpaper
          must be hosted somewhere where a link can be obtained. Video
          wallpapers (.mp4) are supported! Please note: Using video wallpapers
          may hinder performance.
        </h4>
        <h4 className="text-xs text-left uppercase w-full font-medium text-zinc-500 py-2">
          Preview
        </h4>
        <div className="flex flex-col md:flex-row gap-2 items-start justify-between w-full">
          <Card
            className={`overflow-hidden w-full h-[200px] md:h-[400px] bg-black p-0 border border-zinc-900`}
          >
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
                    backgroundPosition: "center",
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
                  backgroundPosition: "center",
                }}
              />
            )}
          </Card>
          <div className="flex flex-col gap-1 w-full md:w-[200px] items-start justify-start">
            <h4 className="text-sm text-left w-full font-medium text-muted-foreground pb-1">
              Link to wallpaper
            </h4>
            <Input
              type="text"
              value={wallpaper}
              onChange={(e) => setWallpaper(e.target.value)}
              placeholder="Paste your link here..."
              className="text-foreground"
            />
            <h4 className="text-sm text-left w-full font-medium text-muted-foreground py-1">
              Opacity (in deminal value)
            </h4>
            <Input
              type="text"
              value={overlayPercent}
              onChange={(e) => setOverlayPercent(e.target.value)}
              placeholder="Set the opacity of the overlay..."
              className="dark text-white"
            />
            <h4 className="text-xs text-left w-full font-medium text-zinc-500 pb-1">
              Enter in any value from 0 - 1.
            </h4>
            <Button
              onClick={updateWallpaper}
              variant="outline"
              size="icon"
              className="dark self-end text-white"
            >
              <Save />
            </Button>
          </div>
        </div>
        <br />
        <h4 className="text-xl text-left w-full font-bold text-zinc-300">
          System Font
        </h4>
        <h4 className="text-sm text-left w-full font-medium text-zinc-500 py-2">
          This settings changes the system font applied to your Dashboard.
        </h4>
        <div className="flex flex-row items-center justify-start gap-2">
          <Select
            value={selectedFont}
            onValueChange={(e) => setSelectedFont(e)}
          >
            <SelectTrigger className="text-foreground w-[400px]">
              <SelectValue placeholder="Select a font..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="font-geist">Geist</SelectItem>
              <SelectItem value="font-inter">Inter</SelectItem>
              <SelectItem value="font-roboto">Roboto</SelectItem>
              <SelectItem value="font-poppins">Poppins</SelectItem>
              <SelectItem value="font-barlow-semi-condensed">
                Barlow Semi Condensed
              </SelectItem>
              <SelectItem value="font-montserrat">Montserrat</SelectItem>
              <SelectItem value="font-dm-sans">DM Sans</SelectItem>
              <SelectItem value="font-hanken-grotesk">
                Hanken Grotesk
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={updateFont}
            variant="outline"
            size="icon"
            className="dark self-end text-white"
          >
            <Save />
          </Button>
        </div>
      </div>
    </Card>
  );
};
