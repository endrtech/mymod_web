import axios from "axios";

export const getUserThemes = async (userId: any) => {
  const response = await axios.get(
    `https://api.mymod.endr.tech/api/modules/theme_gallery/created/${userId}`,
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return 400;
  }
};
