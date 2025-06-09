import {queryOptions} from "@tanstack/react-query";
import {getDiscordUser} from "@/app/actions/getDiscordUser";
import getUserNotifications from "@/app/actions/user/getUserNotifications";

export const getDiscordData = () => {
    return queryOptions({
        queryKey: ["get_discord_data"],
        queryFn: async () => {
            return await getDiscordUser();
        }
    })
}

export const getNotifications = (id: any) => {
    return queryOptions({
        queryKey: ["get_user_notifications", id],
        queryFn: async () => {
            return await getUserNotifications(id);
        },
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
    })
}