"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function warnGuildMember(serverId: any, userId: any, body: any) {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.post(
    `http://localhost:3030/api/guilds/${serverId}/members/${userId}/warn`,
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
}
