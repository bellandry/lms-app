"use server";

import { db } from "@/lib/db";

export type AiCourseType = {
  userId: string;
  categoryId: string;
  course: {
    name?: string;
    courseName?: string;
    description: string;
    category: string;
    topic: string;
    level: string;
    duration: string;
    language: string;
    chapters: {
      name?: string;
      chapterName?: string;
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
  // console.log(course);
  try {
    const createdCourse = await db.course.create({
      data: {
        userId,
        title: course.name
          ? course.name
          : course.courseName
          ? course.courseName
          : "",
        description: course.description,
        metaDescription: course.description,
        categoryId,
        level: course.level,
        topic: course.topic,
        language: course.language,
        duration: course.duration,
        type: "ai-course",
      },
    });

    const chapters = await db.chapter.createMany({
      data: course.chapters.map((chapter, index) => ({
        title: chapter.name
          ? chapter.name
          : chapter.chapterName
          ? chapter.chapterName
          : "",
        description: chapter.about,
        duration: chapter.duration,
        courseId: createdCourse.id,
        position: index + 1,
      })),
    });

    return createdCourse;
  } catch (error) {
    console.log("[SAVE_AI_COURSE]", error);
    return 0;
  }
};
