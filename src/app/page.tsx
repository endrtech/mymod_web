import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import LoadingOverlay from "./loading";
import NextTopLoader from "nextjs-toploader";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PostHogProvider } from "../components/PostHogProvider";
import { montserrat } from "./:d:/app/server/[serverId]/fonts";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LoginForm } from "@/components/beta/login-form";

export default async function Main() {
  const user = await auth();

  if (user.userId) {
    return redirect("/:d:/app");
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Avatar
              className="size-4"
            >
              <AvatarImage
                src={"/mymod_emblem.svg"}
                alt="MYMOD"
              />
            </Avatar>
          </div>
          Acme Inc.
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
