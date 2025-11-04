'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MiniPlayer from './MiniPlayer';
import { VideoProvider, useVideo } from '@/contexts/VideoContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentVideo, setCurrentVideo, isMiniPlayerActive, setIsMiniPlayerActive } = useVideo();
  const router = useRouter();
  const pathname = usePathname();

  // Show mini player only when not on watch page and video is set
  const showMiniPlayer = currentVideo && isMiniPlayerActive && !pathname.startsWith('/watch');

  const handleCloseMiniPlayer = () => {
    setIsMiniPlayerActive(false);
    setCurrentVideo(null);
  };

  const handleMaximizeMiniPlayer = () => {
    if (currentVideo) {
      router.push(`/watch?v=${currentVideo.id}`);
      setIsMiniPlayerActive(false);
    }
  };

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:ml-20 mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1920px] mx-auto relative z-10 min-h-screen">
        {children}
      </main>
      
      {/* Mini Player */}
      {showMiniPlayer && (
        <MiniPlayer
          videoId={currentVideo.id}
          title={currentVideo.title}
          onClose={handleCloseMiniPlayer}
          onMaximize={handleMaximizeMiniPlayer}
        />
      )}
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <VideoProvider>
      <LayoutContent>{children}</LayoutContent>
    </VideoProvider>
  );
}

