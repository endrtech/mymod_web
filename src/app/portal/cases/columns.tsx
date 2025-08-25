"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { ArrowUpDown, MoreHorizontal, UserPen, View } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ViewMemberDialog } from "@/components/dialog/ViewMemberDialog"
import moment from "moment"
import Draggable from "react-draggable";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Case = {
    serverId: string,
    userId: string,
    avatar: string,
    username: string,
    globalName: string,
    caseType: string,
    caseId: string,
    caseStatus: string,
    caseDuration: string,
    caseReason: string,
}

export const columns: ColumnDef<Case>[] = [
    {
        id: "serverId",
        accessorKey: "serverId",
    },
    {
        id: "avatar",
        accessorKey: "avatar",
    },
    {
        id: "username",
        accessorKey: "username",
    },
    {
        id: "userId",
        accessorKey: "userId",
    },
    {
        accessorKey: "caseId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Case ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "globalName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex flex-row items-center">
                <Avatar>
                    <AvatarImage
                        src={`https://cdn.discordapp.com/avatars/${row.getValue("userId")}/${row.getValue("avatar")}.png`}
                        alt="Avatar"
                        className="rounded-full"
                    />
                    <AvatarFallback>
                        <Image
                            src="https://via.placeholder.com/50"
                            alt="Discord Logo"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    </AvatarFallback>
                </Avatar>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link" className="text-foreground cursor-pointer ml-2">
                            {row.getValue("globalName") || row.getValue("username")}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className=" p-0 min-w-[1000px]">
                        <DialogTitle className="pt-3 px-2 text-md flex flex-row items-center justify-start gap-2"><UserPen size={18} /> Member Information</DialogTitle>
                        <ViewMemberDialog serverId={row.getValue("serverId")} userId={row.getValue("userId")} />
                    </DialogContent>
                </Dialog>
            </div>
        )
    },
    {
        accessorKey: "caseType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span className="capitalize">
                    {row.getValue("caseType")}
                </span>
            )
        },
    },
    {
        accessorKey: "caseStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span className="capitalize">
                    {row.getValue("caseStatus")}
                </span>
            )
        },
    },
    {
        accessorKey: 'caseDuration',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Expires on
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span>
                    {row.getValue("caseDuration") !== null ? moment(row.getValue("caseDuration")).format("MMMM Do YYYY, h:mm:ss a") : "Never"}
                </span>
            )
        }
    },
    {
        accessorKey: "caseReason",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Reason
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={`/beta/cases/${row.getValue("caseId")}`}>
                        <DropdownMenuItem>
                            <View className="mr-2 h-4 w-4" />
                            View
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    }
]