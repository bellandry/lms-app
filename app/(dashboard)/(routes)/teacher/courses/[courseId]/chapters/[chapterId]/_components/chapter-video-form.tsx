"use client"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import VideoPlayer from "@/components/video-player"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter, MuxData } from "@prisma/client"
import axios from "axios"
import { Pencil, PlusCircle, VideoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData: MuxData }
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "Une vidéo est obligatoire pour ce chapitre"
  })
})

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl || ""
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("Vidéo mise à jour !")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Une erreur inatendue est survenue")
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Vidéo du cours
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && "Cancel"}
          {!isEditing &&
            (!initialData.videoUrl ?
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter une vidéo
              </> :
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Modifier la vidéo
              </>
            )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <VideoPlayer
              videoUrl={initialData.videoUrl}
            />
          </div>
        )
      ) : (
        <div>
          <FileUpload
            endpoint="courseVideos"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Mettez en ligne la vidéo de ce chapitre
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="flex text-sm text-muted-foreground mt-2">
          La vidéo peut mettre du temps à charger. Actualisez la page si la vidéo n'apparêt pas
        </div>
      )}
    </div>
  )
}