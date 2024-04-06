"use client"

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

export const SidebarRoutes = () => {
  const pathName = usePathname()

  const isTeacherMode = pathName?.includes("/teacher")
  const isSearchPage = pathName?.includes("/search")

  const routes = isTeacherMode ? teacherRoute : guestRoutes

  return (
    <div className="flex flex-col w-full gap-y-2 mt-2">
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
  )
}