import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: { params: {courseId: string, chapterId: string}}) {
  try {
    const { userId } = auth()
    const { chapterId, courseId } = params
    const { isCompleted } = await req.json()

    if(!userId) {
      return new NextResponse('Unauthorized', { status: 401})
    }

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId
        }
      },
      update: {
        isCompleted
      },
      create: {
        userId,
        chapterId,
        isCompleted
      }
    })

    return NextResponse.json(userProgress)
  } catch(err: any) {
    console.log('[CHAPTER_ID_PROGRESS]', err)
    return new NextResponse('Internal Error', {status: 500})
  }
}