import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import LoadingOverlay from "../components/beta/loading";
import NextTopLoader from "nextjs-toploader";
import { PostHogProvider } from "../components/PostHogProvider";
import { montserrat } from "./portal/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import MYMODProvider from "@/context/mymod-provider";

export const metadata: Metadata = {
  title: "MYMOD",
  description: "Welcome to the future of moderation.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
      <MYMODProvider>
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
            <body
                className={`${montserrat.className} antialiased w-full h-screen bg-background`}
            >
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
            >
              <PostHogProvider>
                <NextTopLoader color="#29D" height={3} showSpinner={false}/>
                <Suspense fallback={<LoadingOverlay />}>
                    {children}
                </Suspense>
              </PostHogProvider>
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
      </MYMODProvider>
  );
}
