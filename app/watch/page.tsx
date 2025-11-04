import { fetchVideoById, fetchRelatedVideos, formatViewCount, formatPublishedDate, Video } from '@/lib/youtube';
import VideoPlayer from '@/components/VideoPlayer';
import VideoCard from '@/components/VideoCard';
import { ThumbsUp, ThumbsDown, Share2, Eye, MessageCircle, AlertCircle, Heart, Download } from 'lucide-react';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

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

  const { snippet, statistics } = video;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 fade-in-up">
      {/* Main content */}
      <div className="xl:col-span-2 space-y-6">
        {/* Video player */}
        <div className="premium-card overflow-hidden p-0">
          <VideoPlayer videoId={videoId} />
        </div>

        {/* Video info */}
        <div className="premium-card p-4 sm:p-6 space-y-6">
          {/* Title and stats */}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight">
              {snippet.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              {statistics?.viewCount && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold gradient-text-blue">{formatViewCount(statistics.viewCount)} views</span>
                </div>
              )}
              <span>•</span>
              <span className="font-medium">{formatPublishedDate(snippet.publishedAt)}</span>
            </div>
          </div>

          {/* Channel and actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            {/* Channel info */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-0.5">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold gradient-text-vibrant">
                    {snippet.channelTitle.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base truncate">{snippet.channelTitle}</h3>
                <p className="text-sm text-gray-400">Content Creator</p>
              </div>
              <button className="glow-button px-6 py-2.5 rounded-xl font-bold text-sm text-black whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="glass hover:bg-white/10 px-4 sm:px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all group">
              <ThumbsUp className="w-5 h-5 text-cyan-400 group-hover:text-purple-400 transition-colors" />
              <span>{statistics?.likeCount && formatViewCount(statistics.likeCount)}</span>
            </button>
            
            <button className="glass hover:bg-white/10 px-4 sm:px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all group">
              <ThumbsDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>

            <button className="glass hover:bg-white/10 px-4 sm:px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all group">
              <Share2 className="w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button className="glass hover:bg-white/10 px-4 sm:px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all group">
              <Download className="w-5 h-5 text-pink-400 group-hover:text-cyan-400 transition-colors" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>

          {/* Description */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-bold text-base mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              <span>Description</span>
            </h3>
            <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed line-clamp-4 sm:line-clamp-none">
              {snippet.description || 'No description available'}
            </p>
          </div>

          {/* Comments */}
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-cyan-400" />
              <h3 className="font-bold text-base">
                {statistics?.commentCount ? `${formatViewCount(statistics.commentCount)} Comments` : 'Comments'}
              </h3>
            </div>
            <div className="text-center py-8">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-30" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-black" />
                </div>
              </div>
              <p className="text-sm text-gray-400">Comments feature coming soon...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related videos sidebar */}
      <div className="xl:col-span-1">
        <div className="xl:sticky xl:top-24">
          <div className="premium-card p-4 sm:p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="gradient-text-vibrant">More from</span>
              <span className="text-white">this Channel</span>
            </h2>
            <Suspense fallback={<LoadingSpinner />}>
              <div className="space-y-4">
                {relatedVideos.map((relatedVideo: Video) => {
                  const relatedVideoId =
                    typeof relatedVideo.id === 'string' ? relatedVideo.id : relatedVideo.id.videoId;
                  return <VideoCard key={relatedVideoId} video={relatedVideo} />;
                })}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
