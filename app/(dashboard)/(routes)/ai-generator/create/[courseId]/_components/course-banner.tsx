"use client";

import { ImageForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/image-form";
import { Course } from "@prisma/client";
import { ArrowLeft, Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type CourseBannerProps = {
  course: Course;
};

export const CourseBanner = ({ course }: CourseBannerProps) => {
  const [editImage, setEditImage] = useState(false);

  const handleEditImage = () => {
    setEditImage(!editImage);
  };

  return !editImage ? (
    <div className="relative w-full h-52">
      <div>
        {course.imageUrl && (
          <Image
            src={course.imageUrl!}
            alt="Dynamic Background"
            layout="fill"
            objectFit="cover"
            className="rounded-sm"
          />
        )}
        <div className="absolute flex-col inset-0 flex items-center justify-center bg-slate-900 bg-opacity-60 px-4 rounded-md">
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            {course.title}
          </h1>
        </div>
        <div
          onClick={handleEditImage}
          className="absolute p-2 bg-blue-100 hover:bg-slate-300 transition-all rounded-full w-10 h-10 top-2 right-2 text-slate-800 cursor-pointer"
        >
          <Edit className="w-6 h-6 " />
        </div>
      </div>
    </div>
  ) : (
    <div className="relative w-full">
      <div
        onClick={handleEditImage}
        className="absolute gap-1 p-2 flex items-center transition-all rounded-full mb-2 top-6 right-3 text-slate-800 cursor-pointer"
      >
        <ArrowLeft className="size-5" /> Annuler
      </div>
      <ImageForm
        initialData={course}
        courseId={course.id}
        edit
        aiState={setEditImage}
      />
    </div>
  );
};
