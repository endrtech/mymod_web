"use client"
import { Save, Sparkles } from "lucide-react"
import { Card } from "../ui/card"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { updateGuildSettings } from "@/app/actions/guilds/updateGuildSettings"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const AISettingsCard = ({ currentServerData }: any) => {
    const router = useRouter();
    const [setting, setSetting] = useState<boolean>(currentServerData?.data?.mmData.module_config.mymod_intelligence.enabled);
    const modifySetting = async () => {
        console.log(setting);
        const response = await updateGuildSettings(currentServerData?.data?.dsData.id, "ai_settings", setting);
        if (response === 200) {
            toast.success("Updated setting successfully.")
            router.refresh();
        }
    }

    return (
        <Card className="w-full h-[100%] overflow-y-auto bg-black border-zinc-700 p-4">
            <div className="flex flex-col h-full w-full items-center justify-center">
                <div className="relative w-12 h-12 m-8">
                    {/* Glow behind icon */}
                    <div className="absolute inset-0 rounded-full blur-lg opacity-90 animate-pulse"
                        style={{
                            background: "linear-gradient(135deg, #0090F7, #BA62FC, #F2416B, #F55600)"
                        }} />

                    {/* Icon on top */}
                    <Sparkles className="relative w-12 h-12 text-white z-10 drop-shadow-lg" />
                </div>
                <h4 className="text-xl text-center w-full font-bold text-zinc-300">MYMOD Intelligence</h4>
                <h4 className="text-sm text-center w-full font-medium text-zinc-500 p-2">An all new, personal intelligence system from ENDR, designed to make your work on MYMOD easier.</h4>
                <br />
                <div className="flex flex-row justify-center items-center gap-6 w-[70%]">
                    <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Enable MYMOD Intelligence</Label>
                    <Switch checked={setting} onCheckedChange={(value) => {
                        console.log("Switch toggled to:", value); // <-- for debugging
                        setSetting(value);
                    }} className="dark" />
                    <Button variant="outline" size="icon" className="dark text-white" onClick={() => modifySetting()}>
                        <Save />
                    </Button>
                </div>
            </div>
        </Card>
    )
}