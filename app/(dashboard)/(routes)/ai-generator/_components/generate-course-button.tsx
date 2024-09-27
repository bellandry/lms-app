import { SaveAiCourse } from "@/actions/save-ai-course";
import { Button } from "@/components/ui/button";
import { GenerateCourseModel } from "@/configs/ai-model";
import { parseJSON } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

type InputsType = {
  disabled: boolean;
  isLoading: boolean;
  onLoading: (active: boolean) => void;
  inputs: {
    category: { id: string; name: string };
    subject: { subject: string; description: string };
    options: {
      level: string;
      duration: string;
      video: boolean;
      chapters: number;
      language: string;
    };
  };
};

export const GenerateCourseButton = ({
  inputs,
  disabled,
  isLoading,
  onLoading,
}: InputsType) => {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) return redirect("/ai-generator");

  const GenerateCourseLayout = async () => {
    onLoading(true);
    const BASIC_PROMPT = `Generate a course tutorial on following detail with field as course name, description, along with chapter name, about, duration:`;
    const USER_INPUT_PROMPT = `Category: '${inputs.category.name}', topic: '${inputs.subject.subject}', description: '${inputs.subject.description}', level: '${inputs.options.level}', duration: '${inputs.options.duration}' NoOf Chapters: ${inputs.options.chapters}, language: '${inputs.options.language}', don't add chapter if it possibly have safety content issue. Just return in json and no more words or caracters`;
    const FINAL_PROMPT = `${BASIC_PROMPT} ${USER_INPUT_PROMPT}`;
    try {
      const result = await GenerateCourseModel.sendMessage(FINAL_PROMPT);
      const courseText = result.response?.text();
      if (courseText) {
        const parsedCourse = parseJSON(courseText);

        const saveCourse = await SaveAiCourse({
          userId: userId,
          course: parsedCourse.course ? parsedCourse.course : parsedCourse,
          categoryId: inputs.category.id,
        });
        if (
          typeof saveCourse === "object" &&
          saveCourse !== null &&
          "id" in saveCourse
        ) {
          router.push(`/ai-generator/create/${saveCourse.id}`);
        }
      }
    } catch (error) {
      toast.error("Une erreur inatendue s'est produite, Réessayez plus tard");
      console.log("[GEMINI] ", error);
    } finally {
      onLoading(false);
    }
  };
  return (
    <Button disabled={disabled} onClick={() => GenerateCourseLayout()}>
      {isLoading && <LoaderCircle className="animate-spin size-4 mr-2" />}
      Générer le cours
    </Button>
  );
};
