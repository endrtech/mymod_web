import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const form = req.body;
    const resp = await axios.post(`https://api.mymod.invertuo.cc/api/integrations/guild_relationships/${req.query.serverId}`, {
        role: form.relRole,
        userId: form.userId,
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    if(resp.status === 201) {
        return res.status(201);
    }
}