"use client"

import ShakaVideoPlayer from "@/components/shaka-video-player"
import { Chapter } from "@prisma/client"
import { Loader, Lock } from "lucide-react"
import { useState } from "react"

interface ChapterVideoPlayerProps {
  chapter: Chapter,
  isLocked: boolean,
}

export const ChapterVideoPlayer = ({ chapter, isLocked }: ChapterVideoPlayerProps) => {
  const [isready, setIsReady] = useState(false)

  const onReady = () => { setIsReady(true) }

  return (
    <div className="aspect-video relative transition-all">
      {!isLocked && !isready && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 flex-col gap-3  text-secondary rounded-md">
          <Loader className="h-8 w-8 animate-spin" />
          <p className="text-md">Chargement de la vidéo</p>
        </div>
      )}
      {isLocked ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 flex-col gap-3  text-secondary rounded-md">
          <Lock className="h-8 w-8 " />
          <p className="text-md ">  Ce chapitre est bloqué </p>
        </div>
      ) : (
        <ShakaVideoPlayer
          videoUrl={chapter.videoUrl!}
          onReady={onReady}
        />
      )}

    </div>
  )
}