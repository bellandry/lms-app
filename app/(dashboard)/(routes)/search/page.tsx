import { SearchInput } from "@/components/search-input";
import { db } from "@/lib/db";
import { HeroSection } from "../../_components/hero";
import { Categories } from "./_components/categories";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })
  return (
    <>
      <HeroSection />
      <div className="block px-6 pt-6 md:hidden md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6 flex items-center">
        <Categories
          items={categories}
        />
      </div>
    </>
  );
}

export default SearchPage;