import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { courseId: string; attachmentId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { attachmentId } = params;
    const { courseId, chapterId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Missing Required fields", { status: 404 });
    }

    const attachement = await db.attachment.delete({
      where: {
        id: attachmentId,
        chapterId,
      },
    });

    return NextResponse.json(attachement);
  } catch (error) {
    console.log("CHAPTER_ATTACHMENTS_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
