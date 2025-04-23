import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { Geist } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default async function DiscordApp() {
    const discordData = await getDiscordUser();

    return (
        <div className="bg-zinc-900 w-full h-screen"></div>
    );
}