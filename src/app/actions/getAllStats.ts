"use server";

import { clerkClient } from "@clerk/nextjs/server";
import axios from "axios";

export async function getAllStats() {
  // --- Fetch Clerk Users ---
  const usersList = (await clerkClient()).users.getUserList({
    limit: 500,
    orderBy: "-created_at",
  });

  const usersGrouped: Record<string, number> = {};
  (await usersList).data.forEach((user: any) => {
    const day = new Date(user.createdAt).toISOString().slice(0, 10);
    usersGrouped[day] = (usersGrouped[day] || 0) + 1;
  });

  // --- Fetch Guilds from your API ---
  const guildsGrouped: Record<string, number> = {};

  try {
    const response = await axios.get(
      `https://api.mymod.com.au/api/dashboard`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch guild stats");
    }

    const guildData = await response.data;

    // Assume your API returns [{ _id: "2025-04-26", count: 2 }, ...]
    guildData.guilds.forEach((g: { _id: string; count: number }) => {
      guildsGrouped[g._id] = g.count;
    });
  } catch (error) {
    console.error("Failed to fetch guild data", error);
  }

  return {
    usersGrouped,
    guildsGrouped,
  };
}
