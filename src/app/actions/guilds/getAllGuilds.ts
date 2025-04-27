import axios from "axios";

export async function getAllGuilds() {
  const response = await axios.get("http://localhost:3030/api/guilds");

  if (response.status === 200) {
    return response.data;
  } else {
    return response.statusText;
  }
}
