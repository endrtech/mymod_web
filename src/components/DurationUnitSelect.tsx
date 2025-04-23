"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DurationUnitSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select unit of time..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="minutes">Minutes</SelectItem>
        <SelectItem value="hours">Hours</SelectItem>
      </SelectContent>
    </Select>
  )
}