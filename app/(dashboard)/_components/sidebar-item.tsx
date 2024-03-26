"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icone: LucideIcon,
  label: string,
  href: string
}

export const SidebarItem = ({ icone: Icon, label, href }: SidebarItemProps) => {
  const pathName = usePathname()
  const router = useRouter()

  const isActive = (pathName === "/" && href === "/") || pathName === href || pathName?.startsWith(`${href}/`)

  const handleClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-4 pr-4 transition-all",

      )}
    >
      <div className={cn(
        "h-full w-full flex items-center gap-x-2 rounded-md p-3 hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
      >
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-sky-700"
          )}
        />
        {label}
      </div>
    </button>
  );
}