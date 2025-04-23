import axios from "axios";

export async function getUser(userId: string) {
    try {
        const resp = await axios.get(`https://api.mymod.endr.tech/api/users/${userId}`);
        if (resp.status === 200) {
            return resp.data;
        } else {
            return 404;
        }
    } catch (error) {
        console.log(error);
        return 404;
    }
}