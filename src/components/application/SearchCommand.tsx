import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { permanentRedirect } from "next/navigation";

export const SearchCommand = ({ serverId }: any) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded dark border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>{" "}
        to search
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="What do you want to find?" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Ask MYMOD Intelligence</CommandItem>
            <CommandItem
              onClick={() => {
                return permanentRedirect(
                  `/:d:/app/server/${serverId}/settings`,
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  return permanentRedirect(
                    `/:d:/app/server/${serverId}/settings`,
                  );
                }
              }}
            >
              Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
