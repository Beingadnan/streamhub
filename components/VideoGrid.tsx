'use client';

import { Video } from '@/lib/youtube';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {videos.map((video) => {
        const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;
        return <VideoCard key={videoId} video={video} />;
      })}
    </div>
  );
}
