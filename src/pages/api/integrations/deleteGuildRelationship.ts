import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    await axios.delete(`https://api.mymod.invertuo.cc/api/integrations/guild_relationships/${req.query.serverId}/${req.query.userId}`);

    return res.redirect(`/app/servers/${req.query.serverId}/team`)
}