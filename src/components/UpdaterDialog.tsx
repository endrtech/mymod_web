"use client"
import { getAppInfo } from "@/app/actions/getAppInfo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Check, CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        }
        getData();
        setHydrated(true)
    }, [])

    if (!hydrated) {
        // this returns null on first render, so the client and server match
        return null
    }

    const updateApp = () => {
        window.localStorage.setItem("app-version", appBuild.version);
        router.refresh();
    }

    if (appBuild !== 400) {
        return (
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" className={`dark ${appBuild.currentBuild > appBuild.previousBuild ? "text-orange-500 hover:text-orange-500" : "text-green-500 hover:text-green-500"}`}>
                                    {
                                        appBuild.currentBuild > appBuild.previousBuild ? (
                                            <CloudUpload />
                                        ) : (
                                            <Check />
                                        )
                                    }
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {
                                appBuild.currentBuild > appBuild.previousBuild && appVersion !== appBuild.version ? (
                                    <div className="flex flex-col items-start gap-2 p-2">
                                        <span className="font-bold text-md">Update {appBuild.version} is ready! Click "Update" to update MYMOD.</span>
                                        <Button onClick={() => updateApp()} variant="outline" className="dark text-white">
                                            <CloudUpload /> Update
                                        </Button>
                                    </div>
                                ) : (
                                    <span className="p-2 font-bold text-md">You're all up to date! Click me for changelogs.</span>
                                )
                            }
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent className="dark text-white">
                    <DialogTitle>Whats new in MYMOD {appBuild.version}</DialogTitle>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {appBuild.changelog}
                    </ReactMarkdown>
                </DialogContent>
            </Dialog >

        )
    } else {
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="dark text-red-500">
                        <CloudUpload />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Unable to fetch latest app build from the server.
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    }
}