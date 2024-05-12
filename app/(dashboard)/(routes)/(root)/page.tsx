import { db } from "@/lib/db";
import { HeroSection } from "../../_components/hero";
import { Categories } from "../search/_components/categories";
import { CoursesList } from "@/components/courses-list";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";

interface HomeProps {
  searchParams: {
    title: string,
    categoryId: string
  }
}

const Home = async ({ searchParams }: HomeProps) => {
  let { userId } = auth()

  if(!userId) userId = ""

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
      <HeroSection />
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

export default Home
