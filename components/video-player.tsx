"use client"

import Hls from "hls.js";
import { useEffect } from "react";

interface VideoPlayerProps {
  videoUrl: string
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    if (!video) {
      console.error(`Video element not found`);
      return;
    }


    if (videoUrl.toLowerCase().endsWith('.mp4')) {
      video.src = videoUrl;
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    } else {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', function () {
          video.play();
        });
      }
    }
  }, [videoUrl]);

  return (
    <>
      <video className="w-hull h-full rounded-md" id="video" controls controlsList="nodownload"></video >
    </>
  );
};

export default VideoPlayer;