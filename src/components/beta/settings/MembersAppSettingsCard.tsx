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

export const MembersAppSettingsCard = ({ currentServerData }: any) => {
    const router = useRouter();
    const [roleAccessAdmin, setRoleAccessAdmin] = useState(
        currentServerData?.data?.mmData.module_config.members !== undefined
            ? currentServerData?.data?.mmData.module_config.members.administrator
            : false
    );
    const [roleAccessMod, setRoleAccessMod] = useState(
        currentServerData?.data?.mmData.module_config.members !== undefined
            ? currentServerData?.data?.mmData.module_config.members.moderator
            : false
    );
    const [roleAccessHelper, setRoleAccessHelper] = useState(
        currentServerData?.data?.mmData.module_config.members !== undefined
            ? currentServerData?.data?.mmData.module_config.members.helper
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
        <Card className="w-full h-[100%] overflow-y-auto bg-black border-zinc-700 p-4">
            <div className="flex flex-col gap-2 items-start w-full text-white">
                <h4 className="text-sm uppercase text-left w-full font-bold text-zinc-500 py-2">Configure access to application</h4>
                <div className="flex flex-row gap-1 items-center justify-between w-full">
                    <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Administrators can access Members</Label>
                    <div className="flex flex-row gap-1 items-center">
                        <Switch name="mymodLogChannel" onCheckedChange={(e) => setRoleAccessAdmin(e)} checked={roleAccessAdmin} className="dark" />
                        <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSetting("members_role_access_administrator", roleAccessAdmin)}>
                            <Save />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row gap-1 items-center justify-between w-full">
                    <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Moderators can access Members</Label>
                    <div className="flex flex-row gap-1 items-center">
                        <Switch name="mymodLogChannel" onCheckedChange={(e) => setRoleAccessMod(e)} checked={roleAccessMod} className="dark" />
                        <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSetting("members_role_access_moderator", roleAccessMod)}>
                            <Save />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row gap-1 items-center justify-between w-full">
                    <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Helpers can access Members</Label>
                    <div className="flex flex-row gap-1 items-center">
                        <Switch name="mymodLogChannel" onCheckedChange={(e) => setRoleAccessHelper(e)} checked={roleAccessHelper} className="dark" />
                        <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSetting("members_role_access_helper", roleAccessHelper)}>
                            <Save />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}