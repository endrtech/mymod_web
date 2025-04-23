"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
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
import moment from "moment"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Team = {
    userId: string
    avatar: string
    globalName: string
    username: string
    role: string
}

export const columns: ColumnDef<Team>[] = [
    {
        accessorKey: "userId",
        header: "User ID",
    },
    {
        accessorKey: "avatar",
    },
    {
        accessorKey: "globalName",
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage
                            src={`${row.getValue("avatar")}`}
                            alt={row.getValue("username")}
                            className="rounded-full"
                            width={30}
                            height={30}
                        />
                        <AvatarFallback>{row.getValue("username")}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-zinc-300">{row.getValue("globalName")} (@{row.getValue("username")})</span>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
]