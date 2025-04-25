"use client"
import { Loader2, Save, Volume2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useEffect, useState } from "react"
import getCurrentGuild from "@/app/actions/getCurrentGuild"
import { getGuildChannels } from "@/app/actions/guilds/getGuildChannels"
import { updateGuildSettings } from "@/app/actions/guilds/updateGuildSettings"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const DiscordSettingsCard = ({ serverId }: any) => {
    const router = useRouter();
    const [currentServerData, setCurrentServerData] = useState<any>(null);
    const [currentGuildChannels, setCurrentGuildChannels] = useState<any>(null);

    // This controls the settings for each section of the card:

    useEffect(() => {
        const getData = async () => {
            const currentServerDataData = await getCurrentGuild(serverId);
            const currentGuildChannelsData = await getGuildChannels(serverId);

            setCurrentServerData(currentServerDataData);
            setCurrentGuildChannels(currentGuildChannelsData);
        }
        getData();
    }, [serverId]);

    const [serverName, setServerName] = useState(currentServerData?.data?.dsData.name);
    const [serverMsgNotificationSettings, setServerMsgNotificationSettings] = useState(0 || currentServerData?.data?.dsData.defaultMessageNotifications);
    const [serverAfkChannelId, setServerAfkChannelId] = useState(0 || currentServerData?.data?.dsData.afkChannelId);
    const [serverAfkTimeout, setServerAfkTimeout] = useState(0 || currentServerData?.data?.dsData.afkTimeout);
    const [serverVerificationLevel, setServerVerificationLevel] = useState(currentServerData?.data?.dsData.verificationLevel);
    const [serverNsfwLevel, setServerNsfwLevel] = useState(currentServerData?.data?.dsData.nsfwLevel);

    const updateSettingsForGuild = async (setting: any, content: any) => {
        console.log(content);
        const response = await updateGuildSettings(serverId, setting, content);
        if(response === 200) {
            toast.success("Updated your server settings successfully.");
            router.refresh();
        }
    }

    if (currentServerData !== null) {
        return (
            <Card className="w-full h-[100%] bg-black border-zinc-700 p-2">
                <CardContent className="p-2 overflow-y-auto h-[100%]">
                    <div className="flex flex-col gap-2 items-start w-full">
                        <h4 className="text-xl text-left w-full font-bold text-zinc-300">General Settings</h4>
                        <Label htmlFor="mymodLogChannel" className="text-zinc-500 text-sm w-full">Due to Discord API limitations, some settings may not be displayed here, such as Community settings. Continue to use the Discord client to modify these settings.</Label>
                        <div className="flex flex-row gap-1 items-center justify-start w-full">
                            <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Server name</Label>
                            <Input type="text" name="mymodLogChannel" placeholder="e.g: My Beautiful Server" onChange={(e) => setServerName(e.target.value)} defaultValue={currentServerData.data?.dsData.name} className="bg-zinc-900 border-zinc-800 text-white" />
                            <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSettingsForGuild("server_name", serverName)}>
                                <Save />
                            </Button>
                        </div>
                        <br />
                        <Separator className="bg-zinc-800" />
                        <br />
                        <h4 className="text-xl text-left w-full font-bold text-zinc-300">Engagement</h4>
                        <div className="flex flex-row gap-1 items-center justify-start w-full">
                            <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Default Notification Settings</Label>
                            <Select name="verification_level" onValueChange={(e) => setServerMsgNotificationSettings(Number.parseInt(e))} value={`${currentServerData.data?.dsData.defaultMessageNotifications}`}>
                                <SelectTrigger className="w-full dark placeholder-zinc-300 bg-zinc-900 border-zinc-800 text-white">
                                    <SelectValue placeholder="Select a verification level..." />
                                </SelectTrigger>
                                <SelectContent side="bottom" className="dark">
                                    <SelectItem value="0">All Messages</SelectItem>
                                    <SelectItem value="1">
                                        Only @mentions
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSettingsForGuild("message_notification_settings", serverMsgNotificationSettings)}>
                                <Save />
                            </Button>
                        </div>
                        <br />
                        <div className="flex flex-row gap-2 justify-between items-center w-full">
                            <div className="flex flex-col gap-1 items-start justify-center w-full">
                                <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Inactive Channel</Label>
                                <div className="flex flex-row gap-1 items-center justify-start w-full">
                                    <Select name="verification_level" onValueChange={(e) => setServerAfkChannelId(Number.parseInt(e))} value={`${currentServerData.data?.dsData.afkChannelId}`}>
                                        <SelectTrigger className="w-full dark placeholder-zinc-300 bg-zinc-900 border-zinc-800 text-white">
                                            <SelectValue placeholder="Select a verification level..." />
                                        </SelectTrigger>
                                        <SelectContent side="bottom" className="dark">
                                            <SelectItem value="null">None</SelectItem>
                                            {
                                                currentGuildChannels.data?.map((channel: any) => (
                                                    <SelectItem key={channel.id} value={channel.id}><Volume2 /> {channel.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSettingsForGuild("afk_channel_id", serverAfkChannelId)}>
                                        <Save />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-start justify-center w-full">
                                <Label htmlFor="mymodLogChannel" className="text-white w-[40%]">Inactive Timeout</Label>
                                <div className="flex flex-row gap-1 items-center justify-start w-full">
                                    <Select name="verification_level" onValueChange={(e) => setServerAfkTimeout(Number.parseInt(e))} value={`${currentServerData.data?.dsData.afkTimeout}`}>
                                        <SelectTrigger className="w-full dark placeholder-zinc-300 bg-zinc-900 border-zinc-800 text-white">
                                            <SelectValue placeholder="Select a verification level..." />
                                        </SelectTrigger>
                                        <SelectContent side="bottom" className="dark">
                                            <SelectItem value="60">1 minute</SelectItem>
                                            <SelectItem value="300">5 minutes</SelectItem>
                                            <SelectItem value="900">15 minutes</SelectItem>
                                            <SelectItem value="1800">30 minutes</SelectItem>
                                            <SelectItem value="3600">1 hour</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSettingsForGuild("afk_timeout", serverAfkTimeout)}>
                                        <Save />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <Separator className="bg-zinc-800" />
                        <br />
                        <h4 className="text-xl text-left w-full font-bold text-zinc-300">Moderation</h4>
                        <h4 className="text-sm uppercase text-left w-full font-bold text-zinc-500">Safety Setup</h4>
                        <div className="flex flex-row gap-1 items-center justify-between w-full">
                            <div className="flex flex-col gap-1 items-start">
                                <Label htmlFor="mymodLogChannel" className="text-white">Verification level</Label>
                                <Label htmlFor="mymodLogChannel" className="text-zinc-500 text-sm w-[80%]">Members of the server must meet the following criteria before they can send messages in text channels, or initiate a DM. If a member has an assigned role and server onboarding is not enabled, this does not apply.</Label>
                            </div>
                            <Select name="verification_level" onValueChange={(e) => setServerVerificationLevel(e)} value={`${serverVerificationLevel !== 0 ? currentServerData.data?.dsData.verificationLevel : serverVerificationLevel}`}>
                                <SelectTrigger className="w-full dark placeholder-zinc-300 bg-zinc-900 border-zinc-800 text-white">
                                    <SelectValue placeholder="Select a verification level..." />
                                </SelectTrigger>
                                <SelectContent side="bottom" className="dark">
                                    <SelectItem value="0" className="border-l-2 rounded-none rounded-t-sm rounded-r-md border-zinc-500">None - Unrestricted</SelectItem>
                                    <SelectItem value="1" className="border-l-2 rounded-none rounded-r-sm border-green-500">
                                        Low - Must have a verified email on their account
                                    </SelectItem>
                                    <SelectItem value="2" className="border-l-2 rounded-none rounded-r-sm border-yellow-500">
                                        Medium - Must be registered on Discord for longer than 5
                                        minutes
                                    </SelectItem>
                                    <SelectItem value="3" className="border-l-2 rounded-none rounded-r-sm border-orange-500">
                                        High - Must be a member of the server for longer than 10
                                        minutes
                                    </SelectItem>
                                    <SelectItem value="4" className="border-l-2 rounded-none rounded-b-sm rounded-r-md border-red-500">
                                        Highest - Must have a verified phone number
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSettingsForGuild("verification_level", serverVerificationLevel)}>
                                <Save />
                            </Button>
                        </div>
                        <div className="flex flex-row gap-1 items-center justify-between w-full">
                            <div className="flex flex-col gap-1 items-start">
                                <Label htmlFor="mymodLogChannel" className="text-white">Explicit image filter</Label>
                                <Label htmlFor="mymodLogChannel" className="text-zinc-500 text-sm max-w-[80%]">Automatically block messages in this server that may contain explicit images in channels not marked as Age-restricted. Please choose how this filter will apply to members in your server.</Label>
                            </div>
                            <Select name="nsfw_level" onValueChange={(e) => setServerNsfwLevel(e)} value={`${serverNsfwLevel !== 0 ? currentServerData.data?.dsData.nsfwLevel : serverNsfwLevel}`}>
                                <SelectTrigger className="w-full dark placeholder-zinc-300 bg-zinc-900 border-zinc-800 text-white">
                                    <SelectValue placeholder="Select your explicit image filter..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Do not filter</SelectItem>
                                    <SelectItem value="1">Filter messages from server members without roles</SelectItem>
                                    <SelectItem value="2">Filter messages from all members</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon" className="dark text-white" onClick={() => updateSettingsForGuild("nsfw_level", serverNsfwLevel)}>
                                <Save />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card className="w-full bg-black border-zinc-700 flex flex-row items-center justify-center">
                <Loader2 className="animate-spin w-12 h-12 text-white" />
            </Card>
        )
    }
}