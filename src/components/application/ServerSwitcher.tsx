"use client";
import React from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getUserGuilds } from "@/app/actions/getUserGuilds";
import { Avatar, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { permanentRedirect } from "next/navigation";

export const ServerSwitcher = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [servers, setServers] = React.useState<any>();

  React.useEffect(() => {
    const getData = async () => {
      const discordData = await getDiscordUser();
      const guilds = await getUserGuilds(discordData?.id);
      setServers(guilds);

      const currentServer = window.localStorage.getItem("currentServerId");

      if (currentServer) {
        setValue(currentServer);
      } else {
        setValue("");
      }
    };
    getData();
  }, []);

  const switchServer = async (id: string) => {
    window.localStorage.setItem("currentServerId", id);
    return permanentRedirect(`/:d:/app/server/${id}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-zinc-800/40 text-white inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors shadow-sm hover:bg-zinc-600/40 hover:text-white border-none h-9 px-4 py-2 w-auto justify-between"
        >
          {value ? (
            <span className="relative flex shrink-0 overflow-hidden rounded-full mr-2 h-5 w-5">
              <Image
                width={5}
                height={5}
                src={`https://cdn.discordapp.com/icons/${servers.find((server: any) => server.id === value)?.id}/${servers.find((server: any) => server.id === value)?.icon}`}
                className="w-full h-full aspect-square object-center object-contain"
                alt={servers.find((server: any) => server.id === value)?.name}
              />
            </span>
          ) : (
            ""
          )}
          {value
            ? servers.find((server: any) => server.id === value)?.name
            : "Select a server..."}
          <ChevronsUpDown className="opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 dark text-white" align="start">
        <Command className="bg-black border-zinc-900">
          <CommandInput placeholder="Search servers..." className="h-9" />
          <CommandList>
            <CommandEmpty>No servers found.</CommandEmpty>
            <CommandGroup>
              {servers?.map((server: any) => (
                <CommandItem
                  key={server.id}
                  value={server.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    switchServer(currentValue);
                  }}
                  className="flex flex-row justify-between items-center gap-2"
                >
                  <span className="flex flex-row justify-start items-center gap-1">
                    <Avatar>
                      <AvatarImage
                        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}`}
                        width={15}
                        height={15}
                        alt={server.name}
                      />
                    </Avatar>
                    {server.name}
                  </span>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === server.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
