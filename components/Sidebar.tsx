'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Flame,
  Music,
  Gamepad2,
  Trophy,
  Lightbulb,
  Film,
  Clock,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const categories = [
    { icon: Home, label: 'Home', href: '/', color: 'from-cyan-400 to-blue-500' },
    { icon: Flame, label: 'Trending', href: '/trending', color: 'from-orange-400 to-red-500' },
    { icon: Music, label: 'Music', href: '/music', color: 'from-pink-400 to-purple-500' },
    { icon: Gamepad2, label: 'Gaming', href: '/gaming', color: 'from-purple-400 to-indigo-500' },
    { icon: Trophy, label: 'Sports', href: '/sports', color: 'from-green-400 to-emerald-500' },
    { icon: Lightbulb, label: 'Learning', href: '/learning', color: 'from-yellow-400 to-amber-500' },
    { icon: Film, label: 'Movies', href: '/entertainment', color: 'from-violet-400 to-purple-500' },
    { icon: Clock, label: 'Watch Later', href: '/watch-later', color: 'from-cyan-400 to-teal-500' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden fade-in-up"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-16 sm:top-20 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] glass-strong z-40 transition-all duration-300 ease-in-out overflow-y-auto scrollbar-hide
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-72 lg:w-20
        `}
      >
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="font-bold text-lg gradient-text-vibrant">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex flex-col gap-2 p-3">
          {categories.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => onClose?.()}
                className={`
                  group relative flex items-center gap-4 p-3 rounded-2xl transition-all
                  ${
                    active
                      ? 'glass neon-glow-blue'
                      : 'hover:bg-white/5'
                  }
                  lg:justify-center
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Gradient background on active */}
                {active && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-10 rounded-2xl`} />
                )}

                {/* Icon with gradient on hover */}
                <div className="relative z-10">
                  <Icon className={`w-5 h-5 transition-all ${active ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`} />
                </div>

                {/* Label */}
                <span className={`relative z-10 lg:hidden font-medium transition-all ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {item.label}
                </span>

                {/* Desktop tooltip */}
                <div className="hidden lg:group-hover:block absolute left-full ml-4 px-4 py-2 glass rounded-xl whitespace-nowrap pointer-events-none z-50 fade-in-up">
                  <span className="text-sm font-medium">{item.label}</span>
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gradient-to-r ${item.color} rotate-45`} />
                </div>

                {/* Active indicator glow */}
                {active && (
                  <div className={`hidden lg:block absolute right-0 w-1 h-8 bg-gradient-to-b ${item.color} rounded-l-full neon-glow-blue`} />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 glass-strong border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">
            © 2024 StreamHub • Next-Gen Platform
          </p>
        </div>
      </aside>
    </>
  );
}
