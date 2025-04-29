import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";

export async function NavUser() {
  const loggedInUser = await currentUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-row gap-2">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage
              src={loggedInUser?.imageUrl}
              alt={`${loggedInUser?.primaryEmailAddress}`}
            />
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {loggedInUser?.fullName ||
                `${loggedInUser?.primaryEmailAddress?.emailAddress}`}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {`${loggedInUser?.primaryEmailAddress?.emailAddress}`}
            </span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
