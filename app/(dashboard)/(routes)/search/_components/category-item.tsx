"use client"

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";


interface CategoryItemProps {
  label: string
  icon: IconType,
  value?: string
}

export const CategoryItem = ({ label, icon: Icon, value }: CategoryItemProps) => {
  const pathName = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategoryId = searchParams.get("categoryId")
  const currentTitle = searchParams.get("title")
  const isSearchPage = pathName?.includes("/search")

  const isSelected = currentCategoryId === value

  const onClick = () => {
    let currentUrl = pathName
    if(!isSearchPage) currentUrl = "/search"
    const url = qs.stringifyUrl({
      url: currentUrl,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : value
      }
    }, { skipNull: true, skipEmptyString: true })

    router.push(url)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-md flex items-center w-fit gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 text-sky-700 bg-sky-200/20"
      )}
      type="button">
      {Icon && <Icon size={25} />}
      {label}
    </button>
  );
}