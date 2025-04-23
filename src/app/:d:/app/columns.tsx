"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { ArrowUpDown, Ellipsis, MailCheck, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import moment from "moment"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteNotification } from "@/app/actions/user/deleteNotification"
import { toast } from "sonner"
import { markNotificationRead } from "@/app/actions/user/markNotificationRead"
import { Badge } from "@/components/ui/badge"
import { Geist } from "next/font/google"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Notification = {
    userId: string,
    notificationId: string,
    avatar: string
    username: string,
    title: string,
    description: string,
    status: string,
    created: string,
}

const geistSans = Geist({
    subsets: ["latin"],
})

// columns.ts
export const getColumns = (
    onMarkAsRead: (userId: string, notificationId: string) => void,
    onDelete: (userId: string, notificationId: string) => void
): ColumnDef<Notification>[] => [
        {
            accessorKey: "userId",
        },
        {
            accessorKey: "notificationId",
        },
        {
            accessorKey: "avatar",
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
                        User
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
                        <span className="text-sm font-medium text-zinc-300">{row.getValue("username")}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="capitalize -ml-4"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <span className="text-wrap">
                        {row.getValue("title")}
                    </span>
                )
            }
        },
        {
            accessorKey: "description",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="capitalize -ml-4"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Description
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <span className="text-wrap text-[14px]">
                        {row.getValue("description")}
                    </span>
                )
            }
        },
        {
            accessorKey: "status",
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
                    <Badge variant="outline" className="capitalize text-xs">
                        {row.getValue("status") || "Unknown"}
                    </Badge>
                )
            }
        },
        {
            accessorKey: "created",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="capitalize -ml-4"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created on
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return (
                    <span className="tabular-nums text-sm">
                        {moment(row.getValue("created")).format("DD MMM YYYY, hh:mm a")}
                    </span>
                )
            }
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 dark">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className={`${geistSans.className} dark z-[999]`}>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                row.getValue("status") === "unread" && (
                                    <DropdownMenuItem onClick={() => {
                                        onMarkAsRead(row.getValue("userId"), row.getValue("notificationId"));
                                    }}>
                                        <MailCheck className="mr-2 h-4 w-4" />
                                        Mark as read
                                    </DropdownMenuItem>
                                )
                            }
                            <DropdownMenuItem
                                onClick={() => {
                                    onDelete(row.getValue("userId"), row.getValue("notificationId"));
                                }}
                            >
                                <Trash className="mr-2 h-4 w-4 text-red-500" />
                                <span className="text-red-500">Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ];