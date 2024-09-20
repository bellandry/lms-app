import { db } from "@/lib/db";

type AiCourseType = {
  userId: string;
  categoryId: string;
  course: {
    name: string;
    description: string;
    category: string;
    topic: string;
    level: string;
    duration: string;
    language: string;
    chapters: {
      name: string;
      about: string;
      duration: string;
    }[];
  };
};

export const SaveAiCourse = async ({
  course,
  userId,
  categoryId,
}: AiCourseType) => {
  try {
    console.log("course : ", course);
    const createdCourse = await db.course.create({
      data: {
        userId,
        title: course.name,
        description: course.description,
        metaDescription: course.description,
        categoryId,
        level: course.level,
        language: course.language,
        duration: course.duration,
      },
    });

    const chapters = await db.chapter.createMany({
      data: course.chapters.map((chapter, index) => ({
        title: chapter.name,
        description: chapter.about,
        duration: chapter.duration,
        courseId: createdCourse.id,
        position: index,
      })),
    });

    const completeCourse = await db.purchase.findMany({
      where: {
        id: createdCourse.id,
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: true,
          },
        },
      },
    });

    return completeCourse;
  } catch (error) {
    console.log("[SAVE_AI_COURSE]", error);
    return 0;
  }
};
