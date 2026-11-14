import {
  ArrowRight,
  Carrot,
  Citrus,
  Flower,
  Flower2,
  Layers,
  Leaf,
  Package,
  Sprout,
  TreeDeciduous,
  type LucideIcon,
} from 'lucide-react';
import { Pill } from '@/components/common/Pill';
import { Button } from '@/components/common/Button';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { cn } from '@/lib/utils';
import { createWhatsAppUrl } from '@/lib/whatsapp';
import type { SystemModel } from '@/types';

const suitabilityIcons: Record<string, LucideIcon> = {
  'Leafy Greens': Leaf,
  'Seasonal Vegetables': Carrot,
  Creepers: Sprout,
  Herbs: Sprout,
  'Fruit Plants': Citrus,
  'Flowering Plants': Flower2,
  'Small Trees': TreeDeciduous,
  Ornamentals: Flower,
};

interface SystemCardProps {
  system: SystemModel;
  variant?: 'compact' | 'full';
  className?: string;
}

export function SystemCard({ system, variant = 'full', className }: SystemCardProps) {
  if (variant === 'compact') {
    return (
      <article
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-lift sm:flex-row',
          className,
        )}
      >
        <div className="relative w-full shrink-0 overflow-hidden sm:w-[43%]">
          <img
            src={system.image}
            alt={system.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-full sm:min-h-[300px]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <Pill className="w-fit px-3 py-1 text-[0.72rem]">
            <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
            Model {system.number}
          </Pill>
          <h3 className="mt-3 font-display text-[1.4rem] font-extrabold leading-tight tracking-[-0.02em] text-ink">
            {system.name}
          </h3>
          <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{system.description}</p>
          <p className="mt-4 font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.02em] text-forest-700">
            {system.price}
            <span className="ml-1.5 align-middle font-sans text-[0.85rem] font-semibold text-muted">
              {system.priceNote}
            </span>
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4">
            <div className="flex items-start gap-2">
              <Package className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" aria-hidden="true" />
              <div>
                <p className="text-[0.66rem] font-medium uppercase tracking-wide text-muted">Pot Size</p>
                <p className="text-[0.76rem] font-semibold leading-snug text-forest-900">{system.potSize}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Layers className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" aria-hidden="true" />
              <div>
                <p className="text-[0.66rem] font-medium uppercase tracking-wide text-muted">Kit</p>
                <p className="text-[0.76rem] font-semibold leading-snug text-forest-900">{system.kit}</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Button
              to={`/our-systems#${system.id}`}
              variant="outline"
              size="sm"
              iconRight={<ArrowRight className="h-4 w-4" />}
              aria-label={`View details for Model ${system.number} — ${system.name}`}
            >
              View Details
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      id={system.id}
      className={cn(
        'group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card',
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <img
          src={system.image}
          alt={system.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] sm:h-[280px]"
        />
        <Pill tone="dark" className="absolute left-5 top-5 px-3.5 py-1.5 text-[0.78rem]">
          <Leaf className="h-4 w-4 text-leaf-300" aria-hidden="true" />
          Model {system.number}
        </Pill>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h2 className="font-display text-[1.65rem] font-extrabold leading-tight tracking-[-0.025em] text-ink">
          {system.name}
        </h2>
        <p className="mt-2 max-w-[28rem] text-[0.94rem] leading-relaxed text-muted">{system.description}</p>

        <p className="mt-5 w-fit rounded-xl bg-leaf-100 px-4 py-2 font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.02em] text-forest-800">
          {system.price}
          <span className="ml-1.5 align-middle font-sans text-[0.82rem] font-semibold text-muted">
            {system.priceNote}
          </span>
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 border-y border-line py-4">
          <div className="flex items-start gap-2.5">
            <Package className="mt-0.5 h-[18px] w-[18px] shrink-0 text-forest-600" aria-hidden="true" />
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-wide text-muted">Pot Size</p>
              <p className="text-[0.82rem] font-semibold leading-snug text-forest-900">{system.potSize}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Layers className="mt-0.5 h-[18px] w-[18px] shrink-0 text-forest-600" aria-hidden="true" />
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-wide text-muted">Kit Includes</p>
              <p className="text-[0.82rem] font-semibold leading-snug text-forest-900">{system.kit}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-[0.8rem] font-bold text-forest-900">Best For</h3>
          <ul className="mt-2.5 grid grid-cols-4 gap-2">
            {system.suitable.map((label) => {
              const Icon = suitabilityIcons[label] ?? Leaf;
              return (
                <li key={label} className="text-center">
                  <span className="flex h-12 w-full items-center justify-center rounded-xl bg-leaf-50 text-forest-700 ring-1 ring-inset ring-line">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="mt-1.5 block text-[0.66rem] font-medium leading-tight text-muted sm:text-[0.7rem]">
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5 pt-1">
          <Button
            href={createWhatsAppUrl(system.whatsappMessage)}
            external
            variant="whatsapp"
            size="md"
            icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
            aria-label={`Enquire about Model ${system.number} — ${system.name} on WhatsApp`}
          >
            Enquire for Model {system.number}
          </Button>
          <Button
            to="/how-it-works#installation-process"
            variant="outline"
            size="md"
            iconRight={<ArrowRight className="h-4 w-4" />}
          >
            View Installation
          </Button>
        </div>
      </div>
    </article>
  );
}
