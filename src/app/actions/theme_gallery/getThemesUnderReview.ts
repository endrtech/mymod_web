import axios from "axios";

export const getThemesUnderReview = async () => {
  const response = await axios.get(
    `https://api.mymod.endr.tech/api/modules/theme_gallery?status=pending_review`,
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return 400;
  }
};
