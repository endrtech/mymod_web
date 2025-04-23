import axios from "axios";

export async function warnGuildMember (serverId: any, userId: any, body: any) {
    const resp = await axios.post(`http://localhost:3030/api/guilds/${serverId}/members/${userId}/warn`, body);

    if(resp.data.status === 200) {
        return 200;
    } else {
        return resp.data.message
    }
}