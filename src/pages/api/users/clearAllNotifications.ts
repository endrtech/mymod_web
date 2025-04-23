import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function hander(req: NextApiRequest, res: NextApiResponse) {
    const resp = await axios.delete(`http://localhost:3030/api/users/${req.query.userId}/notifications`);

    if(resp.status === 200) {
        return res.redirect(`/app`)
    } else {
        return res.status(400);
    }
}