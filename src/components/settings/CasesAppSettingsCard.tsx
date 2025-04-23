"use client"
import { Save } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { useState } from "react"
import { updateGuildSettings } from "@/app/actions/guilds/updateGuildSettings"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"

export const CasesAppSettingsCard = ({ currentServerData }: any) => {
    const router = useRouter();
    const [caseLogChannel, setCaseLogChannel] = useState(
        currentServerData?.data?.mmData.module_config.mymod_cases !== undefined
            ? currentServerData?.data?.mmData.module_config.mymod_cases.case_log_channel
            : ""
    );
    const [caseUsrDmEmbedColor, setCaseUsrDmEmbedColor] = useState(
        currentServerData?.data?.mmData.module_config.mymod_cases !== undefined
            ? currentServerData?.data?.mmData.module_config.mymod_cases.user_dm_embed_color
            : 0
    );
    const [caseUsrDmEmbedDescription, setCaseUsrDmEmbedDescription] = useState(
        currentServerData?.data?.mmData.module_config.mymod_cases !== undefined
            ? currentServerData?.data?.mmData.module_config.mymod_cases.user_dm_embed_description
            : ""
    );
    const [roleAccessAdmin, setRoleAccessAdmin] = useState(
        currentServerData?.data?.mmData.module_config.mymod_cases.role_access !== undefined
            ? currentServerData?.data?.mmData.module_config.mymod_cases.role_access.administrator
            : false
    );
    const [roleAccessMod, setRoleAccessMod] = useState(
        currentServerData?.data?.mmData.module_config.mymod_cases.role_access !== undefined
            ? currentServerData?.data?.mmData.module_config.mymod_cases.role_access.moderator
            : false
    );
    const [roleAccessHelper, setRoleAccessHelper] = useState(
        currentServerData?.data?.mmData.module_config.mymod_cases.role_access !== undefined
            ? currentServerData?.data?.mmData.module_config.mymod_cases.role_access.helper
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
        <Card className="w-full bg-black border-zinc-700 p-4">
            <div className="flex flex-col gap-2 items-start w-full text-white">
                <h4 className="text-sm uppercase text-left w-full font-bold text-zinc-500 py-2">Configure Case logging</h4>
                <div className="flex flex-row gap-1 items-center justify-start w-full">
                    <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Case logging channel</Label>
                    <Input type="text" name="mymodLogChannel" value={caseLogChannel} onChange={(e) => setCaseLogChannel(e.target.value)} placeholder="e.g: 12345678910121314" className="bg-zinc-900 border-zinc-800" />
                    <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSetting("case_log_channel", caseLogChannel)}>
                        <Save />
                    </Button>
                </div>
                <h4 className="text-sm uppercase text-left w-full font-bold text-zinc-500 py-2">Configure User DM embed</h4>
                <div className="flex flex-row gap-1 items-center justify-start w-full text-white">
                    <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">User DM embed color</Label>
                    <Select name="verification_level" onValueChange={(e: any) => setCaseUsrDmEmbedColor(Number.parseInt(e))} value={caseUsrDmEmbedColor?.toString()}>
                        <SelectTrigger className="w-full dark placeholder-zinc-300 bg-zinc-900 border-zinc-800 text-white">
                            <SelectValue placeholder="Select a color..." />
                        </SelectTrigger>
                        <SelectContent side="bottom" className="dark">
                            <SelectItem value="0" className="border-l-2 rounded-none rounded-t-sm border-[#000000]">Default</SelectItem>
                            <SelectItem value="1752220" className="border-l-2 rounded-none rounded-r-sm border-[#1ABC9C]">
                                Aqua
                            </SelectItem>
                            <SelectItem value="1146986" className="border-l-2 rounded-none rounded-r-sm border-[#11806A]">
                                Dark Aqua
                            </SelectItem>
                            <SelectItem value="5763719" className="border-l-2 rounded-none rounded-r-sm border-[#57F287]">
                                Green
                            </SelectItem>
                            <SelectItem value="2067276" className="border-l-2 rounded-none rounded-r-sm border-[#1F8B4C]">
                                DarkGreen
                            </SelectItem>
                            <SelectItem value="3447003" className="border-l-2 rounded-none rounded-r-sm border-[#3498DB]">
                                Blue
                            </SelectItem>
                            <SelectItem value="2123412" className="border-l-2 rounded-none rounded-r-sm border-[#206694]">
                                Dark Blue
                            </SelectItem>
                            <SelectItem value="10181046" className="border-l-2 rounded-none rounded-r-sm border-[#9B59B6]">
                                Purple
                            </SelectItem>
                            <SelectItem value="7419530" className="border-l-2 rounded-none rounded-r-sm border-[#71368A]">
                                Dark Purple
                            </SelectItem>
                            <SelectItem value="15277667" className="border-l-2 rounded-none rounded-r-sm border-[#E91E63]">
                                Luminous Vivid Pink
                            </SelectItem>
                            <SelectItem value="11342935" className="border-l-2 rounded-none rounded-r-sm border-[#AD1457]">
                                Dark Vivid Pink
                            </SelectItem>
                            <SelectItem value="15844367" className="border-l-2 rounded-none rounded-r-sm border-[#F1C40F]">
                                Gold
                            </SelectItem>
                            <SelectItem value="12745742" className="border-l-2 rounded-none rounded-r-sm border-[#C27C0E]">
                                Dark Gold
                            </SelectItem>
                            <SelectItem value="15105570" className="border-l-2 rounded-none rounded-r-sm border-[#E67E22]">
                                Orange
                            </SelectItem>
                            <SelectItem value="11027200" className="border-l-2 rounded-none rounded-r-sm border-[#A84300]">
                                Dark Orange
                            </SelectItem>
                            <SelectItem value="15548997" className="border-l-2 rounded-none rounded-r-sm border-[#ED4245]">
                                Red
                            </SelectItem>
                            <SelectItem value="10038562" className="border-l-2 rounded-none rounded-r-sm border-[#992D22]">
                                Dark Red
                            </SelectItem>
                            <SelectItem value="9807270" className="border-l-2 rounded-none rounded-r-sm border-[#95A5A6]">
                                Grey
                            </SelectItem>
                            <SelectItem value="9936031" className="border-l-2 rounded-none rounded-r-sm border-[#979C9F]">
                                Dark Grey
                            </SelectItem>
                            <SelectItem value="8359053" className="border-l-2 rounded-none rounded-r-sm border-[#7F8C8D]">
                                Darker Grey
                            </SelectItem>
                            <SelectItem value="12370112" className="border-l-2 rounded-none rounded-r-sm border-[#BCC0C0]">
                                Light Grey
                            </SelectItem>
                            <SelectItem value="3426654" className="border-l-2 rounded-none rounded-r-sm border-[#34495E]">
                                Navy
                            </SelectItem>
                            <SelectItem value="2899536" className="border-l-2 rounded-none rounded-r-sm border-[#2C3E50]">
                                Dark Navy
                            </SelectItem>
                            <SelectItem value="16776960" className="border-l-2 rounded-none rounded-b-sm border-[#FFFF00]">
                                Yellow
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSetting("case_usr_dm_embed_color", caseUsrDmEmbedColor)}>
                        <Save />
                    </Button>
                </div>
                <div className="flex flex-row gap-1 items-start justify-start w-full">
                    <div className="flex flex-col gap-1 items-start">
                        <Label htmlFor="mymodLogChannel" className="text-white w-[50%]">User DM embed description</Label>
                        <Label htmlFor="mymodLogChannel" className="text-zinc-500 text-sm">MYMOD Beta does not support custom parameters yet. Use this option to display contact details, or where the message came from. Markdown is supported, but is not rendered here.</Label>
                    </div>
                    <Textarea rows={3} name="mymodLogChannel" value={caseUsrDmEmbedDescription} onChange={(e) => setCaseUsrDmEmbedDescription(e.target.value)} placeholder="e.g: This is a message from..." className="bg-zinc-900 border-zinc-800 w-[100%]" />
                    <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSetting("case_usr_dm_embed_desc", caseUsrDmEmbedDescription)}>
                        <Save />
                    </Button>
                </div>
                <h4 className="text-sm uppercase text-left w-full font-bold text-zinc-500 py-2">Configure access to application</h4>
                <div className="flex flex-row gap-1 items-center justify-between w-full">
                    <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Administrators can access Cases</Label>
                    <div className="flex flex-row gap-1 items-center">
                        <Switch name="mymodLogChannel" onCheckedChange={(e) => setRoleAccessAdmin(e)} checked={roleAccessAdmin} className="dark" />
                        <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSetting("case_role_access_administrator", roleAccessAdmin)}>
                            <Save />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row gap-1 items-center justify-between w-full">
                    <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Moderators can access Cases</Label>
                    <div className="flex flex-row gap-1 items-center">
                        <Switch name="mymodLogChannel" onCheckedChange={(e) => setRoleAccessMod(e)} checked={roleAccessMod} className="dark" />
                        <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSetting("case_role_access_moderator", roleAccessMod)}>
                            <Save />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-row gap-1 items-center justify-between w-full">
                    <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Helpers can access Cases</Label>
                    <div className="flex flex-row gap-1 items-center">
                        <Switch name="mymodLogChannel" onCheckedChange={(e) => setRoleAccessHelper(e)} checked={roleAccessHelper} className="dark" />
                        <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSetting("case_role_access_helper", roleAccessHelper)}>
                            <Save />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}