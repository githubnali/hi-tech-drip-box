import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  as?: 'h1' | 'h2' | 'h3';
  children?: ReactNode;
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
  as: Heading = 'h2',
  children,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn(centered && 'mx-auto text-center', centered ? 'max-w-2xl' : '', className)}>
      {kicker ? (
        <p
          className={cn(
            'flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-forest-700',
            centered && 'justify-center',
          )}
        >
          <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-forest-600/70" />
          {kicker}
        </p>
      ) : null}
      <Heading
        className={cn(
          'mt-3 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink',
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            'mt-3 max-w-xl text-[0.98rem] leading-relaxed text-muted',
            centered && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
