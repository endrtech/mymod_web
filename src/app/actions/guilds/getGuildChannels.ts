import axios from "axios";

export async function getGuildChannels (serverId: any, type: any) {
    const resp = await axios.get(`https://api.mymod.endr.tech/api/guilds/${serverId}/channels?type=${type}`);

  if (resp.status === 200) {
    return resp.data;
  } else {
    return 400;
  }
}
