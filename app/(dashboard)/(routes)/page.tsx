import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { HeroSection } from "../_components/hero";

interface HomeProps {
  searchParams: {
    title: string,
    categoryId: string
  }
}

const Home = async ({ searchParams }: HomeProps) => {
  const { userId } = auth()

  if (!userId) return redirect("/")

  const courses = await getCourses({
    userId,
    ...searchParams
  })

  return (
    <>
      <div>
        <HeroSection />
      </div>
      <div className="w-full md:w-4/5 p-4  rounded-md mx-auto flex flex-col gap-4">
        <CoursesList items={courses} />
      </div>
    </>
  );
}

export default Home;