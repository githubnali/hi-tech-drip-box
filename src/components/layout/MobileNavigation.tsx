import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Phone, X } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { Button } from '@/components/common/Button';
import { navigation, site } from '@/data/site';
import { createWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { useFocusTrap, useLockBodyScroll } from '@/hooks/useFocusTrap';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { pathname } = useLocation();

  useFocusTrap(open, panelRef);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default bg-forest-950/50 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close menu"
            tabIndex={-1}
          />
          <motion.div
            ref={panelRef}
            id="mobile-navigation-dialog"
            initial={reduceMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-forest-800 transition-colors hover:bg-leaf-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 px-5 py-6">
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.to;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex min-h-12 items-center justify-between rounded-xl px-4 text-[1.05rem] font-semibold transition-colors',
                          isActive
                            ? 'bg-leaf-100 text-forest-900'
                            : 'text-ink/85 hover:bg-leaf-50 hover:text-forest-800',
                        )}
                      >
                        {item.label}
                        <ArrowUpRight
                          className={cn('h-4 w-4', isActive ? 'text-forest-700' : 'text-muted/50')}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 space-y-3">
                <Button
                  href={`tel:${site.phone.tel}`}
                  variant="outline"
                  size="lg"
                  fullWidth
                  icon={<Phone className="h-[18px] w-[18px]" />}
                  aria-label={`Call Alexander on ${site.phone.display}`}
                >
                  Call Alexander · {site.phone.local}
                </Button>
                <Button
                  href={createWhatsAppUrl(whatsappMessages.general)}
                  external
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  icon={<WhatsAppIcon className="h-5 w-5" />}
                >
                  WhatsApp Enquiry
                </Button>
              </div>

              <p className="mt-8 rounded-xl bg-leaf-50 p-4 text-sm leading-relaxed text-muted">
                {site.contactPerson} — {site.phone.display}
                <br />
                {site.serviceAreaNote}
              </p>
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
