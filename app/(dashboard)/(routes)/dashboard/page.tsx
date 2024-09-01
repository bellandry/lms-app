import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock, Paperclip } from "lucide-react";
import { redirect } from "next/navigation";
import { InfoCard } from "./_compoments/info-card";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress, allCourses } =
    await getDashboardCourses(userId);
  return (
    <div className="pt-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 mb-4">
        <InfoCard
          icon={Paperclip}
          label="Tous mes cours"
          numberOfItems={allCourses.length}
        />
        <InfoCard
          icon={Clock}
          label="Cours en progression"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Cours terminés"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
