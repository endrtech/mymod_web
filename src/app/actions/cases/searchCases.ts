"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const searchCases = async (serverId: any, query: any) => {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.get(
    `https://api.mymod.com.au/api/cases/search/${serverId}/${query}`,
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
};
