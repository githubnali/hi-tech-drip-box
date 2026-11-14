import { Home, Mail } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { pageMeta } from '@/lib/pageMeta';
import { PageHero } from '@/components/common/PageHero';
import { Container } from '@/components/common/Container';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { QuickEnquiryCard } from '@/components/contact/QuickEnquiryCard';
import { ContactDetails } from '@/components/contact/ContactDetails';
import { FAQAccordion } from '@/components/contact/FAQAccordion';
import { CTASection } from '@/components/common/CTASection';
import { CallButton, WhatsAppButton } from '@/components/common/Actions';
import { faqs } from '@/data/site';
import { whatsappMessages, createWhatsAppUrl } from '@/lib/whatsapp';

export default function Contact() {
  const meta = pageMeta.contact;

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} faq={faqs} />

      <PageHero
        eyebrow="Contact Us"
        eyebrowIcon={Mail}
        title={
          <>
            Let&apos;s Build Your
            <span className="block text-forest-700">Terrace Garden</span>
          </>
        }
        description="Get guidance, a personalised plan and professional installation for your home terrace garden with Hi-Tech Drip Box."
        image="/images/hero/contact-hero.webp"
        imageAlt="A person inspecting healthy brinjal plants growing with drip irrigation in blue terrace planters"
        imageClassName="object-[64%_center]"
      >
        <WhatsAppButton size="lg" label="Enquire on WhatsApp" />
        <CallButton variant="outline" size="lg" label="Call 98840 35450" />
      </PageHero>

      <section id="enquiry" className="scroll-mt-24 py-12 lg:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start lg:gap-8">
            <div className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7 lg:p-8">
              <h2 className="flex items-center gap-3 font-display text-[1.35rem] font-extrabold tracking-[-0.02em] text-ink">
                <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-forest-600/70" />
                Send Us an Enquiry
              </h2>
              <p className="mt-2 max-w-md text-[0.9rem] leading-relaxed text-muted">
                Tell us about your space and we&apos;ll get back with the best plan for your home.
              </p>
              <EnquiryForm />
            </div>

            <div className="space-y-5">
              <QuickEnquiryCard />
              <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
                <ContactDetails />
              </div>
              <img
                src="/images/gardens/leafy-greens-card.webp"
                alt="Leafy greens growing in blue fibre planters on a home terrace"
                width={720}
                height={540}
                loading="lazy"
                decoding="async"
                className="hidden aspect-[4/3] w-full rounded-3xl object-cover lg:block"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line/70 bg-leaf-50 py-14 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.3fr] lg:gap-12">
            <div>
              <h2 className="font-display text-[clamp(1.7rem,3vw,2.35rem)] font-extrabold leading-tight tracking-[-0.025em] text-ink">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 max-w-xs text-[0.9rem] leading-relaxed text-muted">
                Have questions? Here are some quick answers to help you get started.
              </p>
              <img
                src="/images/gardens/hibiscus-planters-card.webp"
                alt="Yellow and coral hibiscus flowers growing in blue fibre planters on a terrace"
                width={960}
                height={1200}
                loading="lazy"
                decoding="async"
                className="mt-6 hidden aspect-[4/3] w-full max-w-[260px] rounded-2xl object-cover lg:block"
              />
            </div>

            <div>
              <FAQAccordion items={faqs} defaultOpenId="space" />
              <p className="mt-5 text-[0.8rem] text-muted">
                Still have a question?{' '}
                <a
                  href={createWhatsAppUrl(whatsappMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-forest-700 underline decoration-leaf-400 underline-offset-4 hover:text-forest-900"
                >
                  Message Alexander on WhatsApp
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title={
          <>
            Ready to Start Your
            <span className="block text-leaf-300">Home Garden Journey?</span>
          </>
        }
        description="Talk to Alexander about your terrace and get guidance on the right system for your home."
        backgroundImage="/images/cta/final-cta.webp"
        icon={<Home className="h-8 w-8" strokeWidth={1.4} />}
      >
        <WhatsAppButton
          message={whatsappMessages.general}
          variant="white"
          size="lg"
          label="Enquire on WhatsApp"
        />
        <CallButton variant="whiteOutline" size="lg" label="Call Alexander" />
      </CTASection>
    </>
  );
}
