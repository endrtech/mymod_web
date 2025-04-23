import axios from "axios";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { useSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    var userData;

    // Fetch user from API
    const mmUserResp = await axios.get(`https://localhost:3030/users/${userId}`);
    if(mmUserResp.status === 200) {
        userData = mmUserResp.data.data;
    } else {
        return res.status(400);
    }

    // Generate new HS token
    const hsTokenResp = await axios.post(`https://api.hubspot.com/conversations/v3/visitor-identification/tokens/create`, {
        email: userData.email,

    })

    return ;
}