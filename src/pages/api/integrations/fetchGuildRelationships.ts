import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const resp = await axios.get(`https://api.mymod.invertuo.cc/api/integrations/guild_relationships/${req.query.serverId}`);

    if(resp.status === 200) {
        return res.json(resp.data);
    } else {
        return res.status(400);
    }
}