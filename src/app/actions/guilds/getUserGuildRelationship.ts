import axios from "axios";

export async function getUserGuildRelationship (serverId: any, userId: any) {
    const resp = await axios.get(`https://api.mymod.endr.tech/api/integrations/guild_relationships/${serverId}/${userId}`);

    if(resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
}