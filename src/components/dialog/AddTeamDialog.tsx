"use client"

import React from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import axios from "axios"
import { toast } from "sonner"

export const AddTeamDialog = ({ serverId }: any) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <i className="bx bx-xs bx-plus"></i>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add a user to your team</DialogTitle>
                <span className="text-sm text-gray-500">
                    By adding a user to your team, you agree that this user is
                    authorised to access and make actions under the role you
                    specify in this form.
                </span>
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>
                                Enter the User ID for the user you want to add:
                            </Label>
                            <Input
                                name="userId"
                                id="userId"
                                placeholder="e.g: 1234567891011121314"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>What role do you want this user to have?</Label>
                            <Select name="relRole">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        <SelectItem value="moderator">
                                            Moderator
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button variant="default">Add user</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}