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
export type AuditLog = {
    type: string
    target_id: string
    actions_taken: string
    executor_id: string
    created: Date
}

export const columns: ColumnDef<AuditLog>[] = [
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
    },
    {
        accessorKey: "target_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Target ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "actions_taken",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Actions taken
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span className="text-wrap">
                    {row.getValue("actions_taken")}
                </span>
            )
        }
    },
    {
        accessorKey: 'executor_id',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="capitalize -ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Executor ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span>
                    {moment(row.getValue("created")).format("YYYY-MM-DD HH:mm:ss")}
                </span>
            )
        }
    }
]