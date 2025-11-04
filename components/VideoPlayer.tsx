'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  videoId: string;
  onVideoLoad?: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function VideoPlayer({ videoId, onVideoLoad }: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
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
              console.log('[VideoPlayer] Player ready');
              setPlayerReady(true);
              event.target.playVideo();
              if (onVideoLoad) onVideoLoad();
            },
            onStateChange: (event: any) => {
              const playing = event.data === window.YT.PlayerState.PLAYING;
              setIsPlaying(playing);
              console.log('[VideoPlayer] State changed:', playing ? 'Playing' : 'Paused');
              
              // Update media session
              if (playing && 'mediaSession' in navigator) {
                navigator.mediaSession.playbackState = 'playing';
              } else if ('mediaSession' in navigator) {
                navigator.mediaSession.playbackState = 'paused';
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
  }, [videoId, onVideoLoad]);

  // Setup Media Session API for lock screen controls
  useEffect(() => {
    if (!playerReady || !playerRef.current) return;

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Playing Video',
        artist: 'StreamHub',
        album: 'Video Platform',
        artwork: [
          { src: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, sizes: '320x180', type: 'image/jpeg' },
          { src: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, sizes: '480x360', type: 'image/jpeg' },
          { src: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`, sizes: '1280x720', type: 'image/jpeg' },
        ],
      });

      // Handle media control buttons
      navigator.mediaSession.setActionHandler('play', () => {
        console.log('[MediaSession] Play requested');
        if (playerRef.current && playerRef.current.playVideo) {
          playerRef.current.playVideo();
        }
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        console.log('[MediaSession] Pause requested');
        if (playerRef.current && playerRef.current.pauseVideo) {
          playerRef.current.pauseVideo();
        }
      });

      navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        console.log('[MediaSession] Seek backward');
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const currentTime = playerRef.current.getCurrentTime();
          playerRef.current.seekTo(Math.max(0, currentTime - (details.seekOffset || 10)), true);
        }
      });

      navigator.mediaSession.setActionHandler('seekforward', (details) => {
        console.log('[MediaSession] Seek forward');
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const currentTime = playerRef.current.getCurrentTime();
          playerRef.current.seekTo(currentTime + (details.seekOffset || 10), true);
        }
      });
    }
  }, [videoId, playerReady]);

  // Handle visibility change - keep playing when screen locks
  useEffect(() => {
    if (!playerReady || !playerRef.current) return;

    const handleVisibilityChange = () => {
      console.log('[VideoPlayer] Visibility changed:', document.visibilityState);
      
      // When page becomes hidden (screen lock/minimize), ensure video keeps playing
      if (document.visibilityState === 'hidden') {
        if (playerRef.current && isPlaying) {
          // YouTube iframe might pause, so we attempt to keep it playing
          setTimeout(() => {
            if (playerRef.current && playerRef.current.playVideo) {
              playerRef.current.playVideo();
              console.log('[VideoPlayer] Attempted to resume playback after hidden');
            }
          }, 100);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Prevent default pause behavior on mobile
    const handlePause = (e: Event) => {
      if (document.visibilityState === 'hidden' && isPlaying) {
        console.log('[VideoPlayer] Preventing pause due to screen lock');
        if (playerRef.current && playerRef.current.playVideo) {
          playerRef.current.playVideo();
        }
      }
    };

    window.addEventListener('blur', handlePause);
    window.addEventListener('pagehide', handlePause);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handlePause);
      window.removeEventListener('pagehide', handlePause);
    };
  }, [isPlaying, playerReady]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Playback info indicator */}
      {isPlaying && (
        <div className="absolute bottom-4 right-4 px-3 py-1 glass-strong rounded-full text-xs text-cyan-400 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          Background playback enabled
        </div>
      )}
    </div>
  );
}
