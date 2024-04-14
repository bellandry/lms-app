"use client"

import { Editor } from "@/components/editor"
import { Preview } from "@/components/preview"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter } from "@prisma/client"
import axios from "axios"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface ChapterContentFormProps {
  initialData: Chapter
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  content: z.string().min(10, {
    message: "Le contenu ne peut être vide"
  })
})

export const ChapterContentForm = ({
  initialData,
  courseId,
  chapterId
}: ChapterContentFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: initialData?.content || ""
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("Contenu mis à jour !")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Une erreur inatendue est survenue")
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Contenu du chapitre
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Cancel" :
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier le contenu
            </>
          }
        </Button>
      </div>
      {!isEditing ?
        <div className={cn(
          "text-sm mt-2 max-h-96 overflow-y-auto",
          !initialData.content && "text-slate-500 italic"
        )}>
          {initialData.content ? <Preview value={initialData.content} /> : "Aucun contenu pour le moment"}
        </div> :
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="ml-auto"
              >
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      }

    </div>
  )
}