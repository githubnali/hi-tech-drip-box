import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Pill } from '@/components/common/Pill';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow: string;
  eyebrowIcon: LucideIcon;
  title: ReactNode;
  description: ReactNode;
  image: string;
  imageAlt: string;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
}

export function PageHero({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  image,
  imageAlt,
  children,
  className,
  imageClassName,
}: PageHeroProps) {
  return (
    <section className={cn('relative isolate overflow-hidden bg-leaf-50', className)}>
      <img
        src={image}
        alt={imageAlt}
        className={cn(
          'absolute inset-0 -z-20 h-full w-full object-cover object-[64%_center]',
          imageClassName,
        )}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div
        aria-hidden="true"
        className="hero-image-wash absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-leaf-50/55 via-transparent to-leaf-50/15 lg:hidden"
      />
      <Container className="relative">
        <div className="max-w-[640px] py-12 sm:py-16 lg:min-h-[440px] lg:py-16">
          <Pill>
            <EyebrowIcon className="h-4 w-4 text-forest-700" aria-hidden="true" />
            {eyebrow}
          </Pill>
          <h1 className="mt-5 font-display text-[clamp(2.05rem,4.5vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink">
            {title}
          </h1>
          <p className="mt-4 max-w-[34rem] text-[1rem] leading-relaxed text-muted sm:text-[1.05rem]">
            {description}
          </p>
          {children ? <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
