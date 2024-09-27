"use client";

import { SaveAiChapterContent } from "@/actions/save-ai-chapter-content";
import { Button } from "@/components/ui/button";
import { GenerateCourseContent } from "@/configs/ai-model";
import { parseJSON } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseGenerateButtonProps {
  price: number;
  course: Course;
  chapters: Chapter[];
  className?: string;
  variant: string;
}

export const CourseGenerateButton = ({
  price,
  course,
  chapters,
  className,
  variant,
}: CourseGenerateButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (!userId) {
        router.push(
          `/sign-in?redirect_url=${process.env.NEXT_PUBLIC_APP_URL}/ai-generator/create/${course.id}`
        );
      } else if (price === 0 || price === null) {
        let contents: any[] = [];
        const sleep = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));

        for (const chapter of chapters) {
          const PROMPT = `explain the concept in detail on Topic: '${course.topic}', 
          Chapter: '${chapter.title}' in valid JSON format with field as title, descriptions in detail and really informative and 80% practical for with no decorations. 
          each description field is a part of 'descriptions' array ans should be a json object, 
          with the two fields 'content' and 'type', type field can be: 
          'Paragraph' for a paragraph, 'BlockQuote' for a quote; 'Callout' for a callout; 
          'HeadingOne' for a heading one texte; 'HeadingTwo' for a heading two text; 'HeadingThree' for a heading three text; 
          'Code' for code example (always as one line plain text) if applicable with additional field such as 'language'. do not insert the language in the code content, just the plain code; 
          'BulletedList' for a lists and all items of the list in a field called 'items'. 
          language: '${course.language}'. don't forget to always escape special characters like slashes to give clean and valid JSON with no errors 
          and avoid unterminated JSON string. don't use decoration like * in text and answer all in one line. `;
          // console.log(PROMPT);

          const result = await GenerateCourseContent.sendMessage(PROMPT);
          const chapterText = result.response?.text().trim();

          if (chapterText) {
            const parsedChapterContent = parseJSON(chapterText);

            const chapterContent = {
              chapterId: chapter.id,
              content: parsedChapterContent,
            };

            contents.push(chapterContent);
          }

          // console.log("contents :", contents);

          await sleep(2000);
        }
        if (contents.length > 0) {
          const savedChapterContent = await SaveAiChapterContent({
            userId: userId ? userId : "",
            contents,
            courseId: course.id,
          });
          if (savedChapterContent) {
            router.push(`/course/${course.id}/chapter/${chapters[0].id}`);
            toast.success(`Contenu du cours généré avec succès !`);
          }
        }
      } else {
        const response = await axios.post(`/api/courses/${course.id}/checkout`);

        window.location.assign(response.data.url);
      }
    } catch (error) {
      toast.error("Une erreur inatendue s'est produite, Réessayez plus tard!");
      console.log("[AI_CREATION_ERROR] : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={
        variant as
          | "link"
          | "default"
          | "secondary"
          | "destructive"
          | "outline"
          | "ghost"
      }
      className={`w-full md:w-auto ${className}`}
      onClick={onClick}
      disabled={isLoading}
      size={"lg"}
    >
      <span className="w-full flex gap-2 items-center justify-center">
        {isLoading && <LoaderCircle className="size-6 animate-spin" />}
        <span>Générer le contenu du cours</span>
      </span>
    </Button>
  );
};
