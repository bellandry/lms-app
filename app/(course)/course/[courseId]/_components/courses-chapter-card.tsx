"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseChapterCardProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  description?: string;
  clickable?: boolean;
}

export const CourseChapterCard = ({
  id,
  label,
  isCompleted,
  isLocked,
  courseId,
  description,
  clickable,
}: CourseChapterCardProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathName.includes(id);

  const onClick = () => {
    clickable && router.push(`/course/${courseId}/chapter/${id}`);
  };

  return (
    <Card
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-600 text-md font-[500] pl-6 transition-all hover:text-slate-700 hover:bg-slate-300/50 w-full h-20 justify-center cursor-pointer",
        isCompleted && "text-emerald-800 hover:text-emerald-900",
        isCompleted && isActive && "bg-emerald-300/20"
      )}
    >
      <div className="flex py-4 flex-col w-full">
        <div className="flex gap-2">
          <Icon
            size="22"
            className={cn(
              "text-slate-700",
              isActive && "text-slate-900",
              isCompleted && "text-emerald-700"
            )}
          />
          {label}
        </div>
        <p className="text-gray-400 text-sm ml-8 truncate">{description}</p>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-500"
        )}
      />
    </Card>
  );
};
