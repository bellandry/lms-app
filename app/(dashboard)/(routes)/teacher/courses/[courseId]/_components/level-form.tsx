"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Selectbox } from "@/components/ui/selectbox";
import { cn } from "@/lib/utils";

interface LevelFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  level: z.string().min(1),
});

export const LevelForm = ({ initialData, courseId }: LevelFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: initialData?.level || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  const options = [
    { label: "Débutant", value: "débutant" },
    { label: "Intermédiaire", value: "intermédiaire" },
    { label: "Avancé", value: "avancé" },
    { label: "Expert", value: "expert" },
  ];

  const selectedOption = options.find(
    (option) => option.value === initialData.level
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Level
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit level
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.level && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No level"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Selectbox
                      options={options}
                      {...field}
                      label="Catégories"
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
      )}
    </div>
  );
};
