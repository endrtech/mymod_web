import axios from "axios"

export const deleteNotification = async (userId: any, notificationId: any) => {
    const response = await axios.delete(`http://localhost:3030/api/users/${userId}/${notificationId}`);

    if(response.status === 200) {
        return 200;
    } else {
        return 400;
    }
}