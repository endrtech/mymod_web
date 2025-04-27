import axios from "axios";

export const getTheme = async (themeId: any) => {
  const response = await axios.get(
    `http://localhost:3030/api/modules/theme_gallery/${themeId}`,
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return 400;
  }
};
