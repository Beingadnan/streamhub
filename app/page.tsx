import { fetchPopularVideos, Video } from '@/lib/youtube';
import VideoGrid from '@/components/VideoGrid';
import CategoryFilter from '@/components/CategoryFilter';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Sparkles, TrendingUp, Zap, Play, Eye } from 'lucide-react';

export default async function Home() {
  let videos: Video[] = [];
  let error = null;

  try {
    const response = await fetchPopularVideos(24);
    videos = response.items;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load videos';
    console.error('Error loading videos:', err);
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text-vibrant">Unable to Load Content</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-4">{error}</p>
          <p className="text-xs text-gray-500">
            Make sure you&apos;ve added your YouTube API key in .env.local
          </p>
        </div>
      </div>
    );
  }

  if (!videos.length) {
    return <LoadingSpinner />;
  }

  // Get featured video (first video)
  const featuredVideo = videos[0];
  const remainingVideos = videos.slice(1);

  return (
    <div className="space-y-8 fade-in-up">
      {/* Hero Section - Featured Video */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="premium-card p-6 sm:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full neon-glow-purple">
                <Sparkles className="w-4 h-4 text-cyan-400 float" />
                <span className="text-sm font-bold gradient-text-blue uppercase tracking-wider">
                  Featured Today
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="gradient-text-vibrant">Discover</span>
                <br />
                <span className="text-white">Next-Gen</span>
                <br />
                <span className="text-white">Content</span>
              </h1>
              
              <p className="text-gray-400 text-base sm:text-lg max-w-xl">
                Experience the future of streaming. Watch, discover, and immerse yourself in endless entertainment.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="glow-button px-8 py-4 rounded-2xl font-bold flex items-center gap-3 text-black group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" />
                  <span>Watch Now</span>
                </button>
                <button className="glass px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all group">
                  <TrendingUp className="w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                  <span>Explore Trending</span>
                </button>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative aspect-video rounded-3xl overflow-hidden glass-strong border-2 border-white/10 group-hover:border-cyan-400/50 transition-all">
                <img
                  src={featuredVideo.snippet.thumbnails.high?.url || featuredVideo.snippet.thumbnails.medium.url}
                  alt="Featured"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white line-clamp-2">{featuredVideo.snippet.title}</h3>
                  {featuredVideo.statistics?.viewCount && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
                      <Eye className="w-4 h-4" />
                      <span>{parseInt(featuredVideo.statistics.viewCount).toLocaleString()} views</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Videos', value: `${videos.length}+`, icon: Play, color: 'from-cyan-400 to-blue-500' },
          { label: 'Watch Time', value: '1M+', icon: TrendingUp, color: 'from-purple-400 to-pink-500' },
          { label: 'Creators', value: '500K+', icon: Sparkles, color: 'from-orange-400 to-red-500' },
          { label: 'Active Users', value: '2M+', icon: Eye, color: 'from-green-400 to-emerald-500' },
        ].map((stat, index) => (
          <div key={stat.label} className="premium-card p-6" style={{ animationDelay: `${index * 100}ms` }}>
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 neon-glow-blue`}>
              <stat.icon className="w-6 h-6 text-black" />
            </div>
            <p className="text-3xl font-bold gradient-text-vibrant mb-1">{stat.value}</p>
            <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Category Filter */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            <span className="gradient-text-vibrant">Browse</span> Categories
          </h2>
        </div>
        <CategoryFilter />
      </section>

      {/* Trending Videos Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <span className="gradient-text-vibrant">Trending</span>
              <span className="text-white">Now</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">Most-watched content this week</p>
          </div>
          <div className="glass px-4 py-2 rounded-2xl">
            <span className="text-sm font-bold gradient-text-blue">{remainingVideos.length} videos</span>
          </div>
        </div>
        <VideoGrid videos={remainingVideos} />
      </section>
    </div>
  );
}
