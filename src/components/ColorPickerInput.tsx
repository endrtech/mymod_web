"use client"

import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ColorPickerInput({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[100%] dark text-white justify-start text-left font-normal"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-sm border"
              style={{ backgroundColor: value }}
            />
            <span className="uppercase">{value}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit dark p-4">
        <HexColorPicker color={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}
