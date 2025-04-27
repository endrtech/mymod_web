import axios from "axios";

export const createTheme = async () => {
  const response = await axios.post(
    "http://localhost:3030/api/modules/theme_gallery",
    {
      name: "",
      description: "",
      color_1: "",
      color_2: "",
      color_3: "",
      background: "",
      font: "",
      overlayPercent: "",
    },
  );

  if (response.status === 200) {
    return response.data.id;
  } else {
    return 400;
  }
};
