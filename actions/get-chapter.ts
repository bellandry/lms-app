import { db } from "@/lib/db"
import { Attachment, Chapter } from "@prisma/client"

interface getChapterProps {
  userId: string
  courseId: string
  chapterId: string
}

export const getChapter = async ({ userId, courseId, chapterId }: getChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    })

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true
      },
    })

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true
      }
    })

    if (!course || !chapter) {
      throw new Error(`Chapitre ou cours inexistant ! csoursId ! ${courseId}, chapterId: ${chapterId}`);
    }

    let courseAttachments: Attachment[] = []
    let chapterAttachments: Attachment[] = []
    let nextChapter: Chapter | null = null

    if (purchase) {
      courseAttachments = await db.attachment.findMany({
        where: {
          courseId
        }
      })

      chapterAttachments = await db.attachment.findMany({
        where: {
          chapterId
        }
      })
    }

    if (chapter.isFree || purchase) {
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position
          }
        },
        orderBy: {
          position: "asc"
        }
      })
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId
        }
      }
    })

    return {
      course,
      chapter,
      courseAttachments,
      chapterAttachments,
      nextChapter,
      userProgress,
      purchase,
    }
  } catch (error) {
    console.log("[GET_CHAPTER]", error)
    return {
      course: null,
      chapter: null,
      courseAttachments: null,
      chapterAttachment: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
    }
  }

}