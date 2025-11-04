import { searchVideos, Video } from '@/lib/youtube';
import VideoGrid from '@/components/VideoGrid';
import { Search, AlertCircle, Sparkles, Zap } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q;

  if (!query) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="premium-card p-8 sm:p-12 text-center max-w-md w-full">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-2xl opacity-30 pulse-glow" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center float">
              <Search className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text-vibrant">Start Searching</h2>
          <p className="text-sm sm:text-base text-gray-400">
            Enter a search query to discover amazing content
          </p>
        </div>
      </div>
    );
  }

  let videos: Video[] = [];
  let error = null;

  try {
    const response = await searchVideos(query, 24);
    videos = response.items;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to search videos';
    console.error('Error searching videos:', err);
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="premium-card p-8 sm:p-12 text-center max-w-md w-full">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-30" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text-vibrant">Search Error</h2>
          <p className="text-sm sm:text-base text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="premium-card p-8 sm:p-12 text-center max-w-md w-full">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-yellow-500 rounded-full blur-2xl opacity-30" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Zap className="w-10 h-10 text-black" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text-vibrant">No Results Found</h2>
          <p className="text-sm sm:text-base text-gray-400">
            Try different keywords or check your spelling
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in-up">
      {/* Search Header */}
      <section className="premium-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-xl opacity-30" />
            <div className="relative p-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
          </div>
          <div className="flex-1">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 block">
              Search Results
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              <span className="gradient-text-vibrant">&quot;{query}&quot;</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Found <span className="gradient-text-blue font-bold">{videos.length}</span> videos for you
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section>
        <VideoGrid videos={videos} />
      </section>
    </div>
  );
}
