import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";

const BannerVariants = cva(
  "border tex-center p-4 text-sm flex items-ceter w-fullw-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-100 border-yellow-300 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary"
      }
    },
    defaultVariants: {
      variant: "warning"
    }
  }
)

interface BannerProps extends VariantProps<typeof BannerVariants> {
  label: string
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon
}

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"]

  return (
    <div className={cn(BannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
}
