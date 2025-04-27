import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "../../globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Head from "next/head";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getUser } from "@/app/actions/getUser";
import { getUserGuilds } from "@/app/actions/getUserGuilds";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Bell,
  BellDot,
  Check,
  CloudUpload,
  RefreshCw,
  UserCog,
} from "lucide-react";
import { redirect } from "next/navigation";
import getUserNotifications from "@/app/actions/user/getUserNotifications";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DataTable } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { revalidatePath } from "next/cache";
import { RefreshApplicationNav } from "@/components/RefreshApplicationNav";
import { Toaster } from "@/components/ui/sonner";
import { NotificationDialog } from "@/components/dialog/NotificationDialog";
import { getAppInfo } from "@/app/actions/getAppInfo";
import { UpdaterDialog } from "@/components/UpdaterDialog";
import { auth, currentUser } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYMOD :: Home",
  description: "Welcome to the futue of moderation.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const discordData = await getDiscordUser();
  const userData = await getUser(discordData?.id);
  const loggedInUser = await currentUser();

  if (userData === 404) {
    return redirect("/connect-discord");
  }
  const guildsData = await getUserGuilds(discordData?.id);
  const notificationsData = await getUserNotifications(discordData?.id);

  return (
    <ClerkProvider>
      <div className={`${montserrat.className} antialiased w-full h-screen`}>
        <div className="flex flex-row items-left justify-left w-full h-screen">
          <div className="h-screen z-[20] w-[4%] border-r-1 border-zinc-800 bg-black flex flex-col items-center py-4 gap-6">
            {/* Application Navigation Items */}
            <Link href={"/:d:/app"} className="flex flex-row justify-center">
              <Image
                src="/mymod_emblem.svg"
                width={30}
                height={30}
                alt="MYMOD"
              />
            </Link>
            <div className="flex z-[20] flex-col items-center w-full gap-4 h-[100%] overflow-y-auto pt-6 -mt-6">
              {guildsData?.length > 0 &&
                guildsData?.map((guild: any) => (
                  <Link key={guild.id} href={`/:d:/app/server/${guild.id}`}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="relative w-[40px] h-[50px]">
                            <div
                              className="absolute inset-0 rounded-full blur-xl opacity-50"
                              style={{
                                backgroundImage: `url(https://cdn.discordapp.com/icons/${guild.id}/${guild.icon})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "blur(16px)",
                                zIndex: 0,
                              }}
                            />
                            <Image
                              src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
                              alt={guild.name}
                              width={40}
                              height={50}
                              className="relative z-10 rounded-full shadow-xl"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="z-[99] border-1 border-black shadow-xl"
                        >
                          <div className="flex flex-col text-left justify-center">
                            <h3 className="font-bold text-ellipsis max-w-lg overflow-hidden">
                              {guild.name}
                            </h3>
                            <p className="text-sm">Guild ID: {guild.id}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                ))}
            </div>
            <div className="flex-grow">&nbsp;</div>
            <UpdaterDialog />
            {loggedInUser?.publicMetadata.isStaff === true && (
              <Button
                variant="outline"
                size="icon"
                className="dark text-white"
                asChild
              >
                <Link href={"/:d:/app/manage"}>
                  <UserCog />
                </Link>
              </Button>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <RefreshApplicationNav />
                </TooltipTrigger>
                <TooltipContent>Refresh application navigation</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <NotificationDialog notificationsData={notificationsData} />
            <UserButton appearance={{ baseTheme: dark }} />
          </div>
          <div className="w-[100%]">{children}</div>
        </div>
        <Toaster className="dark" />
      </div>
    </ClerkProvider>
  );
}
