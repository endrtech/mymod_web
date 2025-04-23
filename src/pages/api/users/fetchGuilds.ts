import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function hander(req: NextApiRequest, res: NextApiResponse) {
    const resp = await axios.get(`http://localhost:3030/api/users/${req.query.userId}/guilds`);

    if(resp.status === 200) {
        return res.json(resp.data);
    } else {
        return res.status(400);
    }
}