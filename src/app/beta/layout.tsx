import type { Metadata } from "next";
import { Montserrat, Work_Sans } from "next/font/google";
import "@/app/globals.css";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getUserGuilds } from "@/app/actions/getUserGuilds";
import getUserNotifications from "@/app/actions/user/getUserNotifications";
import { Toaster } from "@/components/ui/sonner";
import { permanentRedirect, redirect } from "next/navigation";
import { SiteHeader } from "@/components/beta/site-header";
import { cookies } from "next/headers";
import { Sidebar, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Command } from "lucide-react";
import { LeftSidebar } from "@/components/beta/left-sidebar";
import { RightSidebar } from "@/components/beta/right-sidebar";
import { WallpaperProvider } from "@/components/beta/wallpaper-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYMOD Beta - Home",
  description: "Welcome to the futue of moderation.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  if (!user.userId) {
    return redirect(
      "/",
    );
  }
  
  const discordData = await getDiscordUser();
  const guildsData = (await getUserGuilds(discordData?.id)) || 400;
  const notificationsData = await getUserNotifications(discordData?.id);

  if (!discordData?.id && (guildsData === 500 || guildsData?.length === 0)) {
    permanentRedirect("/onboarding");
  }

  return (
      <div className={`${workSans.className} flex flex-col h-screen w-full [--header-height:calc(--spacing(10))] overflow-hidden`}>
        <SiteHeader />
        <div className="flex flex-row w-full h-full relative">
          <SidebarProvider>
            <div className="flex flex-row w-full h-full">
              <LeftSidebar />
              <WallpaperProvider>
                <div className="min-w-full flex flex-row items-center mt-16">
                  {children}
                </div>
              </WallpaperProvider>
              <RightSidebar />
            </div>
          </SidebarProvider>
        </div>
        <Toaster />
      </div>
  );
}
