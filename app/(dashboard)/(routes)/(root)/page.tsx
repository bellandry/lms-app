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

  return (
    <>
      <div className="w-full rounded-md mx-auto flex flex-col gap-4">
        <h2 className="font-semibold text-xl mt-8 ">Derniers cours</h2>
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Home;
