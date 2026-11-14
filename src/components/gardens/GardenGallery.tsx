import { useMemo, useState } from 'react';
import type { GardenCategory } from '@/types';
import type { GardenItem } from '@/types';
import { GalleryFilters } from '@/components/gardens/GalleryFilters';
import { GardenCard } from '@/components/gardens/GardenCard';
import { ImageLightbox } from '@/components/gardens/ImageLightbox';

interface GardenGalleryProps {
  items: GardenItem[];
}

export function GardenGallery({ items }: GardenGalleryProps) {
  const [active, setActive] = useState<'all' | GardenCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: items.length };
    for (const item of items) {
      for (const category of item.categories) {
        base[category] = (base[category] ?? 0) + 1;
      }
    }
    return base;
  }, [items]);

  const filtered = useMemo(
    () => (active === 'all' ? items : items.filter((item) => item.categories.includes(active))),
    [active, items],
  );

  return (
    <div>
      <GalleryFilters
        active={active}
        counts={counts}
        onChange={(value) => {
          setActive(value);
          setLightboxIndex(null);
        }}
      />

      <p className="sr-only" role="status" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? 'garden' : 'gardens'}.
      </p>

      {filtered.length ? (
        <div className="mt-8 grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((garden, index) => (
            <GardenCard key={garden.id} garden={garden} onOpen={() => setLightboxIndex(index)} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-line bg-white p-8 text-center text-sm text-muted">
          No photographs in this category yet. Please contact Alexander to see examples of this garden type.
        </p>
      )}

      <ImageLightbox
        items={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}
