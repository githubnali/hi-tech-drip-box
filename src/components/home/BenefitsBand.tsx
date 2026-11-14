import { ArrowLeftRight, Droplets, Leaf, Power, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { benefits } from '@/data/site';

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  leaf: Leaf,
  power: Power,
  move: ArrowLeftRight,
  shield: ShieldCheck,
};

export function BenefitsBand() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-800">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-900 via-forest-800 to-forest-600"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(ellipse_at_right,rgba(120,168,90,0.35),transparent_60%)]"
      />
      <Container className="relative py-9 lg:py-11">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-[1.15fr_repeat(5,1fr)] lg:gap-y-0 lg:divide-x lg:divide-white/15">
          <h2 className="col-span-2 font-display text-[clamp(1.35rem,2.2vw,1.7rem)] font-extrabold leading-tight tracking-[-0.02em] text-white sm:col-span-3 lg:col-span-1 lg:pr-6">
            Why Choose
            <br className="hidden lg:block" /> Hi-Tech Drip Box?
          </h2>

          {benefits.map((benefit) => {
            const Icon = iconMap[benefit.icon];
            return (
              <div
                key={benefit.title}
                className="group flex flex-col items-center px-2 text-center lg:px-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 group-hover:bg-white/15">
                  <Icon
                    className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <p className="mt-2.5 font-display text-[0.86rem] font-bold leading-tight text-white sm:text-[0.9rem]">
                  {benefit.title}
                </p>
                <p className="mt-1 hidden max-w-[11rem] text-[0.72rem] leading-snug text-white/60 sm:block">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
