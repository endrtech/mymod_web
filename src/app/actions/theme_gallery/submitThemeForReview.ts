"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const submitThemeForReview = async (
  themeId: any,
  userId: any,
  body: any,
) => {
  const sessionToken = (await cookies()).get("__session");
  const response = await axios.post(
    `http://localhost:3030/api/modules/theme_gallery/${userId}/${themeId}`,
    {
      name: body.name,
      description: body.description,
      color_1: body.color_1,
      color_2: body.color_2,
      color_3: body.color_3,
      background: body.background,
      font: body.font,
      overlayPercent: body.overlayPercent,
      status: body.status,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    },
  );

  if (response.status === 200) {
    return 200;
  } else {
    return 400;
  }
};
