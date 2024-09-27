"use server";

import {
  BulletedListItem,
  codeContent,
  ContentHeading,
  pascalToSlug,
} from "@/constants";
import { db } from "@/lib/db";
import { randomInt } from "crypto";

type SaveAiChapterContentType = {
  contents: {
    chapterId: string;
    content: {
      title: string;
      descriptions: {
        content: string | { content?: string; type?: string }[];
        type: string;
        language?: string;
      }[];
    };
  }[];
  userId: string;
  courseId: string;
};

export const SaveAiChapterContent = async ({
  contents,
  userId,
  courseId,
}: SaveAiChapterContentType) => {
  try {
    const transaction = contents.map((chapter) => {
      let content = `{`;
      chapter.content.descriptions.map((description, index) => {
        if (
          description.type === "HeadingOne" ||
          description.type === "HeadingTwo" ||
          description.type === "HeadingThree" ||
          description.type === "Paragraph"
        ) {
          content += ContentHeading({
            type: description.type,
            slug: pascalToSlug(description.type),
            value:
              typeof description.content === "string"
                ? description.content
                : "",
            uid: `a1d${index}`,
          });
        }

        if (description.type === "BulletedList") {
          if (Array.isArray(description.content)) {
            description.content.forEach(
              (item, index) =>
                (content += BulletedListItem({
                  item: item.content!,
                  index: index,
                }))
            );
          }
        }

        if (description.type === "Code") {
          content += codeContent({
            value:
              typeof description.content === "string"
                ? description.content
                : "",
            index: randomInt(0, 9),
            language: description.language!,
          });
        }
      });
      content += `}`;
      content = content.replace(/,\s*}/, "}");

      return db.chapter.update({
        where: {
          id: chapter.chapterId,
        },
        data: {
          content,
          isPublished: true,
        },
      });
    });

    await db.$transaction(transaction);

    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    if (purchase) {
      return { message: "Déjà acheté", status: 400 };
    }
    const purchaseCourse = await db.purchase.create({
      data: {
        userId,
        courseId,
      },
    });

    return purchaseCourse;
  } catch (error) {
    console.log("[SAVE_AI_CHAPTER_CONTENT]", error);
    return 0;
  }
};
