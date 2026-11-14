import {
  ChevronRight,
  ClipboardList,
  Leaf,
  Sprout,
  Timer,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { processSteps } from '@/data/site';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  clipboard: ClipboardList,
  sprout: Sprout,
  wrench: Wrench,
  timer: Timer,
  leaf: Leaf,
};

interface ProcessStepsProps {
  variant?: 'compact' | 'detailed';
  className?: string;
}

export function ProcessSteps({ variant = 'compact', className }: ProcessStepsProps) {
  return (
    <ol
      className={cn(
        'grid gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4',
        className,
      )}
    >
      {processSteps.map((step, index) => {
        const Icon = iconMap[step.icon];
        const isLast = index === processSteps.length - 1;
        return (
          <li key={step.number} className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-leaf-100 transition-colors duration-200">
                  <Icon
                    className={cn(
                      'text-forest-700',
                      variant === 'detailed' ? 'h-8 w-8' : 'h-7 w-7',
                    )}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <span
                  className="absolute -bottom-1 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-forest-600 text-[0.72rem] font-bold text-white ring-2 ring-white"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[0.92rem] font-bold leading-tight tracking-[-0.01em] text-ink sm:text-[0.96rem]">
                {step.title}
              </h3>
              {variant === 'detailed' ? (
                <p className="mt-1.5 max-w-[13rem] text-[0.82rem] leading-relaxed text-muted">
                  {step.shortDescription}
                </p>
              ) : null}
            </div>

            {!isLast ? (
              <ChevronRight
                className="absolute -right-2 top-7 hidden h-5 w-5 text-forest-600/70 lg:block"
                strokeWidth={2}
                aria-hidden="true"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
