import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { userId } = auth();
  const { courseId } = params;

  if (!userId) {
    return new NextResponse("Unauthoried ", { status: 401 });
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
  });

  if (!course) {
    return new NextResponse("Course not found", { status: 404 });
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: courseId,
      },
    },
  });

  if (purchase) {
    return new NextResponse("Already purchased", { status: 400 });
  }

  const purchaseCourse = await db.purchase.create({
    data: {
      userId,
      courseId,
    },
  });

  return NextResponse.json({ purchaseCourse });
}
