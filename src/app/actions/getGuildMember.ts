"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getGuildMember(serverId: string, memberId: string, requestType?: any) {
  if (!requestType) {
    const sessionToken = (await cookies()).get("__session");
    const resp = await axios.get(
      `https://api.mymod.endr.tech/api/guilds/${serverId}/members/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken?.value}`,
        },
      },
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return 404;
    }
  } else if (requestType === "ai") {
    const resp = await axios.get(
      `https://api.mymod.endr.tech/api/guilds/${serverId}/members/${memberId}`,
      {
        headers: {
          'X-MYMOD-Client-User-Authentication': `${process.env.MYMOD_CLIENT_USER_AUTH_KEY}`,
        },
      },
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return 404;
    }
  }
}
