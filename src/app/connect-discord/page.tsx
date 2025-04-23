import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/nextjs";
import { Geist } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default async function DiscordApp() {
    const discordData = await getDiscordUser();
    if(discordData?.id) {
        return redirect("/:d:/app")
    }

    return (
        <div className="w-full h-screen bg-black" suppressHydrationWarning={true}>
            <div className="bkg-gradient w-full h-screen"></div>
            <div className="flex flex-col items-left mt-[55px] w-full p-10">
                <div className={`font-semibold text-4xl ${geistSans.className} text-white`}>Uh oh, your Discord account is not connected!</div>
                <p className={`font-medium text-lg ${geistSans.className} text-zinc-500`}>Connect your Discord account by clicking the link below, going to "Connect account", then "Discord".</p>
                <div className="m-2">
                    <img src="/connect-discord-graphic.png" width="40%" alt="Connect your Discord account" className="rounded-lg" />
                </div>
                <Link href="https://intent-bunny-32.accounts.dev/user" target="_blank" className="m-2">
                    <Button variant="outline" className="dark text-white">
                        Go to Accounts Dashboard
                    </Button>
                </Link>
                <p className={`font-medium text-lg ${geistSans.className} text-zinc-500`}>Once your done, hit "Refresh", and you will be taken back to MYMOD.</p>
            </div>
        </div>
    );
}