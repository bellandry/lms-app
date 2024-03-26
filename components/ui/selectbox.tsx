"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectboxProps {
  options: { label: string; value: string }[]
  label?: string
  value?: string
  onChange: (value: string) => void
};

export function Selectbox({ options, label, value, onChange }: SelectboxProps) {

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionnez un élément..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label || "Eléments"}</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >{option.label}</SelectItem>
          )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
