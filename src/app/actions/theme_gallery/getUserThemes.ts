import axios from "axios";

export const getUserThemes = async (userId: any) => {
  const response = await axios.get(
    `http://localhost:3030/api/modules/theme_gallery/created/${userId}`,
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return 400;
  }
};
