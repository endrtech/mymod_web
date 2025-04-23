import axios from "axios";

export async function getCaseData(
    caseId: string
) {
    const resp = await axios.get(
        `http://localhost:3030/api/cases/${caseId}`,
      );
    
      if (resp.status === 200) {
        return resp.data;
      } else {
        return 404;
      }
}