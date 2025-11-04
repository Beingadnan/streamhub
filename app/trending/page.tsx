import { fetchPopularVideos, Video } from '@/lib/youtube';
import VideoGrid from '@/components/VideoGrid';
import LoadingSpinner from '@/components/LoadingSpinner';
import { TrendingUp, Flame, Zap, Sparkles } from 'lucide-react';

export default async function TrendingPage() {
  let videos: Video[] = [];
  let error = null;

  try {
    const response = await fetchPopularVideos(48);
    videos = response.items;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load trending videos';
    console.error('Error loading trending videos:', err);
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="premium-card p-8 sm:p-12 text-center max-w-md w-full">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-30" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
              <Zap className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text-vibrant">Unable to Load</h2>
          <p className="text-sm sm:text-base text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!videos.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8 fade-in-up">
      {/* Hero Section */}
      <section className="premium-card p-6 sm:p-8 lg:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl" />
        
        <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full neon-glow-purple">
              <Flame className="w-4 h-4 text-orange-400 float" />
              <span className="text-sm font-bold gradient-text-purple uppercase tracking-wider">
                Hot Right Now
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="gradient-text-vibrant">Trending</span>
              <br />
              <span className="text-white">Videos</span>
            </h1>
            
            <p className="text-gray-400 text-base sm:text-lg max-w-xl">
              Discover what&apos;s hot and popular right now. The most-watched videos everyone is talking about.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-xs text-gray-400">Total Views</p>
                  <p className="text-xl font-bold gradient-text-vibrant">10M+</p>
                </div>
              </div>
              <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-400">Videos</p>
                  <p className="text-xl font-bold gradient-text-blue">{videos.length}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-full blur-3xl opacity-30 float" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center neon-glow-purple">
              <TrendingUp className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="gradient-text-vibrant">What&apos;s</span> <span className="text-white">Popular</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">Updated in real-time</p>
          </div>
          <div className="glass px-4 py-2 rounded-2xl">
            <span className="text-sm font-bold gradient-text-blue">{videos.length} videos</span>
          </div>
        </div>
        <VideoGrid videos={videos} />
      </section>
    </div>
  );
}
