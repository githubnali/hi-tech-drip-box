import { ArrowUpRight, Leaf } from 'lucide-react';
import type { GardenItem } from '@/types';
import { Pill } from '@/components/common/Pill';

interface GardenCardProps {
  garden: GardenItem;
  onOpen: () => void;
}

export function GardenCard({ garden, onOpen }: GardenCardProps) {
  return (
    <article className="group">
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full overflow-hidden rounded-2xl bg-leaf-100 text-left shadow-card ring-1 ring-line transition-shadow duration-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
        aria-label={`Open image: ${garden.title}`}
      >
        <img
          src={garden.image.card}
          alt={garden.image.alt}
          width={720}
          height={540}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest-950/55 to-transparent" />
        <Pill tone="white" className="absolute bottom-3 left-3 px-3 py-1 text-[0.72rem] text-forest-800">
          <Leaf className="h-3.5 w-3.5 text-forest-600" aria-hidden="true" />
          {garden.badge}
        </Pill>
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-forest-800 shadow-sm transition-transform duration-300 group-hover:scale-110"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </button>
      <h3 className="mt-3 px-1 font-display text-[0.95rem] font-bold leading-snug tracking-[-0.01em] text-ink">
        {garden.title}
      </h3>
    </article>
  );
}
