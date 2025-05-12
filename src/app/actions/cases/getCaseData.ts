"user server";
import axios from "axios";
import { cookies } from "next/headers";

export async function getCaseData(caseId: string) {
  const sessionToken = (await cookies()).get("__session");
  const resp = await axios.get(`http://localhost:3030/api/cases/${caseId}`, {
    headers: {
      Authorization: `Bearer ${sessionToken?.value}`,
    },
  });

  if (resp.status === 200) {
    return resp.data;
  } else {
    return 404;
  }
}
