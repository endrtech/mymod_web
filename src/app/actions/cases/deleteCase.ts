"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const deleteCase = async (caseId: any) => {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.delete(
    `https://api.mymod.endr.tech/api/cases/${caseId}`,
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
