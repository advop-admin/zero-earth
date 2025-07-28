import LogoLattice from '../components/LogoLattice';

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