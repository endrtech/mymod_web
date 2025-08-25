"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getUser(userId: string) {
  const sessionToken = (await cookies()).get("__session");
  try {
    const resp = await axios.get(
      `https://api.mymod.com.au/api/users/${userId}`,
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
  } catch (error) {
    console.log(error);
    return 404;
  }
}
