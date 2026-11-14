import type { ReactNode } from 'react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Pill } from '@/components/common/Pill';
import { KitIllustration } from '@/components/systems/KitIllustrations';
import { kitComponents } from '@/data/systems';
import { cn } from '@/lib/utils';

interface KitComponentsProps {
  kicker?: string;
  title?: ReactNode;
  description?: string;
  showBadge?: boolean;
  className?: string;
}

export function KitComponents({
  kicker = 'Complete Kit Includes',
  title = 'Everything You Need for a Fully Automated Garden',
  description = 'Every Hi-Tech Drip Box system arrives complete — from planters and growing medium to the automation that keeps your garden watered.',
  showBadge = true,
  className,
}: KitComponentsProps) {
  return (
    <section className={cn('py-14 lg:py-20', className)}>
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading kicker={kicker} title={title} description={description} />
          {showBadge ? (
            <Pill className="w-fit shrink-0 px-4 py-2 text-[0.8rem]">11 Essential Components in Every Kit</Pill>
          ) : null}
        </div>

        <ul className="hide-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-6 xl:grid-cols-11 xl:gap-0 xl:divide-x xl:divide-line">
          {kitComponents.map((item) => (
            <li
              key={item.id}
              className="w-[116px] shrink-0 snap-start rounded-2xl border border-line bg-white px-2 py-4 text-center transition-colors hover:border-leaf-300 xl:w-auto xl:rounded-none xl:border-0 xl:px-2 xl:py-1 xl:hover:border-transparent"
            >
              <KitIllustration name={item.illustration} className="mx-auto block h-12 w-12" />
              <p className="mt-2.5 text-[0.72rem] font-semibold leading-tight text-forest-900">{item.name}</p>
              <p className="mt-0.5 text-[0.64rem] leading-tight text-muted">{item.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-center text-[0.7rem] font-medium text-muted md:hidden">
          Swipe to see all 11 components →
        </p>
      </Container>
    </section>
  );
}
