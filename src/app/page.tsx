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

export default async function Main() {
  const user = await auth();

  if (user.userId) {
    return redirect("/:d:/app");
  }

  return <></>;
}
