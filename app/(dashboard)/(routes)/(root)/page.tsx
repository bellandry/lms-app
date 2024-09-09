import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs/server";

interface HomeProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  let { userId } = auth();

  if (!userId) userId = "";

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  // Filtrer les cours par type
  const courseItems = courses.filter((course) => course.type === "course");
  const cheatsheetItems = courses.filter(
    (course) => course.type === "cheatsheet"
  );
  const aiCourseItems = courses.filter((course) => course.type === "ai-course");

  return (
    <>
      <div className="w-full rounded-md mx-auto flex flex-col gap-4">
        {courseItems.length > 0 && (
          <>
            <h2 className="font-semibold text-xl mt-8">Derniers cours</h2>
            <CoursesList items={courseItems} />
          </>
        )}
        {aiCourseItems.length > 0 && (
          <>
            <h2 className="font-semibold text-xl mt-8">Cours IA</h2>
            <CoursesList items={aiCourseItems} />
          </>
        )}
        {cheatsheetItems.length > 0 && (
          <>
            <h2 className="font-semibold text-xl mt-8">Feuilles de route</h2>
            <CoursesList items={cheatsheetItems} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
