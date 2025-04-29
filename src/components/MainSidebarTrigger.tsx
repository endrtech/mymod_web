"use client";
import { useSidebar } from "./ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const MainSidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleSidebar}
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-[20] w-[40px] h-[40px] shadow-lg dark text-white rounded-full"
          >
            <Image src="/mymod_emblem.svg" width={30} height={30} alt="MYMOD" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-background text-white dark">
          Access MYMOD Menu
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
