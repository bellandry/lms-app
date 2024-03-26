import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { courseId: string, attachmentId: string } }) {
  try {
    const { userId } = auth()
    const { attachmentId } = params
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

    const attachement = await db.attachment.delete({
      where: {
        id: attachmentId,
        courseId
      }
    })

    return NextResponse.json(attachement)
  } catch (error) {
    console.log("ATTACHMENTS_ID", error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}