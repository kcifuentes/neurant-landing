import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { ExpectativaMomentumSection } from '@/components/sections/expectativa-momentum-section'
import { WaitlistSection } from '@/components/sections/waitlist-section'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ExpectativaMomentumSection />
      <div id="waitlist-section">
        <WaitlistSection />
      </div>
    </div>
  );
}
