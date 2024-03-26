import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth()
    const values = await req.json()
    const { courseId } = params

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

    const course = await db.course.update({
      where: {
        id: courseId,
        userId
      },
      data: {
        ...values
      }
    })

    if (!course) {
      return new NextResponse("Not Found", { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.log("[COURSES]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}