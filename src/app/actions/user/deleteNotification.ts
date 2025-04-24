import axios from "axios"

export const deleteNotification = async (userId: any, notificationId: any) => {
    const response = await axios.delete(`https://api.mymod.endr.tech/api/users/${userId}/notification/${notificationId}`);

    if(response.status === 200) {
        return 200;
    } else {
        return 400;
    }
}