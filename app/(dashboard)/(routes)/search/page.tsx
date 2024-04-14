import { SearchInput } from "@/components/search-input";
import { db } from "@/lib/db";
import { HeroSection } from "../../_components/hero";
import { Categories } from "./_components/categories";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

interface SearchPageProps {
  searchParams: {
    title: string,
    categoryId: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  let { userId } = auth()

  if (!userId) userId = ""

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc" 
    }
  })

  const courses = await getCourses({
    userId,
    ...searchParams
  })

  return (
    <>
      <div className="block px-6 pt-6 md:hidden md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6 flex items-center">
        <Categories
          items={categories}
        />
      </div>
      <div className="w-full md:w-4/5 p-4  rounded-md mx-auto flex flex-col gap-4">
        <CoursesList items={courses} />
      </div>
    </>
  );
}

export default SearchPage;