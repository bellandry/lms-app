"use client";

import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CourseProgress } from "./course-progress";
import { IconBadge } from "./icon-badge";
import { Badge } from "./ui/badge";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/learn/${id}`}>
      <div className="group hover:shadow-md transition overflow-hidden border rounded-lg h-full">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col p-3">
          <div className="my-1 flex items-center justify-between gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength}{" "}
                {chaptersLength === 1 ? "Chapitre" : "Chapitres"}
              </span>
            </div>
            <div className="text-md md:text-sm font-semibold text-slate-800">
              {price ? (
                <p className="font-bold">{formatPrice(price)}</p>
              ) : (
                <Badge className="bg-gray-700 ml-auto">Gratuit</Badge>
              )}
            </div>
          </div>
          <div className="text-md font-semibold group-hover:text-sky-900 transition-all line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          {progress !== null && (
            <div className="mt-4">
              <CourseProgress
                value={progress}
                size="sm"
                variant={progress === 100 ? "success" : "default"}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
