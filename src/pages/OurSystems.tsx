import { Boxes, Info } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { pageMeta } from '@/lib/pageMeta';
import { PageHero } from '@/components/common/PageHero';
import { Container } from '@/components/common/Container';
import { SystemCard } from '@/components/systems/SystemCard';
import { SystemComparison } from '@/components/systems/SystemComparison';
import { KitComponents } from '@/components/systems/KitComponents';
import { CTASection } from '@/components/common/CTASection';
import { CallButton, WhatsAppButton } from '@/components/common/Actions';
import { Reveal } from '@/components/common/Reveal';
import { systems } from '@/data/systems';
import { whatsappMessages } from '@/lib/whatsapp';

export default function OurSystems() {
  const meta = pageMeta.systems;

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} />

      <PageHero
        eyebrow="Our Systems"
        eyebrowIcon={Boxes}
        title="Choose the Right Garden System for Your Terrace"
        description="Two ready-to-install, automated gardening systems designed for home terraces. Pick the model that suits your plant goals and space."
        image="/images/hero/garden-systems-hero.webp"
        imageAlt="Complete terrace gardening system with rows of blue fibre planters, feeder box and connected irrigation plumbing"
        imageClassName="object-[62%_center]"
      />

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            {systems.map((system, index) => (
              <Reveal key={system.id} delay={index * 0.08} className="h-full">
                <SystemCard system={system} variant="full" />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 rounded-xl bg-leaf-50 px-4 py-3 text-[0.82rem] leading-relaxed text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" aria-hidden="true" />
            Plant suitability for your terrace, sunlight and season is confirmed during consultation with
            Alexander.
          </p>
        </Container>
      </section>

      <SystemComparison />

      <KitComponents className="py-14 lg:py-20" />

      <CTASection
        title="Get a Personalised Recommendation"
        description="Not sure which model is right for your terrace? Talk to Alexander for guidance and installation details."
        backgroundImage="/images/hero/terrace-garden-hero.webp"
      >
        <CallButton variant="white" size="lg" label="Call Alexander" />
        <WhatsAppButton
          message={whatsappMessages.recommendation}
          variant="whatsapp"
          size="lg"
          label="WhatsApp Enquiry"
        />
      </CTASection>
    </>
  );
}
