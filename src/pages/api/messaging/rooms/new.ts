import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const form = req.body;
    const roomId = crypto.randomUUID();

    const sendReq = await axios.post(`http://localhost:3001/api/v1/rooms/${roomId}`, {
        userId: form.userId,
        guildId: form.guildId,
        enquiry: form.enquiry,
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(sendReq.status === 201) {
        return res.redirect(`/app/servers/${form.guildId}/inbox?msgCreated=true`)
    } else {
        return res.redirect(`/app/servers/${form.guildId}/inbox?error=${sendReq.statusText}`)
    }
}