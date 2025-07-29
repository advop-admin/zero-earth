'use client';
import dynamic from 'next/dynamic';

// Dynamically import LogoLattice without loading state for better performance
const LogoLattice = dynamic(() => import('../interactive/LogoLattice'), {
  ssr: false,
});

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-black relative z-hero pt-16">
      <div className="w-full min-h-screen md:h-screen relative">
        <LogoLattice
          logoSize={50}
          baseOpacity={0.2}
          hoverOpacity={0.8}
          transitionDuration={0.4}
        />
        
        {/* Caption overlay with strong visual hierarchy */}
        <div className="absolute inset-0 flex items-center md:items-center pointer-events-none z-20">
          <div className="ml-6 md:ml-20 lg:ml-32 mt-20 md:mt-0">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight leading-tight animate-fade-in whitespace-nowrap">
              | Let every carbon tell a good story
            </h1>
            <div className="mt-6 md:mt-8 animate-slide-in-bottom">
              <p className="text-white/80 text-lg md:text-xl lg:text-2xl font-medium max-w-2xl">
              ZeroEarth creates verifiable climate solutions that reduce emissions at scale — across ecosystems, enterprises, and economies.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none z-20"></div>
      </div>
    </section>
  );
};

export default HeroSection;