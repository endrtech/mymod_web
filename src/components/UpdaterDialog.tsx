"use client";
import { getAppInfo } from "@/app/actions/getAppInfo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Check, CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export const UpdaterDialog = () => {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [appBuild, setAppBuild] = useState<any>({});
  const [appVersion, setAppVersion] = useState("");
  useEffect(() => {
    const getData = async () => {
      const appBuild = await getAppInfo();
      if (appBuild.version !== null) {
        setAppBuild(appBuild);
      }

      const appVersion = window.localStorage.getItem("app-version");
      if (!appVersion) {
        window.localStorage.setItem("app-version", appBuild.version);
        const appVersion = window.localStorage.getItem("app-version");
        setAppVersion(appVersion as string);
      }
      setAppVersion(appVersion as string);
    };
    getData();
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // this returns null on first render, so the client and server match
    return null;
  }

  const updateApp = () => {
    window.localStorage.setItem("app-version", appBuild.version);
    window.location.reload();
  };

  if (appBuild !== 400) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`dark ${appBuild.currentBuild > appBuild.previousBuild && appVersion !== appBuild.version ? "text-orange-500 hover:text-orange-500" : "text-green-500 hover:text-green-500"}`}
          >
            {appBuild.currentBuild > appBuild.previousBuild &&
            appVersion !== appBuild.version ? (
              <CloudUpload />
            ) : (
              <Check />
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="dark text-white p-4">
          <DrawerTitle className="mt-4 mb-4">
            Whats new in MYMOD {appBuild.version}
          </DrawerTitle>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {appBuild.changelog}
          </ReactMarkdown>
          <DrawerFooter className="flex flex-row items-center justify-end">
            <Button
              onClick={() => updateApp()}
              variant="outline"
              className="dark text-white"
            >
              <CloudUpload /> Update
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="dark text-red-500">
          <CloudUpload />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full p-4">
        Unable to fetch latest app build from the server.
      </DrawerContent>
    </Drawer>;
  }
};
