import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GardenItem } from '@/types';
import { useFocusTrap, useLockBodyScroll } from '@/hooks/useFocusTrap';

interface ImageLightboxProps {
  items: GardenItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function ImageLightbox({ items, index, onClose, onIndexChange }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const isOpen = index !== null;
  const item = index !== null ? items[index] : undefined;

  useFocusTrap(isOpen, dialogRef);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onIndexChange((index + 1) % items.length);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onIndexChange((index - 1 + items.length) % items.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, index, items.length, onClose, onIndexChange]);

  if (!item || index === null) return null;

  const goPrevious = () => onIndexChange((index - 1 + items.length) % items.length);
  const goNext = () => onIndexChange((index + 1) % items.length);

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-950/95 px-4 py-4 backdrop-blur-sm sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
    >
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
        tabIndex={-1}
        aria-label="Close image viewer"
      />

      <div ref={dialogRef} className="relative z-10 flex max-h-full w-full max-w-5xl flex-col">
        <div className="flex items-center justify-between gap-4 pb-3">
          <p className="flex items-center gap-2 text-[0.8rem] font-semibold text-white">
            <span>{item.title}</span>
            <span className="text-white/50">
              ({index + 1} of {items.length})
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl bg-black/40"
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (start === null || end === undefined) return;
            const delta = end - start;
            if (Math.abs(delta) < 50) return;
            if (delta > 0) goPrevious();
            else goNext();
          }}
        >
          <img
            src={item.image.src}
            alt={item.image.alt}
            className="mx-auto max-h-[64vh] w-full object-contain sm:max-h-[68vh]"
          />
          <button
            type="button"
            onClick={goPrevious}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest-900 shadow-lg transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            aria-label="Previous garden image"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest-900 shadow-lg transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            aria-label="Next garden image"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p id="lightbox-caption" className="mt-3 max-w-3xl text-[0.85rem] leading-relaxed text-white/75">
          {item.caption}
        </p>
        <p className="mt-2 text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
          {item.badge} · Hi-Tech Drip Box installation photograph
        </p>
      </div>
    </div>,
    document.body,
  );
}
