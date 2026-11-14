import { ArrowRight, Droplets, Leaf, Timer } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Pill } from '@/components/common/Pill';
import { Button } from '@/components/common/Button';
import { WhatsAppButton } from '@/components/common/Actions';
import { whatsappMessages } from '@/lib/whatsapp';

const indicators = [
  { icon: Leaf, label: 'Organic Growing' },
  { icon: Droplets, label: 'Water-Efficient Irrigation' },
  { icon: Timer, label: 'Automated Watering' },
];

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0 -z-20">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/hero/terrace-garden-hero.webp" />
          <img
            src="/images/hero/terrace-garden-hero-mobile.webp"
            alt="Automated rooftop terrace garden with rows of blue fibre planters, plants and drip irrigation along a checkered tiled walkway"
            className="h-full w-full object-cover object-[62%_center]"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
        <div
          aria-hidden="true"
          className="home-hero-image-wash absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-leaf-50/75 via-transparent to-white/25 lg:hidden"
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute -left-10 top-6 -z-10 hidden opacity-40 lg:block">
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" aria-hidden="true">
          <path d="M132 20C112 76 72 112 16 118 26 60 66 22 132 20Z" fill="#D9EACD" />
          <path d="M8 142C30 104 60 74 100 52" stroke="#B9D6A7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <Container className="relative">
        <div className="max-w-[660px] py-12 sm:py-16 lg:py-20">
          <Pill>
            <Leaf className="h-4 w-4 text-forest-700" aria-hidden="true" />
            Automatic Terrace Gardening for Homes
          </Pill>

          <h1 className="mt-5 font-display text-[clamp(2.15rem,4.8vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink">
            Turn Your Terrace Into a Beautiful, Self-Watering Garden.
          </h1>

          <p className="mt-5 max-w-[35rem] text-[1rem] leading-relaxed text-muted sm:text-[1.06rem]">
            Transform 300 sq. ft. into a thriving organic garden with Hi-Tech Drip Box. A complete,
            ready-to-install system with plants, soil, drip irrigation and automation.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <WhatsAppButton message={whatsappMessages.general} size="lg" label="Enquire on WhatsApp" />
            <Button
              to="/our-systems"
              variant="outline"
              size="lg"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Explore Our Systems
            </Button>
          </div>

          <ul className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-line/90 border-t border-line/80 pt-5">
            {indicators.map(({ icon: Icon, label }) => (
              <li key={label} className="px-2 text-center first:pl-0 last:pr-0 sm:px-4">
                <Icon className="mx-auto h-6 w-6 text-forest-600" strokeWidth={1.6} aria-hidden="true" />
                <span className="mt-2 block text-[0.72rem] font-semibold leading-tight text-forest-900 sm:text-[0.82rem]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
