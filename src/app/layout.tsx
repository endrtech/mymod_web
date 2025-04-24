import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NextNProgress from 'nextjs-progressbar';
import LoadingBar from "@/components/LoadingBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";
import LoadingOverlay from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYMOD :: Login",
  description: "Welcome to the future of moderation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.className} antialiased w-full h-screen`}
        >
          <Suspense fallback={<LoadingOverlay />}>
          {children}
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
