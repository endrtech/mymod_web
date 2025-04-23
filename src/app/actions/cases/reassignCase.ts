import axios from "axios";

export async function reassignCase(
    caseId: string,
    body: {
        assigneeId: any,
        executorId: any
    }
) {
    const resp = await axios.post(
        `https://api.mymod.endr.tech/api/cases/reassign/${caseId}`,
        body
      );
    
      if (resp.status === 200) {
        return 200;
      } else {
        return 404;
      }
}