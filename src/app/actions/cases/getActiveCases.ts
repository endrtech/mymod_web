import axios from "axios";

export async function getActiveCases(serverId: string) {
  const resp = await axios.get(
    `http://localhost:3030/api/guilds/${serverId}/cases`,
  );

  if (resp.status === 200) {
    return resp.data;
  } else {
    return 400;
  }
}
