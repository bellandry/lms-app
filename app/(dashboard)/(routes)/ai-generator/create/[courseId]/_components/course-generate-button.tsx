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
        await GenerateChapterContent();
      } else {
        const response = await axios.post(`/api/courses/${course.id}/checkout`);

        window.location.assign(response.data.url);
      }
    } catch {
      toast.error("Une erreur inatendue s'est produite");
    }
  };

  const GenerateChapterContent = async () => {
    let contents: any[] = [];
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    for (const chapter of chapters) {
      const PROMPT = `explain the concept in detail on Topic: '${course.title}', Chapter: '${chapter.title}' in json format with field as title, descriptions in detail and really informative for with no decorations. duration: '${chapter.duration}'. each description field is a part of 'descriptions' array ans should be a json object, with the two fields 'content' and 'type', type field can be: 'Paragraph' for a paragraph, 'BlockQuote' for a quote; 'Callout' for a callout; 'HeadingOne' for a heading one texte; 'HeadingTwo' for a heading two text; 'HeadingThree' for a heading three text; 'Code' for code example (in <precode> format) if applicable with additional field such as 'language'; 'BulletedList' for a lists and all items of the list in a field called 'items'. language: '${course.language}'. don't forget to escape special characters.`;

      const result = await GenerateCourseContent.sendMessage(PROMPT);
      const chapterText = result.response?.text();
      console.log("chapitre " + chapters.indexOf(chapter), chapterText);

      if (chapterText) {
        const parsedChapterContent = parseJSON(chapterText);

        const chapterContent = {
          chapterId: chapter.id,
          content: parsedChapterContent,
        };

        contents.push(chapterContent);
      }

      console.log("contents :", contents);

      await sleep(2000);
    }
    if (contents.length > 0) {
      const savedChapterContent = await SaveAiChapterContent({
        userId: userId ? userId : "",
        contents,
        courseId: course.id,
      });
      if (savedChapterContent) {
        toast.success(`Contenu du cours généré avec succès !`);
      }
    }
    setIsLoading(false);
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
      className={`w-full flex gap-2 items-center justify-center md:w-auto ${className}`}
      onClick={onClick}
      disabled={isLoading}
      size={"lg"}
    >
      {isLoading && <LoaderCircle className="size-6 animate-spin" />}
      <span>Générer le contenu du cours</span>
    </Button>
  );
};
