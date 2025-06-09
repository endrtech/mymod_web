"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getAllGuilds() {
  const sessionToken = (await cookies()).get("__session");
  const response = await axios.get("https://api.mymod.endr.tech/api/guilds", {
    headers: {
      Authorization: `Bearer ${sessionToken?.value}`,
    },
  });

  if (response.status === 200) {
    return response.data;
  } else {
    return response.statusText;
  }
}
