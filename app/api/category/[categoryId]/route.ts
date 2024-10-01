import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();
    const { categoryId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      // include: {
      //   courses: {
      //     include: {
      //       attachments: true,
      //       chapters: {
      //         include: {
      //           attachments: true
      //         }
      //       }
      //     },
      //   },
      // },
    });

    if (!category) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedCategory = await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log("[DELETE_CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth();
    const values = await req.json();
    const { categoryId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...values,
      },
    });

    if (!category) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
