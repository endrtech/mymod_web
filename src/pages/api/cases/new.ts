import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const form = req.body;
  const actionsTaken = [];

  actionsTaken.push("default");
 if(form.ban_user == "on") {
    actionsTaken.push("ban_user");
  } 
  if(form.kick_user == "on") {
    actionsTaken.push("kick_user");
  } 
  if(form.unban_user == "on") {
    actionsTaken.push("unban_user");
  } 
  if(form.timeout_user == "on") {
    actionsTaken.push("timeout_user");
  } 
  if(form.auto_close == "on") {
    actionsTaken.push("auto_close");
  } 
  if(form.reassign_after_create == "on") {
    actionsTaken.push("reassign_after_create");
  } 
  if(form.send_case_dm == "on") {
    actionsTaken.push("send_case_dm");
  } 
  if(form.broadcast_log_msg == "on") {
    actionsTaken.push("broadcast_log_msg");
  }

  await axios.post(
    `http://localhost:3030/api/cases/${req.query.caseId}`,
    {
      guildId: req.query.serverId,
      userId: form.username || form.user_id,
      assigneeId: form.case_assignee,
      case_type: form.case_type,
      case_reason: form.case_reason,
      case_duration: form.case_duration * 1000 * 60 * 60 * 24 || null,
      actions_taken: actionsTaken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.redirect(`/app/servers/${req.query.serverId}/cases`);
  // return res.json(form);
}
