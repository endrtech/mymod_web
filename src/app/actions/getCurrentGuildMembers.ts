"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getCurrentGuildMembers(serverId: any, requestType?: any) {
  if (!requestType) {
    const sessionToken = (await cookies()).get("__session");
    const resp = await axios.get(
      `http://localhost:3030/api/guilds/${serverId}/members`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken?.value}`,
        },
      },
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return 400;
    }
  } else if (requestType === "ai") {
    const resp = await axios.get(
      `http://localhost:3030/api/guilds/${serverId}/members`,
      {
        headers: {
          "X-MYMOD-Client-User-Authentication": `${process.env.MYMOD_CLIENT_USER_AUTH_KEY}`,
        },
      },
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return 400;
    }
  }
}
