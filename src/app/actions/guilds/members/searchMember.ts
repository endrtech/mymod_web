import axios from "axios";

export async function searchMember (serverId: any, query: any) {
    const resp = await axios.get(`http://localhost:3030/api/guilds/${serverId}/members/search/${query}`);

    if(resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
}