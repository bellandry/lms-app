"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseGenerateButtonProps {
  price: number;
  courseId: string;
  className?: string;
  variant: string;
}

export const CourseGenerateButton = ({
  price,
  courseId,
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
          `/sign-in?redirect_url=${process.env.NEXT_PUBLIC_APP_URL}/ai-generator/create/${courseId}`
        );
      } else if (price === 0 || price === null) {
      } else {
        const response = await axios.post(`/api/courses/${courseId}/checkout`);

        window.location.assign(response.data.url);
      }
    } catch {
      toast.error("Une erreur inatendue s'est produite");
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
      Générer le contenu du cours
    </Button>
  );
};
