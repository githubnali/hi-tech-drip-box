import { Link } from 'react-router-dom';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const primary = tone === 'dark' ? 'text-forest-800' : 'text-white';
  const badge = tone === 'dark' ? 'bg-forest-800 text-white' : 'bg-leaf-100 text-forest-900';
  const leafPrimary = tone === 'dark' ? '#164B2B' : '#D9EACD';
  const leafStem = tone === 'dark' ? '#78A85A' : '#B9D6A7';
  const leafAccent = tone === 'dark' ? '#5D8C42' : '#8FBB72';

  return (
    <Link
      to="/"
      aria-label="Hi-Tech Drip Box — automatic farming system, back to home"
      className={cn('group inline-flex flex-col gap-1.5 leading-none', className)}
    >
      <span className="flex items-end gap-1.5">
        <span className="flex flex-col leading-[0.92]">
          <span className={cn('font-display text-[0.82rem] font-extrabold tracking-[0.02em] sm:text-[0.9rem]', primary)}>
            Hi-Tech
          </span>
          <span
            className={cn(
              'font-display text-[1.45rem] font-extrabold tracking-[-0.03em] sm:text-[1.65rem]',
              primary,
            )}
          >
            Drip Box
          </span>
        </span>
        <svg
          viewBox="0 0 32 32"
          className="mb-0.5 h-6 w-6 shrink-0 sm:h-7 sm:w-7"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M28 4C25.6 16.2 17.6 23.6 6.6 23.9 7.4 13 15.2 5.4 28 4Z" fill={leafPrimary} />
          <path
            d="M4.5 29c2.9-8.6 8.7-15 17.3-19.4"
            stroke={leafStem}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M18.7 25.2c.2-6 3.3-10.2 9.1-12.2-.2 6.2-3.4 10.4-9.1 12.2Z" fill={leafAccent} />
        </svg>
      </span>
      <span className={cn('w-fit rounded-full px-2.5 py-[3px] text-[0.5rem] font-bold uppercase tracking-[0.16em] sm:text-[0.55rem]', badge)}>
        {site.tagline}
      </span>
    </Link>
  );
}
