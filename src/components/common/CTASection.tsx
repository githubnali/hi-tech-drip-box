import type { ReactNode } from 'react';
import { Reveal } from '@/components/common/Reveal';
import { Container } from '@/components/common/Container';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  title: ReactNode;
  description: string;
  children: ReactNode;
  icon?: ReactNode;
  backgroundImage?: string;
  className?: string;
  id?: string;
}

export function CTASection({
  title,
  description,
  children,
  icon,
  backgroundImage = '/images/cta/final-cta.webp',
  className,
  id,
}: CTASectionProps) {
  return (
    <section id={id} className={cn('relative isolate overflow-hidden bg-forest-900', className)}>
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/95 via-forest-900/90 to-forest-800/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full bg-leaf-500/10 blur-3xl"
      />
      <Container className="relative py-12 lg:py-16">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5 sm:items-center">
            {icon ? (
              <span
                aria-hidden="true"
                className="hidden h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border border-white/30 text-white sm:flex"
              >
                {icon}
              </span>
            ) : null}
            <div>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                {title}
              </h2>
              <p className="mt-2 max-w-xl text-[0.98rem] leading-relaxed text-white/75">{description}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:shrink-0 lg:border-l lg:border-white/20 lg:pl-8">
            {children}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
