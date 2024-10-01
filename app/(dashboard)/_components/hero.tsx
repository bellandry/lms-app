"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const isClient = useIsClient();

  const { user, isSignedIn } = useUser();
  return (
    <>
      <section className="relative bg-[url('/herobg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gray-800/75"></div>

        <div className="relative md:container mx-auto w-full px-4 py-32 sm:px-6 lg:flex lg:h lg:items-center lg:px-8">
          <div className="text-center items-center w-full sm:text-left flex flex-col gap-6 sm:gap-2">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl flex flex-col gap-4">
              Apprend gratuitement
              <span className="block font-extrabold bg-gradient-to-tr from-slate-300 via-slate-500 to-blue-100 bg-clip-text text-transparent">
                {" "}
                Le développement Web{" "}
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-center text-white sm:text-lg/relaxed">
              Démarre ta carrière aujourd&apos;hui avec des cours orientés 100%
              pratiques pour maîtriser les concepts, les langages et les
              technologies web modernes
            </p>

            <div className="mt-8 flex w-full gap-4">
              {!isSignedIn ? (
                <Link
                  href="/sign-up"
                  className={cn(
                    "mx-auto",
                    buttonVariants({
                      variant: "secondary",
                      size: "lg",
                    })
                  )}
                >
                  Commencer
                </Link>
              ) : (
                <Link
                  href="/search"
                  className={cn(
                    "mx-auto",
                    buttonVariants({
                      variant: "secondary",
                      size: "lg",
                    })
                  )}
                >
                  Explorer
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
