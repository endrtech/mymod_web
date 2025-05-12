"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const deleteTheme = async (themeId: any) => {
  const sessionToken = (await cookies()).get("__session");
  const response = await axios.delete(
    `https://api.mymod.endr.tech/api/modules/theme_gallery/${themeId}`,
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
