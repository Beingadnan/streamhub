'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface VideoContextType {
  currentVideo: {
    id: string;
    title: string;
  } | null;
  setCurrentVideo: (video: { id: string; title: string } | null) => void;
  isMiniPlayerActive: boolean;
  setIsMiniPlayerActive: (active: boolean) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [currentVideo, setCurrentVideo] = useState<{ id: string; title: string } | null>(null);
  const [isMiniPlayerActive, setIsMiniPlayerActive] = useState(false);

  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        setCurrentVideo,
        isMiniPlayerActive,
        setIsMiniPlayerActive,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}

