"use client"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { updateGuildSettings } from "@/app/actions/guilds/updateGuildSettings"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export const OverviewAppSettingsCard = ({ currentServerData }: any) => {
    const router = useRouter();
    const [roleAccessAdmin, setRoleAccessAdmin] = useState(
        currentServerData?.data?.mmData.module_config.overview !== undefined
            ? currentServerData?.data?.mmData.module_config.overview.administrator
            : false
    );
    const [roleAccessMod, setRoleAccessMod] = useState(
        currentServerData?.data?.mmData.module_config.overview !== undefined
            ? currentServerData?.data?.mmData.module_config.overview.moderator
            : false
    );
    const [roleAccessHelper, setRoleAccessHelper] = useState(
        currentServerData?.data?.mmData.module_config.overview !== undefined
            ? currentServerData?.data?.mmData.module_config.overview.helper
            : false
    );

    const updateSetting = async (setting: any, content: any) => {
        const response = await updateGuildSettings(currentServerData?.data?.dsData.id, setting, content);

        if (response === 200) {
            toast.success("Settings updated successfully.");
            router.refresh();
        }
    }

    return (
        <Card className="w-full h-[100%] overflow-y-auto bg-background text-foreground p-4">
            <div className="flex flex-col gap-2 items-start w-full text-white">
                <h4 className="text-sm uppercase text-left w-full font-bold text-foreground py-2">Configure access to application</h4>
                <div className="flex flex-row gap-1 items-center justify-between w-full">
                    <Label htmlFor="mymodLogChannel" className="text-foreground w-[40%]">Administrators can access Overview</Label>
                    <div className="flex flex-row gap-1 items-center">
                        <Switch name="mymodLogChannel" onCheckedChange={(e) => setRoleAccessAdmin(e)} checked={roleAccessAdmin} />
                        <Button variant="outline" size="icon" className="text-foreground" onClick={() => updateSetting("overview_role_access_administrator", roleAccessAdmin)}>
                            <Save />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row gap-1 items-center justify-between w-full">
                    <Label htmlFor="mymodLogChannel" className="text-foreground w-[40%]">Moderators can access Overview</Label>
                    <div className="flex flex-row gap-1 items-center">
                        <Switch name="mymodLogChannel" onCheckedChange={(e) => setRoleAccessMod(e)} checked={roleAccessMod} />
                        <Button variant="outline" size="icon" className="text-foreground" onClick={() => updateSetting("overview_role_access_moderator", roleAccessMod)}>
                            <Save />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row gap-1 items-center justify-between w-full">
                    <Label htmlFor="mymodLogChannel" className="text-foreground w-[40%]">Helpers can access Overview</Label>
                    <div className="flex flex-row gap-1 items-center">
                        <Switch name="mymodLogChannel" onCheckedChange={(e) => setRoleAccessHelper(e)} checked={roleAccessHelper} />
                        <Button variant="outline" size="icon" className="text-foreground" onClick={() => updateSetting("overview_role_access_helper", roleAccessHelper)}>
                            <Save />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}