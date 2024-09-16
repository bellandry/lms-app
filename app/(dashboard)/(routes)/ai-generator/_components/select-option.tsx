import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectOption = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-6">
        <div className="flex flex-col gap-4">
          <label htmlFor="">📚 Difficulté du cours</label>
          <Select>
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
          <label htmlFor="">🕰️ Durée du cours</label>
          <Select>
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
          <label htmlFor="">🎥 Inclure des vidéos</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Inclure des vidéos ?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Oui</SelectItem>
              <SelectItem value="no">Non</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="">📖 Nombre de chapitres</label>
          <Input type="number" />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
