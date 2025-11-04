'use client';

import { X, Maximize2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MiniPlayerProps {
  videoId: string;
  title: string;
  onClose: () => void;
  onMaximize: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MiniPlayer({ videoId, title, onClose, onMaximize }: MiniPlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize YouTube player
    const initPlayer = () => {
      if (containerRef.current && window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
            },
            onStateChange: (event: any) => {
              const playing = event.data === window.YT.PlayerState.PLAYING;
              setIsPlaying(playing);
              
              if (playing && 'mediaSession' in navigator) {
                navigator.mediaSession.playbackState = 'playing';
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Setup Media Session API
  useEffect(() => {
    if (!playerRef.current) return;

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: 'StreamHub',
        album: 'Mini Player',
        artwork: [
          { src: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, sizes: '320x180', type: 'image/jpeg' },
          { src: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, sizes: '480x360', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        if (playerRef.current && playerRef.current.playVideo) {
          playerRef.current.playVideo();
        }
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        if (playerRef.current && playerRef.current.pauseVideo) {
          playerRef.current.pauseVideo();
        }
      });
    }

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isPlaying) {
        setTimeout(() => {
          if (playerRef.current && playerRef.current.playVideo) {
            playerRef.current.playVideo();
          }
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [videoId, title, isPlaying]);

  return (
    <div className="fixed bottom-4 right-4 z-50 fade-in-up">
      <div className="premium-card overflow-hidden w-[320px] sm:w-[400px] shadow-2xl">
        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <div ref={containerRef} className="w-full h-full" />
          
          {/* Controls Overlay */}
          <div className="absolute top-0 left-0 right-0 glass-strong p-2 flex items-center justify-between z-10">
            <button
              onClick={onMaximize}
              className="p-2 hover:bg-white/20 rounded-lg transition-all group"
              title="Expand to full player"
            >
              <Maximize2 className="w-4 h-4 text-white group-hover:text-cyan-400 transition-colors" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all group"
              title="Close mini player"
            >
              <X className="w-4 h-4 text-white group-hover:text-red-400 transition-colors" />
            </button>
          </div>
        </div>
        
        {/* Video Info */}
        <div className="p-3 glass-strong">
          <p className="text-sm font-semibold line-clamp-2 text-white">
            {title}
          </p>
          <p className="text-xs text-cyan-400 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            {isPlaying ? 'Playing in background' : 'Paused'}
          </p>
        </div>
      </div>
    </div>
  );
}

