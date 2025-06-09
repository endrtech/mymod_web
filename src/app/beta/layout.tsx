import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "@/app/globals.css";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getUserGuilds } from "@/app/actions/getUserGuilds";
import { Toaster } from "@/components/ui/sonner";
import { permanentRedirect, redirect } from "next/navigation";
import { SiteHeader } from "@/components/beta/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LeftSidebar } from "@/components/beta/left-sidebar";
import { RightSidebar } from "@/components/beta/right-sidebar";
import { WallpaperProvider } from "@/components/beta/wallpaper-provider";
import { auth } from "@clerk/nextjs/server";
import {ServerProvider} from "@/context/server-provider";
import {Suspense} from "react";
import LoadingOverlay from "@/components/beta/loading";
import {getQueryClient} from "@/lib/query-client";
import {getServers} from "@/queries/servers";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {getAllThemes} from "@/queries/themegallery";
import { ErrorBoundary } from "react-error-boundary";

const workSans = Work_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYMOD Beta - Home",
  description: "Welcome to the future of moderation.",
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

  if (!discordData?.id && (guildsData === 500 || guildsData?.length === 0)) {
    permanentRedirect("/onboarding");
  }

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(getServers),
    queryClient.prefetchQuery(getAllThemes())
  ]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try refreshing the page.</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ServerProvider>
          <div
              className={`${workSans.className} flex flex-col h-screen w-full [--header-height:calc(--spacing(10))] overflow-hidden`}>
            <SiteHeader/>
            <div className="flex flex-row w-full h-full relative">
              <SidebarProvider>
                <div className="flex flex-row w-full h-full">
                  <LeftSidebar/>
                  <WallpaperProvider>
                    <div className="min-w-full flex flex-row items-center">
                      <Suspense fallback={<LoadingOverlay />}>
                        {children}
                      </Suspense>
                    </div>
                  </WallpaperProvider>
                  <RightSidebar/>
                </div>
              </SidebarProvider>
            </div>
          </div>
          <Toaster className="z-[50]" />
        </ServerProvider>
      </HydrationBoundary>
    </ErrorBoundary>
  );
}
