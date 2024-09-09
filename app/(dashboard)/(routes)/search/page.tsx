import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { SearchInput } from "@/components/search-input";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  let { userId } = auth();

  if (!userId) userId = "";

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

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
      <div className="mt-[25px] md:py-6 flex items-center justify-center">
        <SearchInput />
      </div>
      <div className="p-6 flex items-center">
        <Categories items={categories} />
      </div>
      <div className="w-full flex flex-col gap-4">
        {courseItems.length > 0 && (
          <>
            <h2 className="font-semibold text-xl mt-4">Cours</h2>
            <CoursesList items={courseItems} />
          </>
        )}
        {aiCourseItems.length > 0 && (
          <>
            <h2 className="font-semibold text-xl mt-4">Cours IA</h2>
            <CoursesList items={aiCourseItems} />
          </>
        )}
        {cheatsheetItems.length > 0 && (
          <>
            <h2 className="font-semibold text-xl mt-4">Feuilles de route</h2>
            <CoursesList items={cheatsheetItems} />
          </>
        )}
        {courses.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-10">
            Aucun contenu correspondant à votre recherche
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
