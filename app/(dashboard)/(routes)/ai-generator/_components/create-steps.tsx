"use client";

import { StepperOptions } from "@/constants";
import { useActiveIndexStore } from "@/hooks/use-aicourse-step-store";
import { cn } from "@/lib/utils";

export const CreateSteps = () => {
  const { activeIndex, setActiveIndex } = useActiveIndexStore();

  return (
    <div className="flex items-center justify-between mt-8">
      {StepperOptions.map((item) => (
        <div className="flex items-center justify-betwen" key={item.id}>
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
                "h-1 w-[50px] rounded-full md:w-[150px] lg:w-[250px] bg-slate-300 transition-all",
                activeIndex - 1 >= item.id && "bg-slate-700"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};
