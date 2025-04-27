import axios from "axios";

export const deleteTheme = async (themeId: any) => {
  const response = await axios.delete(
    `http://localhost:3030/api/modules/theme_gallery/${themeId}`,
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return 400;
  }
};
