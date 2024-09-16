"use client";

import { useActiveIndexStore } from "@/hooks/use-aicourse-step-store";
import { Category } from "@prisma/client";
import SelectCategory from "./select-category";
import SelectOption from "./select-option";
import { TopicDescription } from "./topic-description";

interface StepSwitchProps {
  categories: Category[];
}

export const StepSwitch = ({ categories }: StepSwitchProps) => {
  const { activeIndex, setActiveIndex } = useActiveIndexStore();
  return activeIndex === 0 ? (
    <SelectCategory categories={categories} />
  ) : activeIndex === 1 ? (
    <TopicDescription />
  ) : (
    <SelectOption />
  );
};
