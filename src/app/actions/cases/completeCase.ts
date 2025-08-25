"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function completeCase(caseId: string) {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.get(
    `https://api.mymod.com.au/api/cases/complete-case/${caseId}`,
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
}
