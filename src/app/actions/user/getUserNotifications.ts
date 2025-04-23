import axios from "axios";

export default async function getUserNotifications (userId: any) {
    const resp = await axios.get(`https://api.mymod.endr.tech/api/users/${userId}/notifications`);

    if(resp.status === 200) {
        return resp.data;
    } else {
        return 400;
    }
}