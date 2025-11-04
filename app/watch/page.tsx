import { fetchVideoById, fetchRelatedVideos, Video } from '@/lib/youtube';
import WatchPageClient from '@/components/WatchPageClient';
import { AlertCircle } from 'lucide-react';

interface WatchPageProps {
  searchParams: Promise<{ v?: string }>;
}

export default async function WatchPage({ searchParams }: WatchPageProps) {
  const params = await searchParams;
  const videoId = params.v;

  if (!videoId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="premium-card p-8 sm:p-12 text-center max-w-md w-full">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-2xl opacity-30" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text-vibrant">No Video Selected</h2>
          <p className="text-sm sm:text-base text-gray-400">
            Please select a video to watch
          </p>
        </div>
      </div>
    );
  }

  let video = null;
  let relatedVideos: Video[] = [];
  let error = null;

  try {
    [video, { items: relatedVideos }] = await Promise.all([
      fetchVideoById(videoId),
      fetchRelatedVideos(videoId, 12),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load video';
    console.error('Error loading video:', err);
  }

  if (error || !video) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="premium-card p-8 sm:p-12 text-center max-w-md w-full">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-30" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text-vibrant">Unable to Load Video</h2>
          <p className="text-sm sm:text-base text-gray-400">{error || 'Video not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <WatchPageClient 
      videoId={videoId}
      video={video}
      relatedVideos={relatedVideos}
    />
  );
}
