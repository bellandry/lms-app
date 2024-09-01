import Logo from "@/components/logo";
import { NavbarRoutes } from "@/components/navbar-routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoute } from "./navbar-route";

export const Navbar = () => {
  const pathName = usePathname();
  const isTeacherMode = pathName?.includes("/teacher");
  return (
    <div className="w-full border-b h-full  bg-white shadow-sm">
      <div
        className={cn(
          !isTeacherMode ? "container" : "p-4",
          "flex items-center justify-between h-full"
        )}
      >
        <div className="hidden md:block">
          <Logo />
        </div>
        <MobileSidebar />
        {isTeacherMode || <NavbarRoute />}
        <NavbarRoutes />
      </div>
    </div>
  );
};
