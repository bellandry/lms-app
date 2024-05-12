"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { SignIn, useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface CourseEnrollButtonProps {
  price: number
  courseId: string
  className?: string
  variant: string
}

export const CourseEnrollButton = ({ price, courseId, className, variant }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { userId } = useAuth()

  const onClick = async () => {
    try {
      setIsLoading(true)

      if(!userId){
        router.push(`/sign-up?redirect_url=${process.env.NEXT_PUBLIC_APP_URL}/learn/${courseId}`)
      }else if(price === 0 || price === null) {
        await axios.post(`/api/courses/${courseId}/enroll`)
        toast.success('Félicitaions! Vous suivez désormais ce cours')
        router.refresh()
      }else{
        const response = await axios.post(`/api/courses/${courseId}/checkout`)

        window.location.assign(response.data.url)
      }
    } catch {
      toast.error("Une erreur inatendue s'est produite")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      variant={variant as "link" | "default" | "secondary" | "destructive" | "outline" | "ghost"}
      className={`w-full md:w-auto ${className}`}
      onClick={onClick}
      disabled={isLoading}
      >
      Suivre ce cours {price !== 0 && price !== null && formatPrice(price)}
    </Button>
  )
}