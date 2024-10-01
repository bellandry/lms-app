"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsOpenStore } from "@/hooks/use-isopen-store";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  children?: React.ReactNode;
}

const CourseMobileSidebar = ({
  course,
  progressCount,
  children,
}: CourseNavbarProps) => {
  const { isOpen, setIsOpen } = useIsOpenStore();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
