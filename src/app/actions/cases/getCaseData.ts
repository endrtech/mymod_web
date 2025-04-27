import axios from "axios";

export async function getCaseData(caseId: string) {
  const resp = await axios.get(
    `https://api.mymod.endr.tech/api/cases/${caseId}`,
  );

  if (resp.status === 200) {
    return resp.data;
  } else {
    return 404;
  }
}
