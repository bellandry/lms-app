"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathName = usePathname();

  const isTeacherPage = pathName?.startsWith("/teacher");
  const isPlayerPage = pathName?.includes("/chapter");

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
        ) : (
          isTeacher(userId) && (
            <Link href="/teacher/courses">
              <Button size="sm" variant="ghost">
                Mode Enseignant
              </Button>
            </Link>
          )
        )}
        {userId ? (
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({
                variant: "default",
              })
            )}
          >
            Se Connecter
          </Link>
        )}
        <UserButton />
      </div>
    </>
  );
};
