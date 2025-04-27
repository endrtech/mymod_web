import axios from "axios";

export const markNotificationRead = async (
  userId: any,
  notificationId: any,
) => {
  const response = await axios.get(
    `https://api.mymod.endr.tech/api/users/${userId}/notification/read/${notificationId}`,
  );

  if (response.status === 200) {
    return 200;
  } else {
    return 400;
  }
};
