import { ArrowRight, Settings2, Sprout } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { pageMeta } from '@/lib/pageMeta';
import { PageHero } from '@/components/common/PageHero';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { SystemOverview } from '@/components/how-it-works/SystemOverview';
import { CTASection } from '@/components/common/CTASection';
import { CallButton, WhatsAppButton } from '@/components/common/Actions';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { Reveal } from '@/components/common/Reveal';
import { whatsappMessages, createWhatsAppUrl } from '@/lib/whatsapp';

const videos = [
  {
    id: 'setup',
    title: 'Complete Terrace Setup',
    description: 'A walkthrough of a finished planter layout on a residential terrace.',
    image: '/images/gardens/installers-okra-card.webp',
    alt: 'Gardeners working among blue fibre planters during a terrace garden installation',
    message: whatsappMessages.videoSetup,
  },
  {
    id: 'irrigation',
    title: 'Drip Irrigation in Action',
    description: 'See how water reaches the planters through the drip lines.',
    image: '/images/gardens/brinjal-planter-card.webp',
    alt: 'Close view of a brinjal plant growing in a fibre planter with drip irrigation',
    message: whatsappMessages.videoIrrigation,
  },
  {
    id: 'results',
    title: 'Plant Growth & Results',
    description: 'Healthy plants growing in an installed Hi-Tech Drip Box garden.',
    image: '/images/gardens/brinjal-row-card.webp',
    alt: 'Brinjal plants growing strongly in a row of blue fibre planters',
    message: whatsappMessages.videoResults,
  },
];

export default function HowItWorks() {
  const meta = pageMeta.howItWorks;

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} />

      <PageHero
        eyebrow="How It Works"
        eyebrowIcon={Settings2}
        title="From Your Terrace to a Thriving Organic Garden"
        description="A simple, end-to-end process to set up your automated terrace garden with Hi-Tech Drip Box."
        image="/images/hero/how-it-works-hero.webp"
        imageAlt="Aerial view of installers setting up rows of blue fibre planters and drip irrigation on a terrace"
        imageClassName="object-[58%_center]"
      >
        <Button
          to="/contact#enquiry"
          variant="primary"
          size="lg"
          iconRight={<ArrowRight className="h-4 w-4" />}
        >
          Get Installation Details
        </Button>
        <Button
          to="/our-systems"
          variant="outline"
          size="lg"
          iconRight={<ArrowRight className="h-4 w-4" />}
        >
          Explore Our Systems
        </Button>
      </PageHero>

      <section id="installation-process" className="scroll-mt-24 py-14 lg:py-20">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-10">
            <SectionHeading
              titleClassName="text-[clamp(1.9rem,3.4vw,2.6rem)]"
              title={
                <>
                  The Complete Process
                  <br className="hidden sm:block" /> in 5 Simple Steps
                </>
              }
            />
            <p className="max-w-md text-[0.95rem] leading-relaxed text-muted lg:justify-self-end lg:pb-1">
              We handle everything — from understanding your space to a fully installed, self-watering
              garden.
            </p>
          </div>

          <div className="mt-10">
            <Reveal>
              <ProcessSteps variant="detailed" />
            </Reveal>
          </div>
        </Container>
      </section>

      <SystemOverview />

      <section className="py-14 lg:py-20">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              kicker="See It in Action"
              title="Real Setup & Installation"
              description="A look at how the system is installed and how the automatic irrigation works."
            />
            <p className="max-w-sm text-sm leading-relaxed text-muted lg:pb-1 lg:text-right">
              These video guides are shared on request by Alexander.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {videos.map((video) => (
              <a
                key={video.id}
                href={createWhatsAppUrl(video.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-forest-900 shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
                aria-label={`Request the ${video.title} video on WhatsApp`}
              >
                <img
                  src={video.image}
                  alt={video.alt}
                  width={720}
                  height={540}
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-forest-950/10"
                />
                <span className="absolute right-3 top-3 rounded-full bg-forest-950/70 px-2.5 py-1 text-[0.62rem] font-semibold text-white backdrop-blur">
                  Available on request
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-forest-800 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <WhatsAppIcon className="h-6 w-6" />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-display text-[0.95rem] font-bold text-white">{video.title}</span>
                  <span className="mt-0.5 block text-[0.7rem] text-white/75">{video.description}</span>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to Start Your Terrace Garden?"
        description="Let's plan the right setup for your space and get it installed at your home."
        backgroundImage="/images/cta/final-cta.webp"
        icon={<Sprout className="h-8 w-8" strokeWidth={1.4} />}
      >
        <CallButton variant="white" size="lg" label="Call Alexander" />
        <WhatsAppButton
          message={whatsappMessages.installation}
          variant="whatsapp"
          size="lg"
          label="WhatsApp Enquiry"
        />
      </CTASection>
    </>
  );
}
