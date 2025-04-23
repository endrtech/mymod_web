"use client"
import { Bell, BellDot } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { DataTable } from "@/app/:d:/app/data-table"
import { useState } from "react"
import { getColumns, Notification } from "@/app/:d:/app/columns"
import { markNotificationRead } from "@/app/actions/user/markNotificationRead"
import { deleteNotification } from "@/app/actions/user/deleteNotification"
import { toast } from "sonner"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
    subsets: ["latin"],
})

export const NotificationDialog = ({ notificationsData }: any) => {
    const notificationsUnreadDataArray: Notification[] = [];
    const notificationsReadDataArray: Notification[] = [];
    const notificationsDataArray: Notification[] = [];

    notificationsData.forEach((notification: any) => {
        if (notification.status === "unread") {
            notificationsUnreadDataArray.push({
                userId: notification.user_info?.userId || notification?.user_info?.id,
                notificationId: notification._id || notification?.user_info.id,
                avatar: notification.user_info?.displayAvatarURL || "https://cdn.discordapp.com/embed/avatars/0.png",
                username: notification.user_info?.displayName || notification.user_info?.globalName || notification.user_info?.username || "Unknown",
                title: notification.title,
                description: notification.description,
                status: notification.status,
                created: notification.createdDate,
            })
        } else if (notification.status === "read") {
            notificationsReadDataArray.push({
                userId: notification.user_info?.userId || notification?.user_info?.id,
                notificationId: notification._id,
                avatar: notification.user_info?.displayAvatarURL || "https://cdn.discordapp.com/embed/avatars/0.png",
                username: notification.user_info?.displayName || notification.user_info?.globalName || notification.user_info?.username || "Unknown",
                title: notification.title,
                description: notification.description,
                status: notification.status,
                created: notification.createdDate,
            })
        }

        notificationsDataArray.push({
            userId: notification.user_info?.userId || notification?.user_info?.id,
            notificationId: notification._id,
            avatar: notification.user_info?.displayAvatarURL || "https://cdn.discordapp.com/embed/avatars/0.png",
            username: notification.user_info?.displayName || notification.user_info?.globalName || notification.user_info?.username || "Unknown",
            title: notification.title,
            description: notification.description,
            status: notification.status,
            created: notification.createdDate,
        })
    })

    const [notifications, setNotifications] = useState(notificationsDataArray);
    const notificationsUnread = notifications.filter(n => n.status === "unread");
    const notificationsRead = notifications.filter(n => n.status === "read");

    const handleMarkAsRead = async (userId: string, notificationId: string) => {
        const res = await markNotificationRead(userId, notificationId);
        if (res === 200) {
            setNotifications(prev =>
                prev.map(n =>
                    n.notificationId === notificationId ? { ...n, status: "read" } : n
                )
            );
            toast.success("Notification marked as read.");
        }
    };

    const handleDelete = async (userId: string, notificationId: string) => {
        const res = await deleteNotification(userId, notificationId);
        if (res === 200) {
            setNotifications(prev =>
                prev.filter(n => n.notificationId !== notificationId)
            );
            toast.success("Notification deleted.");
        }
    };

    const columns = getColumns(handleMarkAsRead, handleDelete);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="dark text-white">
                    {
                        notificationsData.length > 0 && (
                            <BellDot />
                        )
                    }
                    {
                        notificationsData.length === 0 && (
                            <Bell />
                        )
                    }
                </Button>
            </DialogTrigger>
            <DialogContent className={`${montserrat.className} dark flex flex-col items-start text-white min-w-[80%] h-[90%] z-[999]`}>
                <DialogTitle>Notification Center</DialogTitle>
                <Tabs defaultValue="unread" className="w-full">
                    <TabsList>
                        <TabsTrigger value="unread" className="flex flex-row items-center gap-2">
                            Unread
                            <Badge variant="outline">{notificationsUnread.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="read" className="flex flex-row items-center gap-2">
                            Read
                            <Badge variant="outline">{notificationsRead.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="all" className="flex flex-row items-center gap-2">
                            All
                            <Badge variant="outline">{notifications.length}</Badge>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="unread" className="w-full">
                        <DataTable columns={columns} data={notificationsUnread} />
                    </TabsContent>
                    <TabsContent value="read" className="w-full">
                        <DataTable columns={columns} data={notificationsRead} />
                    </TabsContent>
                    <TabsContent value="all" className="w-full">
                        <DataTable columns={columns} data={notifications} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}