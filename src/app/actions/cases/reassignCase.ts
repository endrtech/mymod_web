import axios from "axios";

export async function reassignCase(
    caseId: string,
    body: {
        assigneeId: any,
        executorId: any
    }
) {
    const resp = await axios.post(
        `http://localhost:3030/api/cases/reassign/${caseId}`,
        body
      );
    
      if (resp.status === 200) {
        return 200;
      } else {
        return 404;
      }
}