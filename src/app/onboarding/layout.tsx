import type { Metadata } from "next";
import "../globals.css";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Welcome to MYMOD",
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

  return children;
}
