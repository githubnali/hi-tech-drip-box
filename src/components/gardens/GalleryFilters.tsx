import { gardenFilters } from '@/data/gardens';
import type { GardenCategory } from '@/types';
import { cn } from '@/lib/utils';

interface GalleryFiltersProps {
  active: 'all' | GardenCategory;
  onChange: (value: 'all' | GardenCategory) => void;
  counts?: Record<string, number>;
}

export function GalleryFilters({ active, onChange, counts }: GalleryFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter gardens by category"
      className="flex flex-wrap items-center justify-center gap-2.5"
    >
      {gardenFilters.map((filter) => {
        const isActive = active === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            aria-pressed={isActive}
            className={cn(
              'inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-[0.88rem] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2',
              isActive
                ? 'border-forest-700 bg-forest-700 text-white shadow-sm'
                : 'border-forest-700/25 bg-white text-forest-800 hover:border-forest-600 hover:bg-leaf-50',
            )}
          >
            {filter.label}
            {counts ? (
              <span
                className={cn(
                  'ml-2 rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold',
                  isActive ? 'bg-white/15 text-white' : 'bg-leaf-100 text-forest-700',
                )}
              >
                {counts[filter.id] ?? 0}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
