import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const resp = await axios.post(
    `http://localhost:3030/api/cases/add-comment/${req.query.caseId}`,
    {
      userId: req.query.userId,
      avatar: req.query.avatarUrl,
      comment: req.body.comment,
    },
  );

  const caseData = await axios.get(
    `http://localhost:3030/api/cases/${req.query.caseId}`,
  );

  if (resp.status === 200) {
    return res.redirect(
      `/app/servers/${caseData.data.guildID}/cases/${req.query.caseId}`,
    );
  } else {
    return res.status(resp.status);
  }
}
