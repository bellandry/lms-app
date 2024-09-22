import { CourseChapterCard } from "@/app/(course)/course/[courseId]/_components/courses-chapter-card";
import MyEditor from "@/components/editor";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { BookAIcon, BookOpen, TimerIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { CourseBanner } from "./_components/course-banner";
import { CourseGenerateButton } from "./_components/course-generate-button";

const page = async ({ params }: { params: { courseId: string } }) => {
  let { userId } = auth();

  if (!userId) redirect("/ai-generator");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      category: {},
    },
  });

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="w-full flex flex-col md:flex-row justify-evenly lg:px-32 max-w-[1400px] mx-auto pb-4 transition-all">
      <div className="flex flex-col w-full h-fit md:w-3/5 mx-auto p-1 md:m-2 gap-2 border rounded-lg mb-4 pb-4">
        <CourseBanner course={course} />
        <div className="mx-2">
          <h2 className="text-lg font-semibold text-slate-900">Description</h2>

          <MyEditor value={course.description ?? ""} readOnly />

          <div className="flex flex-col w-full md:px-2 gap-2">
            <h2 className="text-xl md:text-2xl font-semibold">Chapitres</h2>
            <div className="w-full flex flex-col gap-2 px-2 md:px-4">
              {course.chapters.map((chapter) => (
                <CourseChapterCard
                  key={chapter.id}
                  id={chapter.id}
                  label={chapter.title}
                  description={chapter.description ?? undefined}
                  isCompleted={false}
                  courseId={course.id}
                  isLocked={true}
                  clickable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full md:h-fit mt-4 md:w-2/5 mx-auto md:m-2 border rounded-lg md:sticky md:top-20 mb-6 md:mb-1">
        <div className="flex flex-col w-full gap-2 py-1 bg-gradient-to-tr from-gray-950 to-gray-700 text-white rounded-lg">
          <div className="flex flex-col w-full py-2 pb-4 px-6 gap-4 ">
            <h2 className="text-xl font-semibold">Prêt à commencer ?</h2>
            <div>
              <div className="my-2 flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-x-1 text-gray-300">
                  <IconBadge size="sm" icon={BookAIcon} />
                  <span>catégorie : {course.category?.name}</span>
                </div>
              </div>
              <div className="my-2 flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-x-1 text-gray-300">
                  <IconBadge size="sm" icon={TimerIcon} />
                  <span>durée : {course?.duration}</span>
                </div>
              </div>

              <div className="my-2 flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-x-1 text-gray-300">
                  <IconBadge size="sm" icon={BookOpen} />
                  <span>
                    {course.chapters.length}{" "}
                    {course.chapters.length === 1 ? "Chapitre" : "Chapitres"}
                  </span>
                </div>
              </div>
            </div>
            <ul className="text-sm list-inside list-disc">
              <li>Suivez vos progrès</li>
              <li>Cours au format texte et/ou vidéo</li>
              <li>Partage de ressources et de codes</li>
            </ul>

            <CourseGenerateButton
              variant="secondary"
              courseId={params.courseId}
              price={course.price ?? 0}
              className="hidden md:block"
            />
          </div>
        </div>
      </div>
      <CourseGenerateButton
        variant=""
        courseId={params.courseId}
        price={course.price ?? 0}
        className="sticky bottom-4 md:hidden w-full items-center mx-auto shadow-md shadow-slate-500"
      />
    </div>
  );
};

export default page;
