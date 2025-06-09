import {queryOptions} from "@tanstack/react-query";
import {getUserGuildRelationship} from "@/app/actions/guilds/getUserGuildRelationship";
import {getCurrentGuildRelationships} from "@/app/actions/getCurrentGuildRelationships";

export const getGuildRelationship = (serverId: string, userId: string) => {
    return queryOptions({
        queryKey: ["get_user_guild_rel", serverId, userId],
        queryFn: async () => {
            return await getUserGuildRelationship(serverId, userId);
        }
    })
}

export const getGuildRelationshipsByServer = (id: string) => {
    return queryOptions({
        queryKey: ["get_guild_relationships", id],
        queryFn: async () => {
            return await getCurrentGuildRelationships(id);
        }
    })
}