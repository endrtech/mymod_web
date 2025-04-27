import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

import { geistSans, roboto, poppins, barlowSemiCondensed, inter, hankenGrotesk } from "../server/[serverId]/fonts";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
    title: `MYMOD`,
    description: "Welcome to the futue of moderation.",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    params: Promise<{ serverId: string }>,
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <div
                className={`${geistSans.className} antialiased bg-zinc-900 w-full max-h-screen dark`}
                suppressHydrationWarning={true}
            >
                <SidebarProvider
                    style={
                        {
                            "--sidebar-width": "calc(var(--spacing) * 62)",
                            "--header-height": "calc(var(--spacing) * 12)",
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar variant="inset" className="ml-[60px]" />
                    <SidebarInset className="h-[98vh] overflow-hidden flex flex-col">
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </ClerkProvider>
    );
}