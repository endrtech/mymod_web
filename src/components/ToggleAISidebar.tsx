"use client";

import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export const ToggleAISidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      className="dark text-white"
      onClick={toggleSidebar}
    >
      <Sparkles />
    </Button>
  );
};
