"use client";

import { Button } from "@/components/ui/button";
import { useUserCourseInputStore } from "@/hooks/ai-user-input-hook";
import { useActiveIndexStore } from "@/hooks/use-aicourse-step-store";
import { useState } from "react";
import { GenerateCourseButton } from "./generate-course-button";

export const CreateButtons = ({ userId }: { userId: string }) => {
  const { activeIndex, setActiveIndex } = useActiveIndexStore();
  const { userCourseInput, setUserCourseInput } = useUserCourseInputStore();
  const [isLoading, setIsLoading] = useState(false);
  console.log("81baa229-37da-4b40-a6f2-6d3473d1958e");

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

  const changeIsLoading = (loading: boolean) => {
    setIsLoading(loading);
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
        <>
          <GenerateCourseButton
            disabled={isActive() || isLoading}
            isLoading={isLoading}
            inputs={userCourseInput}
            onLoading={changeIsLoading}
          />
        </>
      )}
    </div>
  );
};
