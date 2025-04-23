import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const resp = await axios.delete(
    `http://localhost:3030/api/cases/${req.query.caseId}`,
  );

  if (resp.status === 200) {
    return res.redirect(`/app/servers/${req.query.serverId}/cases/`);
  } else {
    return res.status(resp.status);
  }
}
