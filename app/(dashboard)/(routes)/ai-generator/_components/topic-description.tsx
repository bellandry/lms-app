import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const TopicDescription = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label>💡 Ecrivez le sujet pour lequel vous voulez le cours</label>
        <Input placeholder="Ex: Apprendre le SQL" />
      </div>
      <div className="flex flex-col gap-2">
        <label>✍🏾 Décrivez ce que vous désirez apprendre</label>
        <Textarea placeholder="Ex: Comment utiliser une base données SQL dans une application React..." />
      </div>
    </div>
  );
};
