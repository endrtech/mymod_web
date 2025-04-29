import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

import {
  geistSans,
  roboto,
  poppins,
  barlowSemiCondensed,
  inter,
  hankenGrotesk,
} from "../server/[serverId]/fonts";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: `MYMOD`,
  description: "Welcome to the futue of moderation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div
        className={`${geistSans.className} antialiased bg-zinc-900 w-full h-screen dark`}
        suppressHydrationWarning={true}
      >
        <SidebarInset className="h-[100%] overflow-hidden flex flex-col">
          {children}
        </SidebarInset>
      </div>
    </ClerkProvider>
  );
}
