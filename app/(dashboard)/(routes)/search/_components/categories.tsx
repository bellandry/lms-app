"use client"

import { Category } from "@prisma/client"
import { IconType } from "react-icons"
import { FcComboChart, FcCommandLine, FcEditImage, FcLock, FcMultipleCameras, FcMultipleSmartphones, FcMusic } from "react-icons/fc"
import { CategoryItem } from "./category-item"

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Photographie": FcMultipleCameras,
  "programmation": FcCommandLine,
  "Comptabilité": FcComboChart,
  "Infographie": FcEditImage,
  "Sécurité informatique": FcLock,
  "Intelligence artificielle": FcMultipleSmartphones
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center mx-auto gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}
