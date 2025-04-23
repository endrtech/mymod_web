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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    serverId: string
    userId: string
    image: string
    username: string
    permissions: string
    roles: string
    type: 'user' | 'bot'
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "serverId",
        accessorKey: "serverId",
    },
    {
        accessorKey: "image",
        header: "Avatar",
        cell: ({ row }) => (
            <Avatar>
                <AvatarImage
                    src={row.getValue("image")}
                    alt="Avatar"
                    className="rounded-full"
                />
            </Avatar>
        ),
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
    },
    {
        accessorKey: "userId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span className="tabular-nums bg-zinc-800 border-1 border-zinc-700 py-1 px-2 rounded-md">{row.getValue("userId")}</span>
            )
        }
    },
    {
        accessorKey: "permissions",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Permissions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span className="tabular-nums bg-zinc-800 border-1 border-zinc-700 py-1 px-2 rounded-md">{row.getValue("permissions")}</span>
            )
        }
    },
    {
        accessorKey: 'roles',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Roles
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span className="tabular-nums bg-zinc-800 border-1 border-zinc-700 py-1 px-2 rounded-md">{row.getValue("roles")}</span>
            )
        }
    },
    {
        accessorKey: "type",
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
                <span>
                    {row.getValue("type") === "user" ? (
                        <span className="text-green-500">User</span>
                    ) : (
                        <span className="text-blue-500">Bot</span>
                    )}
                </span>
            )
        }
    },
    {
        id: "view",
        cell: ({ row }) => (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="dark text-white">
                        <View />
                    </Button>
                </DialogTrigger>
                <DialogContent className="dark text-white p-0 bg-black min-w-[1000px]">
                    <DialogTitle className="pt-3 px-2 text-md flex flex-row items-center justify-start gap-2"><UserPen size={18} /> Member Information</DialogTitle>
                    <ViewMemberDialog serverId={row.getValue("serverId")} userId={row.getValue("userId")} />
                </DialogContent>
            </Dialog>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 dark">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="dark">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Create Case...</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    }
]
