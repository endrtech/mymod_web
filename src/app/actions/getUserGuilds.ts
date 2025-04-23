import axios from "axios";

export async function getUserGuilds (userId: string) {
    const resp = await axios.get(`https://api.mymod.endr.tech/api/users/${userId}/guilds`);

    if(resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
}