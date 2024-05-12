import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChapterVideoPlayer } from "./_components/chapter-video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { IconBadge } from "@/components/icon-badge";
import { File } from "lucide-react";

const ChapterIdPage = async ({ params }: { params: { courseId: string, chapterId: string } }) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const {
    course,
    chapter,
    courseAttachments,
    chapterAttachments,
    nextChapter,
    userProgress,
    purchase
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId
  })

  if (!chapter || !course) {
    return redirect("/")
  }

  const isLocked = !chapter.isFree && !purchase
  const oompleteOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          label="Vous avez déja suivi et terminé ce chapitre"
          variant="success"
        />
      )}
      {isLocked && (
        <Banner
          label="Pour accéder à ce chapitre, vous devez souscrire au cours"
          variant="warning"
        />
      )}
      <div className="flex flex-col md:flex-row max-w-[1300px] mx-auto pb-20 p-2 md:p-4 gap-2">
        <div className="flex flex-col w-full md:w-4/6 mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold">{chapter.title}</h1>
          <Preview value={chapter.description ?? ""} />
          <ChapterVideoPlayer
            isLocked={isLocked}
            chapter={chapter}
          />
          {!purchase && (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price!}
              variant=""
            />
          )}
          {!isLocked && (
            <Preview value={chapter.content ?? ""} />
          )}
          
          {purchase && (
            <div className="flex justify-end p-4">
              <CourseProgressButton
                courseId={params.courseId}
                chapterId={params.chapterId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            </div>
          )}
        </div>
        <div className="w-full md:w-2/6">
          <div className="flex flex-col w-full gap-2 bg-gradient-to-tr my-6 from-gray-950 to-gray-700 text-white rounded-lg md:sticky md:top-20">
            <div className="flex flex-col w-full py-2 pb-4 px-6 gap-4 ">
              <h2 className="text-xl font-semibold">Documents utiles </h2>
              <div>
                <div className="my-2 flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-x-1 text-gray-300">
                    <IconBadge size="sm" icon={File} />
                    <span>
                      {courseAttachments.length} {courseAttachments.length <= 1 ? "Fichier ressource" : "Fichiers ressources"} pour ce cours
                    </span>
                  </div>
                  {!!courseAttachments.length && (
                    <>
                      <div className="">
                        {courseAttachments.map((attachment) => (
                          <a 
                            href={attachment.url} 
                            target="_blank" 
                            key={attachment.id}
                            className="flex items-center my-2 p-2 w-full bg-slate-800 ring-1 text-slate-100 rounded-sm hover:underline"
                          >
                            <p>
                              {attachment.name}
                            </p>
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="my-2 flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-x-1 text-gray-300">
                    <IconBadge size="sm" icon={File} />
                    <span>
                      {chapterAttachments.length} {chapterAttachments.length <= 1 ? "Fichier ressource" : "Fichiers ressources"} pour ce chapitre
                    </span>
                  </div>
                  {!!chapterAttachments.length && (
                    <>
                      <div className="">
                        {chapterAttachments.map((attachment) => (
                          <a 
                            href={attachment.url} 
                            target="_blank" 
                            key={attachment.id}
                            className="flex items-center my-2 p-2 w-full bg-slate-800 ring-1 text-slate-100 rounded-sm hover:underline"
                          >
                            <p>
                              {attachment.name}
                            </p>
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChapterIdPage;