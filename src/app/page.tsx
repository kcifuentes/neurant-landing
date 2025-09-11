import { NewHeroSection } from '@/components/sections/new-hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { IntegrationsSection } from '@/components/sections/integrations-section'
import { SeparatorSection } from '@/components/sections/separator-section'
import { UseCasesSection } from '@/components/sections/use-cases-section'
import { ExpectativaMomentumSection } from '@/components/sections/expectativa-momentum-section'
import { WaitlistSection } from '@/components/sections/waitlist-section'

export default function Home() {
  return (
    <div className="min-h-screen">
      <section id="hero">
        <NewHeroSection />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="integrations">
        <IntegrationsSection />
      </section>
      <SeparatorSection />
      <section id="use-cases">
        <UseCasesSection />
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
