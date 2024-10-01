import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CategoryCard } from "./_components/category-card";

const CategoryPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const categories = await db.category.findMany();

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold">Catégories</h1>
      </div>
      <div className="py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            id={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
