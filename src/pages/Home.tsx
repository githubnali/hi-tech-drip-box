import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { pageMeta } from '@/lib/pageMeta';
import { HomeHero } from '@/components/home/HomeHero';
import { BenefitsBand } from '@/components/home/BenefitsBand';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SystemCard } from '@/components/systems/SystemCard';
import { KitComponents } from '@/components/systems/KitComponents';
import { CTASection } from '@/components/common/CTASection';
import { WhatsAppButton, CallButton } from '@/components/common/Actions';
import { Reveal } from '@/components/common/Reveal';
import { systems } from '@/data/systems';
import { featuredGardens } from '@/data/gardens';
import { whatsappMessages } from '@/lib/whatsapp';

export default function Home() {
  const meta = pageMeta.home;
  const galleryRef = useRef<HTMLUListElement>(null);

  const scrollGallery = (direction: 1 | -1) => {
    galleryRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} />

      <HomeHero />

      <section className="border-y border-line/60 bg-leaf-50 py-14 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              align="center"
              kicker="Choose Your Garden System"
              title="Two Ready-to-Install Models"
              description="Pick the right system for your terrace and start growing fresh produce at home."
            />
          </Reveal>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:mt-11">
            {systems.map((system, index) => (
              <Reveal key={system.id} delay={index * 0.08}>
                <SystemCard system={system} variant="compact" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <BenefitsBand />

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading
                kicker="Our Process"
                title="How It Works?"
                description="A simple, hassle-free process to set up your terrace garden."
              />
              <Link
                to="/how-it-works"
                className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-forest-700 underline decoration-leaf-400 decoration-2 underline-offset-4 transition-colors hover:text-forest-900"
              >
                See the full process
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <section className="border-y border-line/70 bg-leaf-50 py-14 lg:py-16">
        <Container>
          <div className="grid gap-7 lg:grid-cols-[280px_1fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading
                kicker="Real Installations"
                title="Our Gardens"
                description="See how homeowners are growing fresh vegetables, fruits and flowers with Hi-Tech Drip Box."
              />
              <Link
                to="/our-gardens"
                className="mt-5 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-forest-700 underline decoration-leaf-400 decoration-2 underline-offset-4 transition-colors hover:text-forest-900"
              >
                Explore Our Gardens
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="relative min-w-0">
              <ul
                ref={galleryRef}
                className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:pr-12"
              >
                {featuredGardens.map((garden) => (
                  <li key={garden.id} className="w-[74%] shrink-0 snap-start sm:w-[47%] lg:w-[calc(25%-0.6rem)]">
                    <Link
                      to="/our-gardens#gallery"
                      className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
                    >
                      <img
                        src={garden.image.card}
                        alt={garden.image.alt}
                        width={720}
                        height={540}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="block px-3 py-2.5 text-left text-[0.78rem] font-semibold leading-tight text-forest-900">
                        {garden.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-end gap-2 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col">
                <button
                  type="button"
                  onClick={() => scrollGallery(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-forest-800 shadow-sm transition-colors hover:bg-leaf-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 lg:hidden"
                  aria-label="Scroll to previous gardens"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollGallery(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-forest-800 shadow-sm transition-colors hover:bg-leaf-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                  aria-label="Scroll to more gardens"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <KitComponents
        kicker="Complete Kit Includes"
        title="Everything You Need for a Fully Automated Garden"
        description="Every system arrives complete — planters, growing medium, plants and the irrigation that keeps them watered."
        showBadge={false}
      />

      <CTASection
        title={
          <>
            Ready to Build Your
            <br className="hidden sm:block" /> Home Garden?
          </>
        }
        description="Get guidance on choosing the right automated gardening system for your terrace."
        backgroundImage="/images/cta/final-cta.webp"
      >
        <CallButton variant="white" size="lg" label="Call Alexander" />
        <WhatsAppButton
          message={whatsappMessages.general}
          variant="whatsapp"
          size="lg"
          label="WhatsApp Enquiry"
        />
      </CTASection>
    </>
  );
}
