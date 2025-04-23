import axios from "axios";

export async function importAuditLogData(serverId: string) {
    const resp = await axios.get(`https://api.mymod.endr.tech/api/guilds/${serverId}/audit-log/import-discord`);

    if (resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
}