import axios from "axios";

export async function searchAuditLogs(serverId: any, query: any) {
  const resp = await axios.get(
    `https://api.mymod.endr.tech/api/guilds/${serverId}/audit-log/search/${query}`,
  );

  if (resp.status === 200) {
    return resp.data;
  } else {
    return 400;
  }
}
