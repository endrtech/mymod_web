"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getGuildMemberWarns(serverId: any, userId: any) {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.get(
    `http://localhost:3030/api/guilds/${serverId}/members/${userId}/warns`,
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
