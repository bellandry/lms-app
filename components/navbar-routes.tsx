"use client"

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { UserButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarRoutes = () => {
  const { userId } = useAuth()
  const pathName = usePathname()

  const isTeacherPage = pathName?.startsWith("/teacher")
  const isPlayerPage = pathName?.includes("/chapter")
  const isStudentPage = pathName?.startsWith("/dashboard")

  return (
    <>
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Sortir
            </Button>
          </Link>
        ) : isTeacher(userId) && (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Mode Enseignant
            </Button>
          </Link>
        )}
        <Link href="/dashboard">
            <Button variant="ghost">
              Dashboard
            </Button>
          </Link>
        <UserButton
          afterSignOutUrl="/"
        />
      </div>
    </>
  )
}