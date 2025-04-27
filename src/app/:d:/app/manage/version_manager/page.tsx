"use client";
import { getAppInfo } from "@/app/actions/getAppInfo";
import { setAppInfo } from "@/app/actions/setAppInfo";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { FileWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ThemeGalleryReviewQueue() {
  const router = useRouter();
  const currentUserData = useUser();
  const [appVersion, setAppVersion] = useState("");
  const [appPrevBuild, setAppPrevBuild] = useState("");
  const [appCurrBuild, setAppCurrBuild] = useState("");
  const [appChangelog, setAppChangelog] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await getAppInfo();
      setAppVersion(response.version);
      setAppPrevBuild(response.previousBuild);
      setAppCurrBuild(response.currentBuild);
      setAppChangelog(response.changelog);
    };
    getData();
  }, []);

  const updateAppInfo = async () => {
    const response = await setAppInfo({
      version: appVersion,
      previousBuild: appPrevBuild,
      currentBuild: appCurrBuild,
      changelog: appChangelog,
    });

    if (response === 200) {
      toast.success("App information successfully updated.");
      router.refresh();
    }
  };

  if (currentUserData.user?.publicMetadata.isDeveloper === true) {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden">
        <SiteHeader />
        <div className="mt-4 flex flex-1 flex-col overflow-hidden w-full">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full px-4 pb-4 md:px-6 md:pb-6 gap-4 md:gap-6 @container/main">
            <div className="flex flex-col gap-1 items-start justify-start">
              <h1 className="text-white text-2xl font-bold">Version Manager</h1>
              <h1 className="text-zinc-400 text-md font-semibold">
                DEVELOPER ONLY. Use this screen to manage the global version and
                build information for MYMOD deployments.
              </h1>
            </div>
            <Label className="dark text-white">Version number</Label>
            <Input
              type="text"
              value={appVersion}
              onChange={(e) => setAppVersion(e.target.value)}
              className="dark text-white"
            />
            <Label className="dark text-white">Previous build number</Label>
            <Input
              type="text"
              value={appPrevBuild}
              onChange={(e) => setAppPrevBuild(e.target.value)}
              className="dark text-white"
            />
            <Label className="dark text-white">Current build number</Label>
            <Input
              type="text"
              value={appCurrBuild}
              onChange={(e) => setAppCurrBuild(e.target.value)}
              className="dark text-white"
            />
            <Label className="dark text-white">Changelog</Label>
            <Textarea
              rows={10}
              value={appChangelog}
              onChange={(e) => setAppChangelog(e.target.value)}
              className="dark text-white"
            />
            <Button
              onClick={() => updateAppInfo()}
              variant="outline"
              className="text-white dark"
            >
              Update version information
            </Button>
          </div>
        </div>
        <Toaster className="dark" />
      </div>
    );
  } else {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden">
        <SiteHeader />
        <div className="mt-4 flex flex-1 flex-col overflow-hidden w-full">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full px-4 pb-4 md:px-6 md:pb-6 gap-4 md:gap-6 @container/main">
            <div className="flex flex-col gap-1 items-start justify-start">
              <h1 className="text-white text-2xl font-bold">Version Manager</h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileWarning className="h-4 w-4" />
                You do not have access to this application.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
