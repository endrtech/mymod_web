import axios from "axios";

export async function rollbackCase(caseId: string) {
  const resp = await axios.get(
    `http://localhost:3030/api/cases/rollback-case/${caseId}`,
  );

  if (resp.status === 200) {
    return 200;
  } else {
    return 400;
  }
}
