import axios from "axios";

export async function timeoutGuildMember (serverId: any, userId: any, body: any) {
    const resp = await axios.post(`https://api.mymod.endr.tech/api/guilds/${serverId}/members/${userId}/timeout`, body);

    if(resp.status === 200) {
        return 200;
    } else {
        return 400;
    }
}