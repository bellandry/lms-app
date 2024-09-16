import { iconMap } from "@/constants";
import { Category } from "@prisma/client";

interface SelectCategoryProps {
  categories: Category[];
}
const SelectCategory = async ({ categories }: SelectCategoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">
        Choisissez la catégorie de votre cours
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full">
        {categories.map((category) => {
          const Icon = iconMap[category.name];
          return (
            <div
              key={category.id}
              className="aspect-video text-sm sm:text-md flex gap-3 p-2 text-center flex-col bg-slate-200 border rounded-xl border-slate-300 items-center justify-center hover:border-slate-500 hover:bg-slate-300 transition-all cursor-pointer"
            >
              <Icon className="size-10" />
              {category.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectCategory;
