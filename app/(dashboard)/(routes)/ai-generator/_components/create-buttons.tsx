"use client";

import { Button } from "@/components/ui/button";
import { GenerateCourseModel } from "@/configs/ai-model";
import { useUserCourseInputStore } from "@/hooks/ai-user-input-hook";
import { useActiveIndexStore } from "@/hooks/use-aicourse-step-store";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export const CreateButtons = () => {
  const { activeIndex, setActiveIndex } = useActiveIndexStore();
  const { userCourseInput, setUserCourseInput } = useUserCourseInputStore();
  const [isLoading, setIsLoading] = useState(false);

  const isActive = (): boolean => {
    const { category, subject, options } = userCourseInput; // Déstructuration pour plus de clarté
    return (
      (activeIndex === 0 && category.id === "") ||
      (activeIndex === 1 &&
        (subject.subject.length <= 1 || subject.description.length <= 10)) ||
      (activeIndex === 2 &&
        (options.chapters === 0 ||
          options.duration === "" ||
          options.level === ""))
    );
  };

  const parseJSON = (text: string) => {
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (error) {
      const cleanedText = text.replace(
        /^\s*json\s*|^\s*[^{}[\],":\s]*|[^{}[\],":\s]*$/g,
        ""
      );
      console.log(cleanedText);
      jsonResponse = JSON.parse(cleanedText);
    }
    return jsonResponse;
  };

  const GenerateCourseLayout = async () => {
    setIsLoading(true);
    const BASIC_PROMPT = `Generate a course tutorial on following detail with field as course name, description, along with chapter name, about, duration:`;
    const USER_INPUT_PROMPT = `Category: '${userCourseInput.category.name}', topic: '${userCourseInput.subject.subject}', description: '${userCourseInput.subject.description}', level: '${userCourseInput.options.level}', duration: '${userCourseInput.options.duration}' NoOf Chapters: ${userCourseInput.options.chapters}, language: '${userCourseInput.options.language}', just return in json and no more words or caracters`;
    const FINAL_PROMPT = `${BASIC_PROMPT} ${USER_INPUT_PROMPT}`;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseModel.sendMessage(FINAL_PROMPT);
    console.log(parseJSON(result.response?.text()));
    setIsLoading(false);
  };

  return (
    <div className="flex justify-between">
      <Button
        onClick={() => setActiveIndex(activeIndex - 1)}
        disabled={activeIndex === 0}
        variant={"outline"}
      >
        Précédent
      </Button>
      {activeIndex < 2 ? (
        <Button
          disabled={isActive()}
          onClick={() => setActiveIndex(activeIndex + 1)}
        >
          Suivant
        </Button>
      ) : (
        <Button
          disabled={isActive() || isLoading}
          onClick={() => GenerateCourseLayout()}
        >
          {isLoading && <LoaderCircle className="animate-spin size-4 mr-2" />}
          Générer le cours
        </Button>
      )}
    </div>
  );
};
