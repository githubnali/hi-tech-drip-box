import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { createWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';

export function QuickEnquiryCard() {
  return (
    <div className="rounded-3xl border border-leaf-200 bg-leaf-100 p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-forest-700 shadow-sm">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
        <div>
          <h2 className="font-display text-[1.3rem] font-extrabold tracking-[-0.02em] text-ink">
            Quick Enquiry?
          </h2>
          <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">
            Get responses, product details and installation guidance on WhatsApp.
          </p>
        </div>
      </div>
      <Button
        href={createWhatsAppUrl(whatsappMessages.quickEnquiry)}
        external
        variant="primary"
        size="md"
        fullWidth
        className="mt-5"
        icon={<WhatsAppIcon className="h-[18px] w-[18px]" />}
        iconRight={<ArrowRight className="h-4 w-4" />}
      >
        Chat on WhatsApp Now
      </Button>
    </div>
  );
}
