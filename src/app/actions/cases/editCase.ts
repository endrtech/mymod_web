import axios from "axios";
import { v4 } from "uuid";

export const editCase = async (caseId: any, body: any) => {
  console.log(body);
  const resp = await axios.put(
    `https://api.mymod.endr.tech/api/cases/${caseId}`,
    body,
  );

  if (resp.status === 200) {
    return 200;
  } else {
    return 400;
  }
};
