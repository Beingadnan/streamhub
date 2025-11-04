export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-6">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin" />
        
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-xl" />
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full pulse-glow" />
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-base sm:text-lg font-bold gradient-text-vibrant mb-2">Loading Content</p>
        <p className="text-xs sm:text-sm text-gray-500">Preparing your experience...</p>
      </div>
    </div>
  );
}
