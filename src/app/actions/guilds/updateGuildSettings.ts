"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const updateGuildSettings = async (
  serverId: any,
  setting: any,
  content: any,
) => {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.post(
    `https://api.mymod.com.au/api/guilds/${serverId}`,
    {
      setting,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    },
  );

  if (resp.status === 200) {
    return 200;
  } else {
    return 400;
  }
};
