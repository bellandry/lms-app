import { CourseSidebarItem } from "@/app/(course)/course/[courseId]/_components/course-sidebar-item";
import { CourseEnrollButton } from "@/app/(course)/course/[courseId]/chapter/[chapterId]/_components/course-enroll-button";
import { IconBadge } from "@/components/icon-badge";
import { Preview } from "@/components/preview";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { BookOpen, File } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  let { userId } = auth()

  if(!userId) userId = ""

  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    },
    include: {
      chapters: {
        where: {
          isPublished: true
        },
        include: {
          userProgress: userId ? {
            where: {
              userId
            }
          } : undefined,
        },
        orderBy: {
          position: "asc"
        }
      },
      category: {},
      attachments: {}
    }
  })

  if (!course) {
    return redirect("/")
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id
      }
    }
  })

  // return redirect(`/course/${course.id}/chapter/${course.chapters[0].id}`)
  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-evenly md:px-28 lg:px-40">
      <div className="flex flex-col w-full h-fit md:w-3/5 mx-auto p-2 md:m-2 gap-2 border rounded-lg">
        <h1 className="text-2xl md:text-4xl font-bold">{course.title}</h1>
        <Preview value={course.description ?? ""} />
        <div className="flex flex-col w-full px-4">
          {course.chapters.map((chapter) => (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full md:h-fit mt-4 md:w-2/5 mx-auto md:m-2 border rounded-lg">
        <div className="flex flex-col w-full gap-2 bg-gradient-to-tr mb-6 md:mb-1 from-gray-950 to-gray-700 text-white rounded-lg">
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt={course.title}
              src={course.imageUrl!}
            />
          </div>
          <div className="flex flex-col w-full py-2 pb-4 px-6 gap-4 ">
            <h2 className="text-2xl font-semibold">Prêt à commencer ?</h2>
            <div>
              <p className="text-xs bg-slate-400 p-1 rounded-sm w-fit">
                {course.category?.name}
              </p>
              <div className="my-2 flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-x-1 text-gray-300">
                  <IconBadge size="sm" icon={BookOpen} />
                  <span>
                    {course.chapters.length} {course.chapters.length === 1 ? "Chapitre" : "Chapitres"}
                  </span>
                </div>
                <div className="flex items-center gap-x-1 text-gray-300">
                  <IconBadge size="sm" icon={File} />
                  <span>
                    {course.attachments.length} {course.attachments.length === 1 ? "Fichier" : "Fichiers"} ressources
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
            <CourseEnrollButton
              chapterId={course.chapters[0].id}
              courseId={params.courseId}
              price={course.price ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseIdPage;