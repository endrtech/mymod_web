import axios from "axios";

export async function getGuildMemberTimeouts(serverId: any, userId: any) {
  const resp = await axios.get(
    `http://localhost:3030/api/guilds/${serverId}/members/${userId}/timeouts`,
  );

  if (resp.status === 200) {
    return resp.data;
  } else {
    return 404;
  }
}
