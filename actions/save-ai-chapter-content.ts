"use server";

import {
  BulletedListItem,
  codeContent,
  ContentHeading,
  pascalToSlug,
} from "@/constants";
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
  console.log(contents);

  try {
    const transaction = contents.forEach((chapter) => {
      let content = {};
      chapter.content.descriptions.forEach((description, index) => {
        if (
          description.type === "HeadingOne" ||
          description.type === "HeadingTwo" ||
          description.type === "HeadingThree" ||
          description.type === "Paragraph"
        ) {
          Object.assign(
            content,
            JSON.parse(
              ContentHeading({
                type: description.type,
                slug: pascalToSlug(description.type),
                value:
                  typeof description.content === "string"
                    ? description.content
                    : "",
                uid: `a1d${index}`,
              })
            )
          );
        }

        if (description.type === "BulletedList") {
          if (Array.isArray(description.content)) {
            description.content.forEach((item, index) =>
              Object.assign(
                content,
                JSON.parse(
                  BulletedListItem({ item: item.content!, index: index })
                )
              )
            );
          }
        }

        if (description.type === "Code") {
          Object.assign(
            content,
            JSON.parse(
              codeContent({
                value:
                  typeof description.content === "string"
                    ? description.content
                    : "",
                index: randomInt(0, 9),
                language: description.language!,
              })
            )
          );
        }
      });
      console.log(content);
      // db.chapter.update({
      //   where: {
      //     id: chapter.chapterId,
      //   },
      //   data: {
      //     content,
      //   },
      // });
    });
  } catch (error) {
    console.log("[SAVE_AI_CHAPTER_CONTENT]", error);
    return 0;
  }
};
