import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Pill({
  children,
  className,
  tone = 'green',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'green' | 'white' | 'dark';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold',
        tone === 'green' && 'border border-forest-700/15 bg-leaf-100 text-forest-800',
        tone === 'white' && 'border border-line bg-white text-forest-800 shadow-sm',
        tone === 'dark' && 'bg-forest-900/90 text-white backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </span>
  );
}
