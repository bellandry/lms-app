import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CreateButtons } from "../_components/create-buttons";
import { CreateSteps } from "../_components/create-steps";
import { StepSwitch } from "../_components/step-switch";

const CreateCoursePage = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const categories = await db.category.findMany({
    where: {
      enable: true,
      isAiGeneration: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className="max-w-[800px] flex flex-col mx-auto gap-8">
        <div className="w-full flex flex-col mt-8 md:mt-14 items-center justify-center h-full">
          <h2 className="text-2xl md:text-3xl text-slate-800 font-semibold">
            Créer un cours
          </h2>
          <CreateSteps />
        </div>
        <div>
          <StepSwitch categories={categories} />
        </div>
        <CreateButtons userId={userId} />
      </div>
    </>
  );
};

export default CreateCoursePage;
