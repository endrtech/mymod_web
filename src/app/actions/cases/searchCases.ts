import axios from "axios";

export const searchCases = async (serverId: any, query: any) => {
  const resp = await axios.get(
    `http://localhost:3030/api/cases/search/${serverId}/${query}`,
  );

  if (resp.status === 200) {
    return resp.data;
  } else {
    return 400;
  }
};
