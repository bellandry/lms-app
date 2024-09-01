"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return <p>Loading</p>;
  }

  const { user, isSignedIn } = useUser();
  return (
    <>
      <section className="relative bg-[url('/herobg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto w-full px-4 py-32 sm:px-6 lg:flex lg:h lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left flex flex-col gap-6 sm:gap-2">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Apprendre
              <span className="block font-extrabold text-blue-500">
                {" "}
                Sans Aucune{" "}
              </span>
              Limite
            </h1>

            <p className="mt-4 max-w-lg text-white sm:text-lg/relaxed">
              Démarre ta carrière aujourd&apos;hui avec des cours orientés 100%
              pratiques pour maîtriser les technologies web modernes
            </p>

            <div className="mt-8 flex w-full gap-4">
              {!isSignedIn ? (
                <Link
                  href="/sign-up"
                  className={cn(
                    "mx-auto md:mx-0",
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
                    "mx-auto md:mx-0",
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
