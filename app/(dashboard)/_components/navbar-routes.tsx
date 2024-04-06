"use client"

import { SearchInput } from "@/components/search-input"
import { BarChart, BookCopy, Compass, Layout, List } from "lucide-react"
import { usePathname } from "next/navigation"
import { SidebarItem } from "./sidebar-item"

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/"
  },
  {
    icon: Compass,
    label: "Explorer",
    href: "/search"
  },
  {
    icon: BookCopy,
    label: "Cours suivis",
    href: "/courses"
  },
]

const teacherRoute = [
  {
    icon: List,
    label: "Mes cours",
    href: "/teacher/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics"
  }
]

export const NavbarRoute = () => {
  const pathName = usePathname()

  const isTeacherMode = pathName?.includes("/teacher")
  const isSearchPage = pathName?.includes("/search")

  const routes = isTeacherMode ? teacherRoute : guestRoutes

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:flex">
          <SearchInput />
        </div>
      )}
      <div className="hidden md:flex ml-auto">
        {
          routes.map((route) => (
            <SidebarItem
              key={route.href}
              icone={route.icon}
              label={route.label}
              href={route.href}
            />
          ))
        }
      </div>
    </>
  )
}