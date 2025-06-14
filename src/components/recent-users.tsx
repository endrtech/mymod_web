// components/recent-users.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveCard } from "@/components/interactive-card";
import { LiquidGlassCard } from "./beta/liquid-glass-card";
import { Button } from "./beta/liquid-glass/button";
import LiquidGlass from "./beta/liquid-glass/card";

interface RecentUsersProps {
  users: any;
}

export default function RecentUsers({ users }: RecentUsersProps) {
  return (
    <LiquidGlass className="rounded-[999px] justify-start" cornerRadius={48} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0}>
      <div className="p-6">
        <CardHeader>
          <CardTitle className="text-shadow-sm">Recent Joins</CardTitle>
          <p className="text-sm text-white text-shadow-sm mb-4">
            {users?.length} users joined recently.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          {users?.map((user: any) => (
            <div
              key={user.userId}
              className="flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={user?.displayAvatarURL}
                    alt={user.displayName}
                  />
                  <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.displayName}
                  </p>
                  <p className="text-sm text-white">{user.userId}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-white self-end md:self-start">
                Joined {new Date(user.joinedTimestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </CardContent>
      </div>
    </LiquidGlass>
  );
}
