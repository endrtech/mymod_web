"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getCurrentGuildAuditLog(serverId: any) {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.get(
    `http://localhost:3030/api/guilds/${serverId}/audit-log`,
    {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    },
  );

  if (resp.status === 200) {
    console.log(resp.data);
    return resp.data;
  } else {
    return 400;
  }
}
