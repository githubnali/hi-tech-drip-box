import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { FaqItem } from '@/types';
import { cn } from '@/lib/utils';

interface FAQAccordionProps {
  items: FaqItem[];
  defaultOpenId?: string;
}

export function FAQAccordion({ items, defaultOpenId }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `faq-button-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-xl border transition-colors duration-200',
              isOpen ? 'border-leaf-300 bg-leaf-100/70' : 'border-line bg-white hover:border-leaf-300',
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex min-h-14 w-full items-center gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest-700"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors',
                    isOpen ? 'bg-forest-700 text-white' : 'bg-leaf-100 text-forest-700',
                  )}
                >
                  {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
                <span className="flex-1 text-[0.88rem] font-semibold leading-snug text-forest-900 sm:text-[0.92rem]">
                  {item.question}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 pl-[3.25rem] text-[0.82rem] leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
