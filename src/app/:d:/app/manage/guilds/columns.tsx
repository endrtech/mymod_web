"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import moment from "moment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  guildId: string;
  guildIcon: string;
  guildName: string;
  ownerAvatar: string;
  ownerName: string;
  createdAt: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "guildId",
    accessorKey: "guildId",
    enableHiding: false,
  },
  {
    id: "guildIcon",
    accessorKey: "guildIcon",
    enableHiding: false,
  },
  {
    id: "ownerAvatar",
    accessorKey: "ownerAvatar",
    enableHiding: false,
  },
  {
    accessorKey: "guildName",
    size: 40,
    enableResizing: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="capitalize -ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Guild
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-2">
          <Avatar>
            <AvatarImage
              src={row.getValue("guildIcon")}
              alt="Avatar"
              className="rounded-full"
            />
          </Avatar>
          <span className="overflow-hidden text-wrap truncate">
            {row.getValue("guildName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "ownerName",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="capitalize -ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Owner
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-full flex flex-row items-center justify-start gap-2">
          <Avatar>
            <AvatarImage
              src={row.getValue("ownerAvatar")}
              alt="Avatar"
              className="rounded-full"
            />
          </Avatar>
          <span>{row.getValue("ownerName")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
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
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          {moment(row.getValue("createdAt")).format("DD MMM YYYY, hh:mm a")}
        </span>
      );
    },
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
          <DropdownMenuItem>View...</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
