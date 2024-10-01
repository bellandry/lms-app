import { NavbarRoutes } from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseMobileSidebar from "./course-mobile-sidebar";
import { CourseSidebar } from "./course-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="px-4 py-1 border-b h-full w-full flex items-center justify-center shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount}>
        <CourseSidebar course={course} progressCount={progressCount} />
      </CourseMobileSidebar>
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
