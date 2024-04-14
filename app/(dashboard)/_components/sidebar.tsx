import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-screen border-r w-full flex flex-col bg-white shadow-lg overflow-y-auto">
      <div className="md:hidden p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes withSheetClose />
      </div>
    </div>
  );
}
