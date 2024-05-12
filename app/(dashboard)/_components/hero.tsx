'use client'

import DisplayHour from "@/components/display-hour";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const isClient = useIsClient()

  if(!isClient) {
    return <p>Loading</p>
  }

  const { user, isSignedIn } = useUser()
  return (
    <div className="w-full relative h-64 mx-auto flex md:w-4/5 text-white ">
      <Image src='/herobg.jpg' alt="Home hero backgroun" layout="fill" objectFit="cover" />
      <div className="absolute inset-0 flex gap-4 md:flex-row items-center justify-center bg-gradient-to-r from-slate-900 px-4 md:px-8">
        <div className="flex flex-col gap-2 md:gap-4">
          {isSignedIn ? 
            <>
              <h1 className="text-4xl md:text-5xl font-bold">Hello {user.firstName}</h1>
              <p className="font-semibold md:text-lg">Continue là où tu t'es arrêté</p>
            </> :
            <>
              <h1 className="text-4xl md:text-5xl font-bold">Bienvenu sur Laclass Learn</h1> 
              <p className="font-semibold md:text-lg">Apprendre par la pratique</p>
            </>
          }
          <p className="text-sm md:text-md">Le meilleur moyen d'apprendre, c'est par la pratique</p>
        </div>
        <h2 className="py-2 px-8 bg-slate-700 bg-opacity-50 w-fit rounded-sm font-semibold ml-auto">
          <DisplayHour initialTime={new Date()} />
        </h2>
      </div>
    </div>
  );
}

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}