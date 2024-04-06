"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionsProps {
  disabled: boolean,
  courseId: string,
  isPublished: boolean
}



export const CourseActions = ({ disabled, courseId, isPublished }: CourseActionsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const confetti = useConfettiStore()

  const onDelete = async () => {
    try {
      setIsLoading((current) => !current)
      await axios.delete(`/api/courses/${courseId}`)
      toast.success("Cours supprimé !")
      router.push(`/teacher/courses`)
    } catch {
      toast.error("Une erreur inatendue est survenue")
    } finally {
      setIsLoading((current) => !current)
    }
  }

  const onClick = async () => {
    try {
      setIsLoading((current) => !current)
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success("Cours mis en brouillon !")
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success("Cours publié !")
        confetti.onOpen()
      }
      router.refresh()
    } catch {
      toast.error("Une erreur inatendue est survenue")
    } finally {
      setIsLoading((current) => !current)
    }
  }
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="">
        {isPublished ? "Mettre en Brouillon" : "Publier"}
      </Button>
      <ConfirmModal
        onConfirm={onDelete}
      >
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
}
