import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await axios.get(
    `http://localhost:3030/api/cases/complete-case/${req.query.caseId}`,
  );

  return res.redirect(`/app/servers/${req.query.serverId}/cases`);
  // return res.json(form);
}
