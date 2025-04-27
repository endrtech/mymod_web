import axios from "axios";

export async function getCurrentGuildAuditLog(serverId: any) {
  const resp = await axios.get(
    `http://localhost:3030/api/guilds/${serverId}/audit-log`,
  );

  if (resp.status === 200) {
    console.log(resp.data);
    return resp.data;
  } else {
    return 400;
  }
}
