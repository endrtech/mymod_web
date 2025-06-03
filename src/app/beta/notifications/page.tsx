"use client"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "./data-table";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import getUserNotifications from "@/app/actions/user/getUserNotifications";
import { getColumns, type Notification } from "./columns";
import { markNotificationRead } from "@/app/actions/user/markNotificationRead";
import { deleteNotification } from "@/app/actions/user/deleteNotification";
import { toast } from "sonner";
import * as columns from "./columns";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
    const notificationsUnreadDataArray: Notification[] = [];
    const notificationsReadDataArray: Notification[] = [];
    const notificationsDataArray: Notification[] = [];

    const [notifications, setNotifications] = useState(notificationsDataArray);
    const [fetchedData, setFetchedData] = useState<any>();

    useEffect(() => {
        const getData = async () => {
            const user = await getDiscordUser();
            const resp = await getUserNotifications(user?.id);

            setFetchedData(resp);
        }

        getData();
    }, [])

    fetchedData?.forEach((notification: any) => {
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
        <div className="w-[70vw] h-screen" suppressHydrationWarning>
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
                        <Badge variant="outline">{notificationsDataArray.length}</Badge>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="unread" className="w-full">
                    <DataTable columns={columns} data={notificationsUnreadDataArray} />
                </TabsContent>
                <TabsContent value="read" className="w-full">
                    <DataTable columns={columns} data={notificationsReadDataArray} />
                </TabsContent>
                <TabsContent value="all" className="w-full">
                    <DataTable columns={columns} data={notificationsDataArray} />
                </TabsContent>
            </Tabs>
        </div>
    )
}