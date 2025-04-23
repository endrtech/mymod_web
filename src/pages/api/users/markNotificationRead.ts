import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function hander(req: NextApiRequest, res: NextApiResponse) {
    const resp = await axios.get(`http://localhost:3030/api/users/${req.query.userId}/notification/${req.query.notificationId}`);

    if(resp.status === 200) {
        return res.redirect(`/app`);
    } else {
        return res.status(400);
    }
}