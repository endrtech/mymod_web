"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

export default function DatePicker({
  onChange,
  value,
}: {
  onChange?: (isoString: string) => void
  value?: Date
}) {
  const [date, setDate] = useState<Date | undefined>(value)

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected)
    if (selected && onChange) {
      onChange(selected.toISOString())
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal bg-background/50 backdrop-blur-xl border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] rounded-full">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-background/50 backdrop-blur-md border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] pointer-events-none rounded-3xl" align="start">
        <div className="p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}