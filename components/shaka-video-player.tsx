"use client"

import { useEffect, useRef } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';

import 'shaka-player/dist/controls.css';

interface ShakaVideoPlayerProps {
  videoUrl: string;
  className?: string
  onReady: () => void
}


const ShakaVideoPlayer = ({ videoUrl, className, onReady }: ShakaVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPlayer = async () => {
      shaka.polyfill.installAll();
      if (shaka.Player.isBrowserSupported()) {
        const player = new shaka.Player(videoRef.current);
        const ui = new shaka.ui.Overlay(player, videoContainerRef.current, videoRef.current);

        const config = {
          addSeekBar: true,
          overflowMenuButtons: ['cast'],
          enableTooltips: true,
          seekBarColors: {
            base: 'rgba(255, 255, 255, 0.3)',
            buffered: 'rgba(255, 0, 0, 0.2)',
            played: 'red',
          },
        };
        ui.configure(config);
        await player.load(videoUrl);
      } else {
        console.error('Navigateur non supporté par Shaka Player');
      }
    };

    initPlayer();
    onReady()

    return () => {
      if (videoRef.current) {
        const player = new shaka.Player(videoRef.current);
        if (player) {
          player.destroy();
        }
      }
    };
  }, [videoUrl]);

  return (
    <div ref={videoContainerRef} className={`video-player-container ${className}`}>
      <video ref={videoRef} className="video-player w-full rounded-md" />
    </div>
  )
};

export default ShakaVideoPlayer;
