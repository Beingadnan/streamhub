'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, Play, Bell, User, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left section */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-white/10 rounded-xl transition-all lg:hidden group"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
            </button>
            
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-black" fill="currentColor" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gradient-text-vibrant">StreamHub</h1>
                <p className="text-xs text-gray-400 -mt-0.5">Next-Gen Streaming</p>
              </div>
            </Link>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full group">
              <div className="relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for amazing content..."
                  className="relative w-full px-6 py-3 bg-white/5 border border-white/10 rounded-l-2xl outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all text-sm backdrop-blur-xl"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="relative px-6 py-3 glow-button rounded-r-2xl font-semibold text-sm text-black overflow-hidden group"
              >
                <span className="relative z-10">Search</span>
              </button>
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link
              href="/trending"
              className="hidden lg:flex items-center gap-2 px-4 py-2 glass hover:bg-white/10 rounded-xl transition-all group"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:text-purple-400 transition-colors" />
              <span className="text-sm font-medium">Trending</span>
            </Link>
            
            <button className="relative p-2 hover:bg-white/10 rounded-xl transition-all group">
              <Bell className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full pulse-glow" />
            </button>
            
            <button className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 hover:scale-110 transition-transform p-0.5 neon-glow-blue">
              <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="md:hidden pb-4 fade-in-up">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-2xl blur" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="relative w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-cyan-400/50 text-sm backdrop-blur-xl"
                autoFocus
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
