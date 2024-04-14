"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { redirect } from "next/navigation"

interface CourseEnrollButtonProps {
  price: number
  courseId: string
  className?: string
  chapterId?: string
}

export const CourseEnrollButton = ({ price, courseId, className, chapterId }: CourseEnrollButtonProps) => {
  const onClick = () => {
    return redirect(`/course/${courseId}/chapter/${chapterId}`)
  }
  
  return (
    <Button 
      variant="secondary" 
      className={`w-full md:w-auto ${className}`}
      onClick={() => onClick()}
      >
      Suivre ce cours {price !== 0 && formatPrice(price)}
    </Button>
  )
}