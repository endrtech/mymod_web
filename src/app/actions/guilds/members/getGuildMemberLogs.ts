import axios from "axios";

export async function getGuildMemberLogs(serverId: any, userId: any) {
  const resp = await axios.get(
    `https://api.mymod.endr.tech/api/guilds/${serverId}/members/${userId}/audit-log`,
  );

  if (resp.status === 200) {
    return resp.data;
  } else {
    return 404;
  }
}
