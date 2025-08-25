"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function warnGuildMember(serverId: any, userId: any, body: any, requestType?: any) {
  if (!requestType) {
    const sessionToken = (await cookies()).get("__session");
    const resp = await axios.post(
      `https://api.mymod.com.au/api/guilds/${serverId}/members/${userId}/warn`,
      body,
      {
        headers: {
          Authorization: `Bearer ${sessionToken?.value}`,
        },
      },
    );

    if (resp.data.status === 200) {
      return 200;
    } else {
      return resp.data.message;
    }
  } else if (requestType === "ai") {
    const resp = await axios.post(
      `https://api.mymod.com.au/api/guilds/${serverId}/members/${userId}/warn`,
      body,
      {
        headers: {
          'X-MYMOD-Client-User-Authentication': `${process.env.MYMOD_CLIENT_USER_AUTH_KEY}`,
        },
      },
    );

    if (resp.data.status === 200) {
      return 200;
    } else {
      return resp.data.message;
    }
  }
}
