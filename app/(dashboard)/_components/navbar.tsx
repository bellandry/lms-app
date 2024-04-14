import { NavbarRoutes } from "@/components/navbar-routes";
import { usePathname } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoute } from "./navbar-route";
import Logo from "@/components/logo";

export const Navbar = () => {
  const pathName = usePathname()
  const isTeacherMode = pathName?.includes("/teacher")
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="hidden md:block p-6">
        <Logo />
      </div>
      <MobileSidebar />
      {isTeacherMode || <NavbarRoute />}
      <NavbarRoutes />
    </div>
  );
}
