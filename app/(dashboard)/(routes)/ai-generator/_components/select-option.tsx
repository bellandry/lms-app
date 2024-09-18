import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserCourseInputStore } from "@/hooks/ai-user-input-hook";

const SelectOption = () => {
  const { userCourseInput, setUserCourseInput } = useUserCourseInputStore();

  const handleOptions =
    (field: "level" | "duration" | "video" | "chapters") => (value: string) => {
      setUserCourseInput({
        ...userCourseInput,
        options: { ...userCourseInput.options, [field]: value },
      });
    };

  const handleChapters =
    (field: "chapters") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserCourseInput({
        ...userCourseInput,
        options: {
          ...userCourseInput.options,
          [field]: parseInt(e.target.value),
        },
      });
    };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-6">
        <div className="flex flex-col gap-4">
          <Label htmlFor="">📚 Difficulté du cours</Label>
          <Select
            onValueChange={(value) => handleOptions("level")(value)}
            defaultValue={userCourseInput.options.level}
          >
            <SelectTrigger>
              <SelectValue placeholder="Quel est votre niveau ?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Facile</SelectItem>
              <SelectItem value="intermediate">Moyen</SelectItem>
              <SelectItem value="advance ">Difficile</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="">🕰️ Durée du cours</Label>
          <Select
            onValueChange={(value) => handleOptions("duration")(value)}
            defaultValue={userCourseInput.options.duration}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez la durée" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 hour">1 heure</SelectItem>
              <SelectItem value="4 hours">4 heures</SelectItem>
              <SelectItem value="more than 4 hours ">
                Plus de 4 heures
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="">🎥 Inclure des vidéos</Label>
          <Select
            onValueChange={(value) => handleOptions("video")(value)}
            defaultValue={String(userCourseInput.options.video)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Inclure des vidéos ?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Oui</SelectItem>
              <SelectItem value="0">Non</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="chapters">📖 Nombre de chapitres</Label>
          <Input
            type="number"
            id="chapters"
            value={userCourseInput.options.chapters}
            onChange={handleChapters("chapters")}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
