import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserCourseInputStore } from "@/hooks/ai-user-input-hook";

export const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useUserCourseInputStore();

  const handleSubject =
    (field: "subject" | "description") =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setUserCourseInput({
        ...userCourseInput,
        subject: { ...userCourseInput.subject, [field]: e.target.value },
      });
    };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label>💡 Ecrivez le sujet pour lequel vous voulez le cours</label>
        <Input
          placeholder="Ex: Apprendre le SQL"
          value={userCourseInput.subject.subject}
          onChange={handleSubject("subject")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>✍🏾 Décrivez ce que vous désirez apprendre</label>
        <Textarea
          placeholder="Ex: Comment utiliser une base données SQL dans une application React..."
          value={userCourseInput.subject.description}
          onChange={handleSubject("description")}
        />
      </div>
    </div>
  );
};
