import axios from "axios";

export async function getUserGuilds (userId: string) {
    const resp = await axios.get(`http://localhost:3030/api/users/${userId}/guilds`);

    if(resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
}