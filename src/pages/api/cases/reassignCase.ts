import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const resp = await axios.post(
    `http://localhost:3030/api/cases/reassign/${req.query.caseId}`,
    {
        assigneeId: req.body.assigneeId,
    },
    {
        headers: {
            "Content-Type": "application/json",
        }
    }
  );

  if (resp.status === 200) {
    return res.redirect(`/app/servers/${resp.data.guildID}/cases/${req.query.caseId}`);
  } else {
    return res.status(404);
  }
}