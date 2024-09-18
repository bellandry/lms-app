"use client";

import { Button } from "@/components/ui/button";
import { useUserCourseInputStore } from "@/hooks/ai-user-input-hook";
import { useActiveIndexStore } from "@/hooks/use-aicourse-step-store";

export const CreateButtons = () => {
  const { activeIndex, setActiveIndex } = useActiveIndexStore();
  const { userCourseInput, setUserCourseInput } = useUserCourseInputStore();

  const isActive = (): boolean => {
    const { category, subject, options } = userCourseInput; // Déstructuration pour plus de clarté
    return (
      (activeIndex === 0 && category === "") ||
      (activeIndex === 1 &&
        (subject.subject.length <= 3 || subject.description.length <= 30)) ||
      (activeIndex === 2 &&
        (options.chapters === 0 ||
          options.duration === "" ||
          options.level === ""))
    );
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
        <Button disabled={isActive()} onClick={() => {}}>
          Générer le cours
        </Button>
      )}
    </div>
  );
};
