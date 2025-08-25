"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const getThemesUnderReview = async () => {
  const sessionToken = (await cookies()).get("__session");
  const response = await axios.get(
    `https://api.mymod.com.au/api/modules/theme_gallery?status=pending_review`,
    {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    },
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return 400;
  }
};
