'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Video, formatViewCount, formatPublishedDate } from '@/lib/youtube';
import { Play, Eye, Clock, TrendingUp } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;
  const { snippet, statistics } = video;

  return (
    <Link href={`/watch?v=${videoId}`} className="group block">
      <div className="premium-card card-3d overflow-hidden">
        {/* Thumbnail with gradient overlay */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
          <Image
            src={snippet.thumbnails.medium.url}
            alt={snippet.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full p-4 sm:p-5 transform group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-black" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* View count badge */}
          {statistics?.viewCount && (
            <div className="absolute top-3 right-3 glass px-3 py-1.5 rounded-lg flex items-center gap-1.5 neon-glow-blue">
              <Eye className="w-3 h-3 text-cyan-400" />
              <span className="text-xs font-bold">{formatViewCount(statistics.viewCount)}</span>
            </div>
          )}

          {/* Trending indicator */}
          <div className="absolute top-3 left-3 glass px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
        </div>

        {/* Video details */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base line-clamp-2 mb-3 group-hover:gradient-text-vibrant transition-all">
            {snippet.title}
          </h3>

          {/* Channel info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 p-0.5">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <span className="text-xs font-bold gradient-text-blue">
                  {snippet.channelTitle.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 font-medium truncate group-hover:text-white transition-colors">
              {snippet.channelTitle}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {statistics?.viewCount && (
              <div className="flex items-center gap-1.5">
                <Eye className="w-3 h-3 text-cyan-400" />
                <span className="font-medium">{formatViewCount(statistics.viewCount)}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-purple-400" />
              <span className="font-medium">{formatPublishedDate(snippet.publishedAt)}</span>
            </div>
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 pointer-events-none rounded-[20px]" />
      </div>
    </Link>
  );
}
