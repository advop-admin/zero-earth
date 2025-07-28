import dynamic from 'next/dynamic';

// Dynamically import LogoLattice with error handling
const LogoLattice = dynamic(() => import('../components/LogoLattice'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
        <p>Loading covalent lattice...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="w-full h-screen relative">
        <LogoLattice
          logoSize={35}
          gap={80}
          baseOpacity={0.25}
          hoverOpacity={1}
          transitionDuration={0.4}
          bondOpacity={0.4}
        />
      </div>
    </main>
  );
} 