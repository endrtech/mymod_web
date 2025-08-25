"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const markNotificationRead = async (
  userId: any,
  notificationId: any,
) => {
  const sessionToken = (await cookies()).get("__session");
  const response = await axios.get(
    `https://api.mymod.com.au/api/users/${userId}/notification/read/${notificationId}`,
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
