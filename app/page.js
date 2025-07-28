import dynamic from 'next/dynamic';

// Dynamically import LogoLattice with error handling
const LogoLattice = dynamic(() => import('../components/LogoLattice'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
        <p>Loading interactive lattice...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="w-full h-screen relative">
        <LogoLattice
          logoSize={80}
          gap={30}
          baseOpacity={0.2}
          hoverOpacity={1}
          transitionDuration={0.4}
        />
      </div>
    </main>
  );
} 