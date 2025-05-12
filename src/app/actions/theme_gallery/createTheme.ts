"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const createTheme = async () => {
  const sessionToken = (await cookies()).get("__session");
  const response = await axios.post(
    "https://api.mymod.endr.tech/api/modules/theme_gallery",
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
    {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    },
  );

  if (response.status === 200) {
    return response.data.id;
  } else {
    return 400;
  }
};
