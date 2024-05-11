import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChapterVideoPlayer } from "./_components/chapter-video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";

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
      <div className="flex flex-col max-w-3xl mx-auto pb-20 p-2 md:p-4 gap-2">
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
        {!!courseAttachments.length && (
          <>
            <div className="p-4">
              {courseAttachments.map((attachment) => (
                <a 
                  href={attachment.url} 
                  target="_blank" 
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-slate-400 border text-slate-800 rounded-md hover:underline"
                >
                  <p>
                    {attachment.name}
                  </p>
                </a>
              ))}
            </div>
          </>
        )}
        {!!chapterAttachments.length && (
          <>
            <div className="p-4">
              {chapterAttachments.map((attachment) => (
                <a 
                  href={attachment.url} 
                  target="_blank" 
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-slate-400 border text-slate-800 rounded-md hover:underline"
                >
                  <p>
                    {attachment.name}
                  </p>
                </a>
              ))}
            </div>
          </>
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
    </div>
  )
}

export default ChapterIdPage;