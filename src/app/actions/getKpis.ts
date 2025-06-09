"use server";

import { clerkClient } from "@clerk/nextjs/server";
import axios from "axios";

export async function getKpis() {
  const response = await axios.get(
    "http://localhost:3030/api/dashboard/guilds",
  );
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const twoMonthsAgo = new Date(lastMonth);
  twoMonthsAgo.setMonth(lastMonth.getMonth() - 1);

  // Fetch users
  const users = (await clerkClient()).users.getUserList({ limit: 500 });
  const thisMonthUsers = (await users).data.filter(
    (u) => new Date(u.createdAt) >= lastMonth,
  );
  const lastMonthUsers = (await users).data.filter((u) => {
    const createdAt = new Date(u.createdAt);
    return createdAt >= twoMonthsAgo && createdAt < lastMonth;
  });

  // Fetch guilds
  const guilds = response.data;
  const thisMonthGuilds = guilds.filter((g: any) => g.createdAt >= lastMonth);
  const lastMonthGuilds = guilds.filter(
    (g: any) => g.createdAt >= twoMonthsAgo && g.createdAt < lastMonth,
  );

  return {
    clerkTotal: (await users).totalCount,
    clerkThisMonth: thisMonthUsers.length,
    clerkLastMonth: lastMonthUsers.length,
    guildTotal: guilds.length,
    guildThisMonth: thisMonthGuilds.length,
    guildLastMonth: lastMonthGuilds.length,
  };
}
