"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { DialogTitle } from "../ui/dialog";

export default function DatePickerDrawer({
  onChange,
  value,
}: {
  onChange?: (isoString: string) => void;
  value?: Date;
}) {
  const [date, setDate] = useState<Date | undefined>(value);

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    if (selected && onChange) {
      onChange(selected.toISOString());
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal text-white"
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-zinc-400">Pick a date</span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0 dark text-white">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="p-2 flex flex-col items-center">
          <Calendar mode="single" selected={date} onSelect={handleSelect} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
