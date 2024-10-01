"use client";

import { guestRoutes, teacherRoute } from "@/constants";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

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
          badge={route.badge}
        />
      ))}
    </div>
  );
};
