"use client"

import { useDebounce } from "@/hooks/hook-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";


export const SearchInput = () => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value)

  const searchParams = useSearchParams()

  const pathName = usePathname()
  const router = useRouter()

  const currentCategoryId = searchParams.get("categoryId")

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathName,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue
      }
    }, { skipEmptyString: true, skipNull: true })

    router.push(url)
  }, [debouncedValue, currentCategoryId, router, pathName])

  return (
    <div className="relative">
      <Search
        className="h-5 w-5 absolute top-3 left-3 right-2 text-slate-600"
      />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[300px] pl-9 rounded-md bg-slate-50 focus-visible:ring-slate-200"
        placeholder="Rechercher un cours"
      />
    </div>
  );
}