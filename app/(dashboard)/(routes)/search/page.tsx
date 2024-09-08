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

  return (
    <>
      <div className="mt-[90px] md:py-6 flex items-center justify-center">
        <SearchInput />
      </div>
      <div className="p-6 flex items-center">
        <Categories items={categories} />
      </div>
      <div className="w-full flex flex-col gap-4">
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
