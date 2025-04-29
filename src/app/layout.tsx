import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NextNProgress from "nextjs-progressbar";
import { Suspense } from "react";
import LoadingOverlay from "./loading";
import NextTopLoader from "nextjs-toploader";
import { auth } from "@clerk/nextjs/server";
import { permanentRedirect, redirect, RedirectType } from "next/navigation";
import { PostHogProvider } from "../components/PostHogProvider";
import { getDiscordUser } from "./actions/getDiscordUser";
import { montserrat } from "./:d:/app/server/[serverId]/fonts";

export const metadata: Metadata = {
  title: "MYMOD :: Login",
  description: "Welcome to the future of moderation.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await auth();

  if (!user.userId) {
    return redirect(
      `http${process.env.DEV_MODE === "true" ? "" : "s"}://${process.env.NEXT_PUBLIC_ENDR_ID_AUTH_URL}/oauth/authorize?clientId=${process.env.NEXT_PUBLIC_ENDR_ID_APP_ID}`,
    );
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${montserrat.className} antialiased w-full h-screen bg-black`}
        >
          <NextTopLoader color="#29D" height={3} showSpinner={false} />
          <Suspense fallback={<LoadingOverlay />}>
            {children}
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
