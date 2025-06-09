import {queryOptions} from "@tanstack/react-query";
import {getCurrentGuildMembers} from "@/app/actions/getCurrentGuildMembers";

export const getGuildMembers = (id: string) => {
    return queryOptions({
        queryKey: ["get_guild_members", id],
        queryFn: async () => {
            return await getCurrentGuildMembers(id);
        }
    })
}