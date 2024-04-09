import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { SearchInput } from "@/components/search-input";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string,
    categoryId: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth()

  if (!userId) return redirect("/")

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