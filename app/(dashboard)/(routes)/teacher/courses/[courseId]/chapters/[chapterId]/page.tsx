import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, EyeIcon, File, LayoutDashboard, VideoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterActions } from "./_components/chapter-actions";
import { ChapterAttachmentForm } from "./_components/chapter-attachment-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";

const ChaptersIdPage = async ({
  params
}: {
  params: { courseId: string, chapterId: string }
}) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc"
        }
      },
      muxData: true
    }
  })


  if (!chapter) {
    return redirect("/")
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields} / ${totalFields})`

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="Ce chapitre est encore en brouillon, il ne sera pas publié dans la formation"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link href={`/teacher/courses/${params.courseId}`}
              className="text-sm text-slate-700 hover:opacity-75 transition mb-6 flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour au cours
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium"> {chapter.title}</h1>
                <span className="text-sm text-slate-700">Champs complétés {completionText}</span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Personalisez votre chapitre
                </h2>
              </div>
              <div>
                <ChapterTitleForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
                <ChapterDescriptionForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={EyeIcon} />
                <h2 className="text-xl">
                  Accessibilité
                </h2>
              </div>
              <div>
                <ChapterAccessForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={VideoIcon} />
                <h2 className="text-xl">
                  Ajouter une vidéo
                </h2>
              </div>
              <div>
                <ChapterVideoForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Ressources & Documents</h2>
              </div>
              <div>
                <ChapterAttachmentForm
                  initialData={chapter}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChaptersIdPage;