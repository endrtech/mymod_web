'use server'

import { clerkClient } from "@clerk/nextjs/server"

export async function getUserGrowthRate() {
  const today = new Date()

  const lastMonth = new Date(today)
  lastMonth.setMonth(today.getMonth() - 1)

  const twoMonthsAgo = new Date(today)
  twoMonthsAgo.setMonth(today.getMonth() - 2)

  const usersList = (await clerkClient()).users.getUserList({
    limit: 500, // Clerk returns paginated, this is good for small-medium apps
    orderBy: "-created_at",
  })

  const lastMonthUsers = (await usersList).data.filter(user => {
    const createdAt = new Date(user.createdAt)
    return createdAt >= lastMonth
  })

  const twoMonthsAgoUsers = (await usersList).data.filter(user => {
    const createdAt = new Date(user.createdAt)
    return createdAt >= twoMonthsAgo && createdAt < lastMonth
  })

  const growthRate = ((lastMonthUsers.length - twoMonthsAgoUsers.length) / Math.max(twoMonthsAgoUsers.length, 1)) * 100

  return growthRate
}

