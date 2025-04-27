import axios from "axios";

export const deleteCase = async (caseId: any) => {
  const resp = await axios.delete(
    `https://api.mymod.endr.tech/api/cases/${caseId}`,
  );

  if (resp.status === 200) {
    return 200;
  } else {
    return 400;
  }
};
