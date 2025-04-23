import axios from "axios";

export async function getGuildChannels (serverId: any) {
    const resp = await axios.get(`http://localhost:3030/api/guilds/${serverId}/channels`);

    if(resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
}