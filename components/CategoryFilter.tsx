'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, Music, Gamepad2, Trophy, Lightbulb, Film, Zap } from 'lucide-react';

const categories = [
  { name: 'All', icon: Sparkles, gradient: 'from-cyan-400 to-blue-500' },
  { name: 'Trending', icon: TrendingUp, gradient: 'from-orange-400 to-red-500' },
  { name: 'Music', icon: Music, gradient: 'from-pink-400 to-purple-500' },
  { name: 'Gaming', icon: Gamepad2, gradient: 'from-purple-400 to-indigo-500' },
  { name: 'Sports', icon: Trophy, gradient: 'from-green-400 to-emerald-500' },
  { name: 'Learning', icon: Lightbulb, gradient: 'from-yellow-400 to-amber-500' },
  { name: 'Movies', icon: Film, gradient: 'from-violet-400 to-purple-500' },
  { name: 'Live', icon: Zap, gradient: 'from-red-400 to-pink-500' },
];

export default function CategoryFilter() {
  const [selected, setSelected] = useState('All');

  return (
    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selected === category.name;
        
        return (
          <button
            key={category.name}
            onClick={() => setSelected(category.name)}
            className={`
              relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl whitespace-nowrap text-xs sm:text-sm font-bold transition-all flex-shrink-0 group overflow-hidden
              ${
                isSelected
                  ? 'neon-glow-blue'
                  : 'glass hover:bg-white/10'
              }
            `}
          >
            {/* Gradient background on selected */}
            {isSelected && (
              <>
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-20`} />
                <div className="absolute inset-0 shimmer opacity-50" />
              </>
            )}

            {/* Icon */}
            <Icon className={`relative z-10 w-4 h-4 transition-all ${
              isSelected 
                ? 'text-cyan-400' 
                : 'text-gray-400 group-hover:text-white'
            }`} />

            {/* Label */}
            <span className={`relative z-10 ${
              isSelected
                ? 'gradient-text-vibrant'
                : 'text-gray-400 group-hover:text-white'
            }`}>
              {category.name}
            </span>

            {/* Glow effect on hover */}
            {!isSelected && (
              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
            )}
          </button>
        );
      })}
    </div>
  );
}
