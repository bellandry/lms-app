// components/VideoPlayer.tsx
import { FullscreenIcon, PauseCircleIcon, PlayCircleIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import shaka from 'shaka-player';

interface ShakaVideoPlayerProps {
  videoUrl: string;
}

const ShakaVideoPlayer = ({ videoUrl }: ShakaVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initPlayer = async () => {
      const player = new shaka.Player(videoRef.current);
      await player.load(videoUrl);
    };

    initPlayer();

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
    <div className="video-player-container">
      <video ref={videoRef} controls className="video-player" />
      <div className="custom-controls">
        <button className="control-button"><PlayCircleIcon /></button>
        <button className="control-button"><PauseCircleIcon /></button>
        <button className="control-button"><FullscreenIcon /></button>
      </div>
    </div>
  )
};

export default ShakaVideoPlayer;
