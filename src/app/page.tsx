import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { ExpectativaMomentumSection } from '@/components/sections/expectativa-momentum-section'
import { WaitlistSection } from '@/components/sections/waitlist-section'

export default function Home() {
  return (
    <div className="min-h-screen">
      <section id="hero">
        <HeroSection />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="momentum">
        <ExpectativaMomentumSection />
      </section>
      <section id="waitlist">
        <WaitlistSection />
      </section>
    </div>
  );
}
