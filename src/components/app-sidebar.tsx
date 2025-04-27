import * as React from "react";
import {
  IconBrush,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconServer,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { GitBranch } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/:d:/app/manage",
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: "/:d:/app/manage/users",
      icon: IconUsers,
    },
    {
      title: "Guilds",
      url: "/:d:/app/manage/guilds",
      icon: IconServer,
    },
    {
      title: "Version Manager",
      url: "/:d:/app/manage/version_manager",
      icon: GitBranch,
    },
  ],
  documents: [
    {
      name: "Review Queue",
      url: "/:d:/app/manage/modules/theme_gallery/review_queue",
      icon: IconReport,
    },
    {
      name: "Active Themes",
      url: "/:d:/app/manage/modules/theme_gallery",
      icon: IconBrush,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/:d:/app/manage">
                <Avatar className="w-5 h-5">
                  <AvatarImage src="/mymod_emblem.svg" alt="MYMOD" />
                </Avatar>
                <span className="text-base font-semibold">MYMOD Manager</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
