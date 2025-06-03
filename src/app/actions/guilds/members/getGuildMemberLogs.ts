"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getGuildMemberLogs(serverId: any, userId: any) {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.get(
    `https://api.mymod.endr.tech/api/guilds/${serverId}/members/${userId}/audit-log`,
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
}
