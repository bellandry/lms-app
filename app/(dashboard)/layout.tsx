"use client"

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = (
  { children }: {
    children: React.ReactNode
  }
) => {
  const pathName = usePathname()
  const isTeacherMode = pathName?.includes("/teacher")
  return (
    <div className="h-screen">
      <div className="h-[70px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      {isTeacherMode && <div className="hidden md:pt-[70px] md:flex h-screen w-64 flex-col fixed inset-y-0 z-50 pt-2">
        <Sidebar />
      </div>}
      <main className={cn("pt-[70px] h-hull", isTeacherMode && "md:pl-64")}>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;