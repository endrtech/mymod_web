import axios from "axios";

export const getThemes = async () => {
  const response = await axios.get(
    "https://api.mymod.endr.tech/api/modules/theme_gallery?status=active",
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return 400;
  }
};
