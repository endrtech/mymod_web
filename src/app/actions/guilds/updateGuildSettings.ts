import axios from "axios";

export const updateGuildSettings = async (serverId: any, setting: any, content: any) => {
    const resp = await axios.post(`https://api.mymod.endr.tech/api/guilds/${serverId}`, {
        setting,
        content,
    });

    if(resp.status === 200) {
        return 200;
    } else {
        return 400;
    }
}