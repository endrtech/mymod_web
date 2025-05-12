"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function reassignCase(
  caseId: string,
  body: {
    assigneeId: any;
    executorId: any;
  },
) {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.post(
    `http://localhost:3030/api/cases/reassign/${caseId}`,
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
    return 404;
  }
}
