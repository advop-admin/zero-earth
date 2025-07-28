import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ProblemSection from '../components/sections/ProblemSection'
import SolutionSection from '../components/sections/SolutionSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import TeamSection from '../components/sections/TeamSection'
import ContactSection from '../components/sections/ContactSection'

export default function Home() {
  return (
    <>
      {/* Hero Section - Full viewport with interactive background */}
      <HeroSection />
      
      {/* Main Content Sections */}
      <div className="relative z-10">
        <AboutSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <TeamSection />
        <ContactSection />
      </div>
    </>
  );
} 