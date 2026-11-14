import { CheckCircle2, Droplets, Home, Images, Sprout } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { pageMeta } from '@/lib/pageMeta';
import { PageHero } from '@/components/common/PageHero';
import { Container } from '@/components/common/Container';
import { GardenGallery } from '@/components/gardens/GardenGallery';
import { CTASection } from '@/components/common/CTASection';
import { WhatsAppButton } from '@/components/common/Actions';
import { gardens, galleryFacts } from '@/data/gardens';
import { whatsappMessages } from '@/lib/whatsapp';

const factIcons = [Home, Sprout, Droplets, CheckCircle2];

export default function OurGardens() {
  const meta = pageMeta.gardens;

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} />

      <PageHero
        eyebrow="Our Gardens"
        eyebrowIcon={Images}
        title="Real Terrace Gardens, Real Results"
        description="Explore our installed Hi-Tech Drip Box gardens and see how home terraces become beautiful, productive growing spaces."
        image="/images/hero/our-gardens-hero.webp"
        imageAlt="Vibrant bougainvillea and lush green plants growing in blue fibre planters on a finished terrace garden"
        imageClassName="object-[58%_center]"
      />

      <section className="relative z-10 bg-white pb-2 pt-6 lg:pt-8">
        <Container>
          <div className="rounded-2xl border border-leaf-200 bg-leaf-100/70 px-4 py-5 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-forest-700/15">
              {galleryFacts.map((fact, index) => {
                const Icon = factIcons[index] ?? Sprout;
                return (
                  <div
                    key={fact.label}
                    className="flex items-center gap-3 px-1 sm:justify-center sm:px-4"
                  >
                    <Icon className="h-7 w-7 shrink-0 text-forest-700" strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <dt className="sr-only">{fact.label}</dt>
                      <dd>
                        <span className="block font-display text-lg font-extrabold leading-tight tracking-[-0.02em] text-ink">
                          {fact.value}
                        </span>
                        <span className="mt-0.5 block text-[0.68rem] leading-tight text-muted">
                          {fact.label}
                        </span>
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        </Container>
      </section>

      <section id="gallery" className="scroll-mt-24 bg-white py-10 lg:py-14">
        <Container>
          <h2 className="sr-only">Garden gallery</h2>
          <GardenGallery items={gardens} />
          <p className="mt-8 text-center text-[0.72rem] leading-relaxed text-muted">
            All photographs show actual Hi-Tech Drip Box installations. Plant growth varies with season,
            sunlight and care.
          </p>
        </Container>
      </section>

      <CTASection
        title="Want a Garden Like This on Your Terrace?"
        description="Get a personalised plan and installation for your home terrace."
        backgroundImage="/images/cta/final-cta.webp"
        icon={<Sprout className="h-8 w-8" strokeWidth={1.4} />}
      >
        <WhatsAppButton
          message={whatsappMessages.gardenLikeThis}
          variant="white"
          size="lg"
          label="Enquire on WhatsApp"
        />
      </CTASection>
    </>
  );
}
