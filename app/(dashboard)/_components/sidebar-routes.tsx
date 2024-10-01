"use client";

import { BarChart, Bot, Compass, Layout, List, ListEnd } from "lucide-react";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Accueil",
    href: "/",
  },
  {
    icon: Compass,
    label: "Explorer",
    href: "/search",
  },
  {
    icon: Bot,
    label: "Générer un cours",
    href: "/ai-generator",
  },
];

const teacherRoute = [
  {
    icon: List,
    label: "Mes cours",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: ListEnd,
    label: "Catégories",
    href: "/teacher/category",
  },
];

export const SidebarRoutes = () => {
  const pathName = usePathname();

  const isTeacherMode = pathName?.includes("/teacher");

  const routes = isTeacherMode ? teacherRoute : guestRoutes;

  return (
    <div className="flex flex-col w-full gap-y-2 mt-2">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icone={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
