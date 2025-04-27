"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function getClerkUsers() {
  // --- Fetch Clerk Users ---
  const usersList = (await clerkClient()).users.getUserList({
    orderBy: "-created_at",
  });

  // --- Map and return ---
  return (await usersList).data.map((user) => ({
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || null,
    username: user.fullName || user.emailAddresses[0]?.emailAddress,
    createdAt: user.createdAt,
    imageUrl: user.imageUrl,
  }));
}
