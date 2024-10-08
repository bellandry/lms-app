import { CourseChapterCard } from "@/app/(course)/course/[courseId]/_components/courses-chapter-card";
import { CourseEnrollButton } from "@/app/(course)/course/[courseId]/chapter/[chapterId]/_components/course-enroll-button";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { BookOpen, File } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import MyEditor from "@/components/editor";
import { Categories } from "../../search/_components/categories";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  let { userId } = auth();

  if (!userId) userId = "";

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: userId
            ? {
                where: {
                  userId,
                },
              }
            : undefined,
        },
        orderBy: {
          position: "asc",
        },
      },
      category: {},
      attachments: {},
    },
  });

  if (!course) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="w-full flex flex-col md:flex-row justify-evenly lg:px-32 max-w-[1400px] mx-auto pb-4">
      <div className="flex flex-col w-full h-fit md:w-3/5 mx-auto p-1 md:m-2 gap-2 border rounded-lg mb-4 pb-4">
        <div className="relative w-full h-52">
          {course.imageUrl ? (
            <Image
              src={course.imageUrl}
              alt="Dynamic Background"
              layout="fill"
              objectFit="cover"
              className="rounded-sm"
            />
          ) : (
            <Image
              fill
              className="object-cover"
              alt={"default background course"}
              src={"/learning-concept.avif"}
            />
          )}
          <div className="absolute flex-col inset-0 flex items-center justify-center bg-slate-900 bg-opacity-60 px-4 rounded-md">
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              {course.title}
            </h1>
          </div>
        </div>
        <div className="mx-2">
          {course.category && <Categories items={[course.category]} />}
          {/* <Preview value={course.description ?? ""} /> */}
          <h2 className="text-lg font-semibold text-slate-900">Description</h2>
          <MyEditor value={course.description ?? ""} readOnly />
          <div className="flex flex-col w-full md:px-2 gap-2">
            <h2 className="text-xl md:text-2xl font-semibold">Chapitres</h2>
            <div className="w-full flex flex-col gap-2 px-2 md:px-4">
              {/* <Carousel>
              <CarouselContent> */}
              {course.chapters.map((chapter) => (
                // <CarouselItem
                //   key={chapter.id}
                //   className="basis-1/2 md:basis-1/3 pl-2 md:pl-4"
                // >
                <CourseChapterCard
                  key={chapter.id}
                  id={chapter.id}
                  label={chapter.title}
                  description={chapter.description ?? undefined}
                  isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                  courseId={course.id}
                  isLocked={!chapter.isFree && !purchase}
                  clickable
                />
                // </CarouselItem>
              ))}
              {/* </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full md:h-fit mt-4 md:w-2/5 mx-auto md:m-2 border rounded-lg md:sticky md:top-20 mb-6 md:mb-1">
        <div className="flex flex-col w-full gap-2 py-1 bg-gradient-to-tr from-gray-950 to-gray-700 text-white rounded-lg">
          <div className="flex flex-col w-full py-2 pb-4 px-6 gap-4 ">
            <h2 className="text-xl font-semibold">Prêt à commencer ?</h2>
            <div>
              <p className="text-xs bg-slate-400 p-1 rounded-sm w-fit">
                {course.category?.name}
              </p>
              <div className="my-2 flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-x-1 text-gray-300">
                  <IconBadge size="sm" icon={BookOpen} />
                  <span>
                    {course.chapters.length}{" "}
                    {course.chapters.length === 1 ? "Chapitre" : "Chapitres"}
                  </span>
                </div>
                <div className="flex items-center gap-x-1 text-gray-300">
                  <IconBadge size="sm" icon={File} />
                  <span>
                    {course.attachments.length}{" "}
                    {course.attachments.length === 1 ? "Fichier" : "Fichiers"}{" "}
                    ressources
                  </span>
                </div>
              </div>
            </div>
            <ul className="text-sm list-inside list-disc">
              <li>Suivez vos progrès</li>
              <li>Cours au format texte et vidéo</li>
              <li>Partage de ressources et de codes</li>
              <li>Exercices pratiques intégrés</li>
            </ul>
            {!purchase && (
              <CourseEnrollButton
                variant="secondary"
                courseId={params.courseId}
                price={course.price ?? 0}
                className="hidden md:block"
              />
            )}
          </div>
        </div>
      </div>
      {!purchase && (
        <CourseEnrollButton
          variant=""
          courseId={params.courseId}
          price={course.price ?? 0}
          className="sticky bottom-4 md:hidden w-full items-center mx-auto shadow-md shadow-slate-500"
        />
      )}
    </div>
  );
};

export default CourseIdPage;
