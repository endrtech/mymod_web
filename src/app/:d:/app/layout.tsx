import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../globals.css";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getUserGuilds } from "@/app/actions/getUserGuilds";
import getUserNotifications from "@/app/actions/user/getUserNotifications";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppNavigation } from "@/components/AppNavigation";
import { Toaster } from "@/components/ui/sonner";
import { redirect } from "next/navigation";
import { MainSidebarTrigger } from "@/components/MainSidebarTrigger";
import { ApplicationNavBar } from "@/components/application/ApplicationNavBar";

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
  manage: React.ReactNode;
}>) {
  const discordData = await getDiscordUser();
  const guildsData = await getUserGuilds(discordData?.id);
  const notificationsData = await getUserNotifications(discordData?.id);

  if (discordData.message === "401: Unauthorized") {
    return redirect("/connect-discord");
  }

  return (
    <div className={`${montserrat.className} antialiased w-full h-screen`}>
      <ApplicationNavBar notificationsData={notificationsData} />
      <div className="flex flex-col items-start justify-start overflow-hidden">
        {children}
      </div>
      <Toaster className="dark" />
    </div>
  );
}
