import axios from "axios";

export async function getGuildMemberWarns(serverId: any, userId: any) {
  const resp = await axios.get(
    `https://api.mymod.endr.tech/api/guilds/${serverId}/members/${userId}/warns`,
  );

  if (resp.status === 200) {
    return resp.data;
  } else {
    return 404;
  }
}
