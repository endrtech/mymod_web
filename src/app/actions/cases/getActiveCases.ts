import axios from "axios";

export async function getActiveCases(serverId: string) {
    const resp = await axios.get(
        `https://api.mymod.endr.tech/api/guilds/${serverId}/cases`,
    );

    if (resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
};