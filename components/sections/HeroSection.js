'use client';
import dynamic from 'next/dynamic';

// Dynamically import LogoLattice without loading state for better performance
const LogoLattice = dynamic(() => import('../interactive/LogoLattice'), {
  ssr: false,
});

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-black relative z-hero pt-16" style={{ overflow: 'visible' }}>
      <div className="w-full min-h-screen md:h-screen relative" style={{ overflow: 'visible' }}>
        <LogoLattice
          logoSize={32}
          baseOpacity={0.1}
          hoverOpacity={0.95}
          transitionDuration={0.3}
        />
        
        {/* Caption overlay with improved mobile responsiveness */}
        <div className="absolute inset-0 flex items-center md:items-center pointer-events-none z-20 px-4 md:px-0">
          <div className="w-full md:ml-20 lg:ml-32 mt-20 md:mt-0">
            <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight leading-tight animate-fade-in break-words md:whitespace-nowrap">
              | Let every carbon tell a good story
            </h1>
            <div className="mt-4 md:mt-8 animate-slide-in-bottom">
              <p className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-2xl leading-relaxed">
                ZeroEarth creates verifiable climate solutions that reduce emissions at scale — across ecosystems, enterprises, and economies.
              </p>
            </div>
            
            {/* Mobile-optimized CTA button */}
            <div className="mt-6 md:mt-8 animate-slide-in-bottom">
              <button
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-600/25 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced gradient overlay for better mobile text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 md:from-black/60 md:via-black/30 md:to-transparent pointer-events-none z-20"></div>
      </div>
    </section>
  );
};

export default HeroSection;