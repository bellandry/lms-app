import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChapterVideoPlayer } from "./_components/chapter-video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";

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
  const onCompleteOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          label="Vous avez déja suivi et terminé ce cours"
          variant="success"
        />
      )}
      {isLocked && (
        <Banner
          label="Pour accéder à ce chapitre, vous devez souscrire au cours"
          variant="warning"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20 p-2 md:p-4 gap-2">
        <h1 className="text-2xl md:text-4xl font-bold">{chapter.title}</h1>
        <Preview value={chapter.description ?? ""} />
        <ChapterVideoPlayer
          isLocked={isLocked}
          chapter={chapter}
        />
        {purchase ? (
          <div>

          </div>
        ) : (
          <CourseEnrollButton
            courseId={params.courseId}
            price={course.price ?? 0}
          />
        )}
      </div>
      <Separator />
      <div>

      </div>
    </div>
  )
}

export default ChapterIdPage;