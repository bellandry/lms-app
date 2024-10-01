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
import { Crown } from "lucide-react";

const SelectOption = () => {
  const { userCourseInput, setUserCourseInput } = useUserCourseInputStore();

  const handleOptions =
    (field: "level" | "duration" | "video" | "chapters" | "language") =>
    (value: string) => {
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
              <SelectItem disabled={true} value="advanced">
                <span className="flex gap-14 justify-between items-center">
                  <span className="w-fit">Avancé</span>
                  <span className="font-bold flex items-center gap-2 ml-auto py-1 px-3 bg-blue-700/20 rounded-full">
                    <Crown className="size-3" /> PRO
                  </span>
                </span>
              </SelectItem>
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
              <SelectItem disabled={true} value="more than 4 hours ">
                <span className="flex gap-14 justify-between items-center">
                  <span className="w-fit">Plus de 4 heures</span>
                  <span className="font-bold flex items-center gap-2 ml-auto py-1 px-3 bg-blue-700/20 rounded-full">
                    <Crown className="size-3" /> PRO
                  </span>
                </span>
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
              <SelectItem value="false">Non</SelectItem>
              <SelectItem disabled={true} value="true">
                <span className="flex gap-14 justify-between items-center">
                  <span className="w-fit">Oui</span>
                  <span className="font-bold flex items-center gap-2 ml-auto py-1 px-3 bg-blue-700/20 rounded-full">
                    <Crown className="size-3" /> PRO
                  </span>
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="chapters">📖 Nombre de chapitres</Label>
          <Input
            type="number"
            id="chapters"
            max="6"
            min="1"
            value={userCourseInput.options.chapters}
            onChange={handleChapters("chapters")}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="">🎥 Langue</Label>
          <Select
            onValueChange={(value) => handleOptions("language")(value)}
            defaultValue={String(userCourseInput.options.language)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisissez votre langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="french">Français</SelectItem>
              <SelectItem value="english">Anglais</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
