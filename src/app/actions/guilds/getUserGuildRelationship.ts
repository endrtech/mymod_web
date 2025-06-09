"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getUserGuildRelationship(serverId: any, userId: any) {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.get(
    `https://api.mymod.endr.tech/api/integrations/guild_relationships/${serverId}/${userId}`,
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
}
