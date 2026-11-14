import type { ReactNode } from 'react';
import { Leaf, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { site } from '@/data/site';
import { createWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export function WhatsAppButton({
  message = whatsappMessages.general,
  label = 'WhatsApp Enquiry',
  variant = 'whatsapp',
  size = 'md',
  className,
  fullWidth,
  icon = true,
}: {
  message?: string;
  label?: string;
  variant?: 'whatsapp' | 'white' | 'whiteOutline' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  icon?: boolean;
}) {
  return (
    <Button
      href={createWhatsAppUrl(message)}
      external
      variant={variant}
      size={size}
      className={className}
      fullWidth={fullWidth}
      icon={icon ? <WhatsAppIcon className="h-[18px] w-[18px]" /> : undefined}
      aria-label={`${label} on WhatsApp`}
    >
      {label}
    </Button>
  );
}

export function CallButton({
  variant = 'outline',
  size = 'md',
  className,
  fullWidth,
  label = 'Call Alexander',
  showNumber = false,
}: {
  variant?: 'outline' | 'white' | 'whiteOutline' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  label?: string;
  showNumber?: boolean;
}) {
  return (
    <Button
      href={`tel:${site.phone.tel}`}
      variant={variant}
      size={size}
      className={className}
      fullWidth={fullWidth}
      icon={<Phone className="h-[18px] w-[18px]" />}
      aria-label={`Call Alexander on ${site.phone.display}`}
    >
      {label}
      {showNumber ? <span className="ml-1 font-semibold">{site.phone.local}</span> : null}
    </Button>
  );
}

export function StickyMobileWhatsApp() {
  return (
    <a
      href={createWhatsAppUrl(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-lift transition-colors hover:bg-wa-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 lg:hidden"
      aria-label="Start a WhatsApp enquiry with Hi-Tech Drip Box"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export function InlineWhatsAppLink({ message, children }: { message: string; children: ReactNode }) {
  return (
    <a
      href={createWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-semibold text-forest-700 underline decoration-leaf-400 underline-offset-4 hover:text-forest-900"
    >
      {children}
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export function LeafMark({ className }: { className?: string }) {
  return <Leaf className={className} aria-hidden="true" />;
}
