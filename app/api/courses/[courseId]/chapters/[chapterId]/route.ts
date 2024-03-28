
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {
  try {
    const { userId } = auth()
    const values = await req.json()
    const { courseId, chapterId } = params

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      }
    })

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId
      },
      data: {
        ...values
      }
    })

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 })
    }

    return NextResponse.json(chapter)
  } catch (error) {
    console.log("[CHAPTERS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}