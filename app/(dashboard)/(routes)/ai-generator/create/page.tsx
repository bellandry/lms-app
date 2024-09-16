"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Map, Paperclip, SquareActivity } from "lucide-react";
import { useState } from "react";

const CreateCoursePage = () => {
  const StepperOptions = [
    { id: 0, name: "Catégorie", icon: SquareActivity },
    { id: 1, name: "Sujet", icon: Paperclip },
    { id: 2, name: "Options", icon: Map },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="max-w-[900px] flex flex-col mx-auto gap-8">
      <div className="w-full flex flex-col mt-14 items-center justify-center h-full">
        <h2 className="text-4xl text-slate-800 font-semibold">
          Créer un cours
        </h2>
        <div className="flex items-center gap-x-24 justify-center mt-14">
          {StepperOptions.map((item) => (
            <div className="flex items-center justify-center" key={item.id}>
              <div className="flex gap-2 flex-col items-center group mx-4 w-[50px]">
                <div
                  className={cn(
                    " border border-slate-400 transition-all p-4 rounded-full group-hover:bg-slate-100 group-hover:text-slate-800",
                    activeIndex >= item.id
                      ? "bg-slate-800 text-slate-200"
                      : "bg-slate-300 text-slate-800"
                  )}
                >
                  <item.icon />
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {item.id !== 2 && (
                <div
                  className={cn(
                    "h-1 w-[50px] rounded-full md:w-[100px] lg:w-[170px] bg-slate-300",
                    activeIndex - 1 >= item.id && "bg-slate-700"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={() => setActiveIndex((index) => index - 1)}
          disabled={activeIndex === 0}
          variant={"outline"}
        >
          Précédent
        </Button>
        {activeIndex < 2 ? (
          <Button onClick={() => setActiveIndex((index) => index + 1)}>
            Suivant
          </Button>
        ) : (
          <Button>Générer le cours</Button>
        )}
      </div>
    </div>
  );
};

export default CreateCoursePage;
