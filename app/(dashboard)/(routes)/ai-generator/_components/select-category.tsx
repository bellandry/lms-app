import { Category } from "@prisma/client";
import CategoryCard from "./category-card";

interface SelectCategoryProps {
  categories: Category[];
}
const SelectCategory = async ({ categories }: SelectCategoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">
        Choisissez la catégorie de votre cours
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full mx-auto">
        {categories.map((category) => {
          return (
            <CategoryCard
              categoryId={category.id}
              categoryName={category.name}
              key={category.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectCategory;
