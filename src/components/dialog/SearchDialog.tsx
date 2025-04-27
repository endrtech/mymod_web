"use client"
import { ChevronLeft, ChevronRight, Search, Users, X } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { searchMember } from "@/app/actions/guilds/members/searchMember"
import { Avatar, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { ViewMemberDialog } from "./ViewMemberDialog"
import { ViewMemberSearchDialog } from "./ViewMemberSearchDialog"
import { searchCases } from "@/app/actions/cases/searchCases"
import { searchAuditLogs } from "@/app/actions/guilds/searchAuditLogs"
import moment from "moment"

export const SearchDialog = ({ serverId }: any) => {
    const [searchedCases, setSearchedCases] = useState<any>({});
    const [searchedMembers, setSearchedMembers] = useState<any>({});
    const [searchedLogs, setSearchedLogs] = useState<Array<any>>();
    const [searchResults_members, setSearchResults_members] = useState(0);
    const [searchResults_cases, setSearchResults_cases] = useState(0);
    const [searchResults_logs, setSearchResults_logs] = useState(0);
    const [tabVal, setTabVal] = useState("searched-members");
    const [memebrId, setMemberId] = useState(null);
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    let searchDataTimeout: any = undefined;

    const searchData = async (value: any) => {
        setQuery(value);
        const response = await searchMember(serverId, value);
        const response2 = await searchCases(serverId, value);
        const response3 = await searchAuditLogs(serverId, value);
        if (response) {
            setSearchedMembers(response);
            setSearchResults_members(response.data?.length);
        } else {
            setSearchedMembers({});
        }
        if (response2) {
            setSearchedCases(response2);
            setSearchResults_cases(response2.length);
        } else {
            setSearchedCases({});
        }
        if (response3) {
            setSearchedLogs(response3);
            setSearchResults_logs(response3.length);
        } else {
            setSearchedLogs([]);
        }
    }

    const closeSearch = () => {
        setSearchResults_members(0);
        setSearchResults_cases(0);
        setSearchResults_logs(0);
        setSearchedCases({});
        setSearchedLogs([]);
        setSearchedMembers({});
        setQuery("");
        setOpen(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="dark text-white">
                    <Search />
                </Button>
            </DialogTrigger>
            <DialogOverlay>
                <div className="border-none flex flex-row items-center justify-center w-full h-full bg-black/70 text-transparent p-4 z-[999]">
                    <div className="relative w-[62%] h-auto">
                        {/* Glow behind icon */}
                        <div className="absolute inset-0 rounded-lg blur-xl opacity-60 animate-pulse"
                            style={{
                                background: "linear-gradient(135deg, #0090F7, #BA62FC, #F2416B, #F55600)"
                            }} />

                        {/* Icon on top */}
                        <div className="flex flex-col gap-2 items-start justify-center">
                            <div className="flex w-full h-fit flex-row items-center gap-1 text-white">
                                <DialogClose onClick={() => closeSearch()} className="text-white bg-black z-[9999] p-3.25 rounded-full shadow-lg shadow-black/60">
                                    <X size={18} />
                                </DialogClose>
                                <Input
                                    type="text"
                                    onChange={(e) => {
                                        const { value } = e.target;

                                        if (value.length > 0) {
                                            if (searchDataTimeout != undefined) {
                                                clearTimeout(searchDataTimeout);
                                            }

                                            // Only call if there's at least 1 character
                                            searchDataTimeout = setTimeout(() => {
                                                searchData(value);
                                                searchDataTimeout = undefined;
                                            }, 1000);
                                        } else {
                                            setQuery("");
                                        }
                                    }}
                                    placeholder="Search for a member, case, or log..."
                                    className="relative drop-shadow-lg bg-black shadow-lg shadow-black/60 rounded-full px-6 py-3 h-fit border-none w-full"
                                />
                            </div>
                            {
                                query && (
                                    <Card className="p-0 w-full border-none shadow-lg shadow-black/60 z-[99]">
                                        <CardContent className="bg-black text-white rounded-lg border-none p-6 w-full flex flex-col gap-4">
                                            {
                                                tabVal !== "member-information" ? <CardTitle>Found {searchResults_members + searchResults_cases + searchResults_logs} result{(searchResults_members + searchResults_cases + searchResults_logs) > 1 || (searchResults_members + searchResults_cases + searchResults_logs) === 0 ? "s" : ""} for "{query}"</CardTitle> : ""
                                            }
                                            <Tabs value={tabVal}>
                                                {
                                                    tabVal !== "member-information" ? (
                                                        <TabsList className="dark text-white flex flex-row gap-2 w-full">
                                                            <TabsTrigger value="searched-cases" onClick={() => setTabVal("searched-cases")} className="flex flex-row items-center gap-1">
                                                                <span>Cases</span>
                                                                <Badge variant="outline" className="dark text-white">{searchResults_cases || 0}</Badge>
                                                            </TabsTrigger>
                                                            <TabsTrigger value="searched-members" onClick={() => setTabVal("searched-members")} className="flex flex-row items-center gap-1">
                                                                <span>Members</span>
                                                                <Badge variant="outline" className="dark text-white">{searchedMembers?.data?.length || 0}</Badge>
                                                            </TabsTrigger>
                                                            <TabsTrigger value="searched-logs" onClick={() => setTabVal("searched-logs")} className="flex flex-row items-center gap-1">
                                                                <span>Logs</span>
                                                                <Badge variant="outline" className="dark text-white">{searchedLogs?.length || 0}</Badge>
                                                            </TabsTrigger>
                                                        </TabsList>
                                                    ) : ""
                                                }
                                                <TabsContent value="searched-members" className="py-3 max-h-[60vh] overflow-y-auto">
                                                    {
                                                        searchedMembers.data?.map((member: any) => (
                                                            <Button onClick={() => { setTabVal("member-information"); setMemberId(member.userId) }} key={member.userId} className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500">
                                                                <div className="flex flex-row items-center justify-between w-full">
                                                                    <div className="flex flex-row gap-2 items-center justify-start">
                                                                        <Avatar className="w-6 h-6 rounded-full">
                                                                            <AvatarImage
                                                                                src={member.displayAvatarURL}
                                                                            />
                                                                        </Avatar>
                                                                        {member.displayName}
                                                                    </div>
                                                                    <ChevronRight />
                                                                </div>
                                                            </Button>
                                                        ))
                                                    }
                                                </TabsContent>
                                                <TabsContent value="searched-logs" className="py-3 max-h-[60vh] overflow-y-auto">
                                                    {
                                                        searchedLogs?.map((logItem: any) => (
                                                            <Button key={logItem.logID} className="cursor-pointer w-full h-auto text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500">
                                                                <div className="flex flex-row items-center justify-between w-full">
                                                                    <div className="flex flex-col gap-1 items-start justify-start">
                                                                        <span className="text-wrap text-left">{logItem.actions_taken}</span>
                                                                        <span>Executor ID: {logItem.executorID || "Unknown"}</span>
                                                                        <span>Log ID: {logItem.logID}</span>
                                                                        <span>Executed on: {moment(logItem.timestamp).format("DD MMM YYYY, hh:mm a")}</span>
                                                                    </div>
                                                                </div>
                                                            </Button>
                                                        ))
                                                    }
                                                </TabsContent>
                                                <TabsContent value="searched-cases" className="py-3 max-h-[60vh] overflow-y-auto">
                                                    {
                                                        searchedCases.length > 0 && searchedCases?.map((caseItem: any) => (
                                                            <Link href={`/:d:/app/server/${serverId}/cases/${caseItem.caseID}`} key={caseItem.caseID} className="cursor-pointer w-full text-zinc-300 rounded-none border-b-1 border-zinc-900 bg-transparent hover:bg-transparent hover:border-zinc-500">
                                                                <div className="flex flex-row items-center justify-between w-full">
                                                                    <div className="flex flex-col gap-1 items-start justify-center">
                                                                        <span className="capitalize font-bold">{caseItem.case_info.case_type} {caseItem.user_info.globalName || caseItem.user_info.username}</span>
                                                                        <span>Case ID: {caseItem.caseID}</span>
                                                                    </div>
                                                                    <ChevronRight />
                                                                </div>
                                                            </Link>
                                                        ))
                                                    }
                                                </TabsContent>
                                                <TabsContent value="member-information" className="rounded-lg">
                                                    <Button onClick={() => setTabVal("searched-members")} variant="ghost" className="dark text-white">
                                                        <ChevronLeft /> Back
                                                    </Button>
                                                    <br /><br />
                                                    {
                                                        memebrId !== null && (
                                                            <div className="dark text-white rounded-lg">
                                                                <ViewMemberSearchDialog serverId={serverId} userId={memebrId} />
                                                            </div>
                                                        )
                                                    }
                                                </TabsContent>
                                            </Tabs>
                                        </CardContent>
                                    </Card>
                                )
                            }
                        </div>
                    </div>
                </div>
            </DialogOverlay>
        </Dialog>
    )
}