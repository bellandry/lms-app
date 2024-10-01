"use client";

import { BarChart, Bot, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Accueil",
    href: "/",
    badge: false,
  },
  {
    icon: Compass,
    label: "Explorer",
    href: "/search",
    badge: false,
  },
  {
    icon: Bot,
    label: "Générer un cours",
    href: "/ai-generator",
    badge: true,
  },
];

const teacherRoute = [
  {
    icon: List,
    label: "Mes cours",
    href: "/teacher/courses",
    badge: false,
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
    badge: false,
  },
];

export const NavbarRoute = () => {
  const pathName = usePathname();

  const isTeacherMode = pathName?.includes("/teacher");

  const routes = isTeacherMode ? teacherRoute : guestRoutes;

  return (
    <>
      <div className="hidden md:flex ml-auto">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icone={route.icon}
            label={route.label}
            href={route.href}
            badge={route.badge!}
          />
        ))}
      </div>
    </>
  );
};
