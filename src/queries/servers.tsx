import {queryOptions} from "@tanstack/react-query";
import {getDiscordUser} from "@/app/actions/getDiscordUser";
import {getUserGuilds} from "@/app/actions/getUserGuilds";
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import {getUsersGraph} from "@/lib/data";
import {getGuildChannels} from "@/app/actions/guilds/getGuildChannels";
import {getCurrentGuildAuditLog} from "@/app/actions/getCurrentGuildAuditLog";

export const getServers = queryOptions({
    queryKey: ["get_guilds"],
    queryFn: async () => {
        const discordData = await getDiscordUser();
        return await getUserGuilds(discordData.id);
    }
})

export const getServerById = (id: string) => {
    return queryOptions({
        queryKey: ["get_guild", id],
        queryFn: async () => {
            return await getCurrentGuild(id);
        },
    })
}

export const getServerStatsGraph = (id: string) => {
    return queryOptions({
        queryKey: ["get_guild_stats_graph", id],
        queryFn: async () => {
            const guild = await getCurrentGuild(id);
            return await getUsersGraph(guild.data.statsData.membersArray);
        }
    })
}

export const getGuildVoiceChannelsById = (id: string) => {
    return queryOptions({
        queryKey: ["get_guild_channels", id, "voice"],
        queryFn: async () => {
            return await getGuildChannels(id, "voice")
        }
    })
}

export const getGuildAuditLog = (id: string) => {
    return queryOptions({
        queryKey: ["get_guild_auditlog", id],
        queryFn: async () => {
            return await getCurrentGuildAuditLog(id);
        }
    })
}