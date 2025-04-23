import axios from "axios";

export async function getGuildMember (
    serverId: string,
    memberId: string
) {
    const resp = await axios.get(
        `https://api.mymod.endr.tech/api/guilds/${serverId}/members/${memberId}`,
      );
    
      if (resp.status === 200) {
        return resp.data;
      } else {
        return 404;
      }
}