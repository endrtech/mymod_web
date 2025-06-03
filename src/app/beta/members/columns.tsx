"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpDown, MoreHorizontal, UserPen, View } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ViewMemberDialog } from "@/components/dialog/ViewMemberDialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ViewMemberDrawer } from "@/components/drawer/ViewMemberDrawer";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  serverId: string;
  userId: string;
  image: string;
  username: string;
  permissions: string;
  roles: string;
  type: "user" | "bot";
};

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
      );
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
      );
    },
    cell: ({ row }) => {
      return (
        <span className="tabular-nums bg-background border-1 border-muted py-1 px-2 rounded-md">
          {row.getValue("userId")}
        </span>
      );
    },
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
      );
    },
    cell: ({ row }) => {
      return (
        <span className="tabular-nums bg-background border-1 border-muted py-1 px-2 rounded-md">
          {row.getValue("permissions")}
        </span>
      );
    },
  },
  {
    accessorKey: "roles",
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
      );
    },
    cell: ({ row }) => {
      return (
        <span className="tabular-nums bg-background border-1 border-muted py-1 px-2 rounded-md">
          {row.getValue("roles")}
        </span>
      );
    },
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
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.getValue("type") === "user" ? (
            <span className="bg-green-500/60 border-green-500 border-1 text-white px-2 py-1 rounded-full">User</span>
          ) : (
            <span className="bg-blue-500/60 border-blue-500 border-1 text-white px-2 py-1 rounded-full">Bot</span>
          )}
        </span>
      );
    },
  },
  {
    id: "view",
    cell: ({ row }) => (
      <>
        <Drawer>
          <DrawerTrigger asChild className="flex lg:hidden">
            <Button variant="ghost" size="icon">
              <View />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="min-h-[60%] bg-black dark">
            <DrawerTitle className="hidden"></DrawerTitle>
            <ViewMemberDrawer
              serverId={row.getValue("serverId")}
              userId={row.getValue("userId")}
            />
          </DrawerContent>
        </Drawer>
        <Dialog>
          <DialogTrigger asChild className="hidden lg:flex">
            <Button variant="ghost" size="icon">
              <View />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-background lg:min-w-[1000px] min-w-[80%]">
            <DialogTitle className="pt-3 px-2 text-md flex flex-row items-center justify-start gap-2">
              <UserPen size={18} /> Member Information
            </DialogTitle>
            <ViewMemberDialog
              serverId={row.getValue("serverId")}
              userId={row.getValue("userId")}
            />
          </DialogContent>
        </Dialog>
      </>
    ),
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
          <DropdownMenuItem>Create Case...</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
