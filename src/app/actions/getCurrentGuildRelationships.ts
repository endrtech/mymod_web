import axios from "axios";

export async function getCurrentGuildRelationships(
    serverId: string
) {
    const resp = await axios.get(`http://localhost:3030/api/integrations/guild_relationships/${serverId}`);

    if(resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
}