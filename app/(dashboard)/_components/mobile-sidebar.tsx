import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsOpenStore } from "@/hooks/use-isopen-store";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  const { isOpen, setIsOpen } = useIsOpenStore();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
