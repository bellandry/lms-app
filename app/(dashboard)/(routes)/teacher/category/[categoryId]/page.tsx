import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { AiEnableAccessForm } from "./_components/ai-enable-form";
import { EnableAccessForm } from "./_components/enable-access-form";
import { NameForm } from "./_components/name-form";

const CourseIdPage = async ({ params }: { params: { categoryId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      courses: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!category) {
    return redirect("/teacher/category");
  }

  const requiredFields = [
    category.name,
    category.enable,
    category.isAiGeneration,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!category.enable && (
        <Banner variant="warning" label="Cette catégorie est désactivée" />
      )}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Editer la catégorie</h2>
            </div>
            <NameForm initialData={category} categoryId={category.id} />
          </div>
          <div className="space-y-6">
            <div>
              <AiEnableAccessForm
                initialData={category}
                categoryId={category.id}
              />
            </div>
            <div>
              <EnableAccessForm
                initialData={category}
                categoryId={category.id}
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
