"use client"

import { formatPrice } from "@/lib/format"
import { BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { IconBadge } from "./icon-badge"

interface CourseCardProps {
  id: string
  title: string
  imageUrl: string
  chaptersLength: number
  price: number
  progress: number | null
  category: string
}


export const CourseCard = ({ id, title, imageUrl, chaptersLength, price, progress, category }: CourseCardProps) => {
  return (
    <Link href={`/course/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col p-3">
          <div className="text-lg font-semibold group-hover:text-sky-800 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs textt-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapitre" : "Chapitres"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <div>
              Progress Component
            </div>
          ) : (
            <p className="text-md md:text-sm font-semibold text-slate-800">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}