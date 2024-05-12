import { IconBadge } from "@/components/icon-badge"
import { LucideIcon } from "lucide-react"

interface InfoCardProps {
  numberOfItems: number
  variant?: 'default' | 'success'
  label: string
  icon: LucideIcon
}

export const InfoCard = ({numberOfItems, variant, label, icon }: InfoCardProps) => {
  return (
    <div className="border rounded-md items-center flex gap-x-3 p-3">
      <IconBadge
        variant={variant}
        icon={icon}
      />
      <div>
        <p className="font-medium">
          {label}
        </p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} { numberOfItems === 1 ? 'Cours' : 'Cours'}
        </p>
      </div>
    </div>
  )
}