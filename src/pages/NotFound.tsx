import { ArrowLeft, Leaf } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { WhatsAppButton } from '@/components/common/Actions';
import { whatsappMessages } from '@/lib/whatsapp';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | Hi-Tech Drip Box"
        description="The page you were looking for could not be found. Explore Hi-Tech Drip Box automated terrace gardening systems instead."
        path="/404"
        noindex
      />
      <section className="bg-leaf-50 py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-forest-700 shadow-card">
              <Leaf className="h-8 w-8" aria-hidden="true" />
            </span>
            <p className="mt-6 font-display text-[0.8rem] font-bold uppercase tracking-[0.2em] text-forest-600">
              404
            </p>
            <h1 className="mt-2 font-display text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
              This page has not sprouted yet.
            </h1>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              The page you were looking for could not be found. Return to the homepage or explore our
              automated terrace gardens.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button to="/" variant="primary" size="lg" icon={<ArrowLeft className="h-4 w-4" />}>
                Back to Home
              </Button>
              <Button to="/our-gardens" variant="outline" size="lg">
                Explore Our Gardens
              </Button>
            </div>
            <p className="mt-6 text-[0.8rem] text-muted">
              Need help?{' '}
              <WhatsAppButton
                message={whatsappMessages.general}
                variant="white"
                size="sm"
                label="Message Alexander"
                className="min-h-0 px-0 py-0 text-forest-700 shadow-none hover:bg-transparent hover:underline"
                icon={false}
              />
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
