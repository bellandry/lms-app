"use client";

import { iconMap } from "@/constants";
import { useUserCourseInputStore } from "@/hooks/ai-user-input-hook";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  categoryId: string;
  categoryName: string;
}

const CategoryCard = ({ categoryId, categoryName }: CategoryCardProps) => {
  const { userCourseInput, setUserCourseInput } = useUserCourseInputStore();

  const handleCategoryChange = () => {
    setUserCourseInput({
      ...userCourseInput,
      category: categoryId,
    });
    return;
  };

  const Icon = iconMap[categoryName];

  return (
    <div
      className={cn(
        "aspect-video text-sm sm:text-md flex gap-3 p-2 text-center flex-col bg-slate-200 border rounded-xl border-slate-300 items-center justify-center hover:border-slate-500 hover:bg-slate-300 transition-all cursor-pointer",
        userCourseInput.category === categoryId &&
          "border-slate-500 bg-slate-300"
      )}
      onClick={handleCategoryChange}
    >
      <Icon className="size-10" />
      {CategoryCard.name}
    </div>
  );
};

export default CategoryCard;
