import axios from "axios";

export const getTotalGuilds = async () => {
  const response = await axios.get(
    "https://api.mymod.endr.tech/api/dashboard/guild-count",
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return 400;
  }
};
