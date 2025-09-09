import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
