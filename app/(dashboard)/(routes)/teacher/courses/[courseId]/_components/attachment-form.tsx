"use client"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Attachment, Course } from "@prisma/client"
import axios from "axios"
import { File, Loader2, PlusCircle, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import * as z from "zod"

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}

const formSchema = z.object({
  url: z.string().min(1)
})

export const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success("Document mis à jour !")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Une erreur inatendue est survenue")
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await (axios.delete(`/api/courses/${courseId}/attachments/${id}`))
      toast.success("Fichier supprimé")
      router.refresh()
    } catch {
      toast.error("Une erreur inatendue est survenue")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Ressources du cours
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && "Cancel"}
          {!isEditing &&
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une ressource
            </>
          }
        </Button>
      </div>
      {!isEditing ? (
        <>
          {initialData.attachments.length === 0 ? (
            <p className="text-sm mt-2 text-slate-500 italic">
              Aucun fichier ressource associé à ce cours
            </p>
          ) : (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  className="flex items-center p-3 w-full bg-sky-100 border text-sky-800 rounded-md"
                  key={attachment.id}
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xm line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id ?
                    <Loader2 className="ml-auto animate-spin f-4 w-4" />
                    :
                    <button
                      className="ml-auto"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-700 hover:animate-bounce" />
                    </button>
                  }
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Ajoutez des documents et fichiers dont les apprenants auront besoins pour ce cours
          </div>
        </div>
      )}
    </div>
  )
}