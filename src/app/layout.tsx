import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NextNProgress from 'nextjs-progressbar';
import LoadingBar from "@/components/LoadingBar";

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
          className={`${geistSans.className} ${geistMono.className} antialiased w-full h-screen`}
        >
          <LoadingBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
