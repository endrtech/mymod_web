"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { v4 } from "uuid";

export const editCase = async (caseId: any, body: any) => {
  const sessionToken = (await cookies()).get("__session");
  console.log(body);
  const resp = await axios.put(
    `https://api.mymod.com.au/api/cases/${caseId}`,
    body,
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
