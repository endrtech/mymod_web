// components/recent-users.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentUsers({ users }: any) {
  return (
    <Card className="w-full h-[100%]">
      <CardHeader>
        <CardTitle>Recent Joins</CardTitle>
        <p className="text-sm text-muted-foreground">
          {users?.length} users joined recently.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 dark-text-white">
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
                <p className="text-sm text-muted-foreground">{user.userId}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-white self-end md:self-start">
              Joined {new Date(user.joinedTimestamp).toLocaleDateString()}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
