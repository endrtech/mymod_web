import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: `MYMOD`,
    description: "Welcome to the futue of moderation.",
};

export default async function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {


    return (
        <ClerkProvider>
            <main className="w-full">{children}</main>
            {modal}
        </ClerkProvider>
    );
}
