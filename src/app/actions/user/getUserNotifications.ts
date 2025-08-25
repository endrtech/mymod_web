"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function getUserNotifications(userId: any) {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.get(
    `https://api.mymod.com.au/api/users/${userId}/notifications`,
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
