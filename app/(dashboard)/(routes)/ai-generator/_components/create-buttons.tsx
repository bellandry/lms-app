"use client";

import { Button } from "@/components/ui/button";
import { useActiveIndexStore } from "@/hooks/use-aicourse-step-store";

export const CreateButtons = () => {
  const { activeIndex, setActiveIndex } = useActiveIndexStore();

  return (
    <div className="flex justify-between">
      <Button
        onClick={() => setActiveIndex(activeIndex - 1)}
        disabled={activeIndex === 0}
        variant={"outline"}
      >
        Précédent
      </Button>
      {activeIndex < 2 ? (
        <Button onClick={() => setActiveIndex(activeIndex + 1)}>Suivant</Button>
      ) : (
        <Button>Générer le cours</Button>
      )}
    </div>
  );
};
