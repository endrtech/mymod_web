import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    switch (req.query.setting) {
        case "server_name":
            await axios.post(`http://localhost:3030/api/guilds/${req.query.serverId}`, {
                content: req.body.server_name,
                setting: "server_name",
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            break;
        case "verification_level":
            await axios.post(`http://localhost:3030/api/guilds/${req.query.serverId}`, {
                content: req.body.verification_level,
                setting: "verification_level",
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            break;
        case "nsfw_level":
            await axios.post(`http://localhost:3030/api/guilds/${req.query.serverId}`, {
                content: req.body.nsfw_level,
                setting: "nsfw_level",
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            break;
        case "boost_progress_bar":
            console.log(req.body.boost_progress_bar)
            await axios.post(`http://localhost:3030/api/guilds/${req.query.serverId}`, {
                content: req.body.boost_progress_bar,
                setting: "boost_progress_bar",
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            break;
    }

    res.redirect(`/app/servers/${req.query.serverId}/settings`)
}