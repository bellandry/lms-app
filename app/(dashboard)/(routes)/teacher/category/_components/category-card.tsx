import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical, Pencil } from "lucide-react";
import Link from "next/link";

export type CategoryCardProps = {
  name: string;
  id: string;
};

export const CategoryCard = ({ name, id }: CategoryCardProps) => {
  return (
    <div className="relative text-center hover:bg-slate-100 transition-all ring-1 flex items-center justify-center py-10 px-6 ring-slate-400 bg-slate-200 text-slate-900 rounded-md">
      <div className="absolute top-3 right-3 flex flex-col gap-0 rounded-full transition-all p-1 h-6 w-6 cursor-pointer items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-4 p-0">
              <span className="sr-only">Menu</span>
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/category/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Modifier
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {name}
    </div>
  );
};
