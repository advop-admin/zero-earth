'use client';
import dynamic from 'next/dynamic';

// Dynamically import LogoLattice with error handling
const LogoLattice = dynamic(() => import('../interactive/LogoLattice'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
        <p>Loading tessellating lattice...</p>
      </div>
    </div>
  ),
});

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-black relative">
      <div className="w-full h-screen relative">
        <LogoLattice
          logoSize={50}
          baseOpacity={0.2}
          hoverOpacity={0.8}
          transitionDuration={0.4}
        />
        
        {/* Caption overlay with strong visual hierarchy */}
        <div className="absolute inset-0 flex items-center pointer-events-none z-10">
          <div className="ml-12 md:ml-20">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              | Let every carbon tell a good story
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;