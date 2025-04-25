import axios from "axios";

export default async function getCurrentGuild (serverId: any) {
    const resp = await axios.get(`https://api.mymod.endr.tech/api/guilds/${serverId}`);

    if(resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
}