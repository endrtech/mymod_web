"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const deleteNotification = async (userId: any, notificationId: any) => {
  const sessionToken = (await cookies()).get("__session");
  const response = await axios.delete(
    `http://localhost:3030/api/users/${userId}/notification/${notificationId}`,
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
