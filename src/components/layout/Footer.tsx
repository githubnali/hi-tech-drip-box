import { Facebook, Instagram, Phone } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { navigation, site } from '@/data/site';
import { createWhatsAppUrl, whatsappMessages } from '@/lib/whatsapp';
import { Link } from 'react-router-dom';

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: 'Instagram', href: site.social.instagram, Icon: Instagram },
    { label: 'Facebook', href: site.social.facebook, Icon: Facebook },
  ].filter((social) => Boolean(social.href));

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(120,168,90,0.16),transparent_45%)]"
      />
      <Container className="relative pb-8 pt-14 lg:pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.2fr] lg:gap-14">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Ready-to-install automated terrace gardening systems for homes — fibre planters, organic soil,
              plants, drip irrigation and professional installation.
            </p>
            <p className="mt-4 font-display text-sm font-semibold tracking-[-0.01em] text-leaf-300">
              {site.positioning}
            </p>
            {socials.length ? (
              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Hi-Tech Drip Box on ${label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-leaf-400 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-300"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-leaf-300">Quick Links</h2>
            <ul className="mt-4 space-y-1">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-9 items-center text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-leaf-300">
              Talk to us
            </h2>
            <p className="mt-4 font-display text-lg font-bold text-white">{site.contactPerson}</p>
            <a
              href={`tel:${site.phone.tel}`}
              className="mt-1 inline-flex min-h-9 items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-leaf-300" aria-hidden="true" />
              {site.phone.display}
            </a>
            <a
              href={createWhatsAppUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex min-h-9 items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4 text-leaf-300" />
              WhatsApp enquiry
            </a>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/45">{site.serviceAreaNote}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Hi-Tech Drip Box. All rights reserved.</p>
          <p>Automatic farming systems for residential terraces.</p>
        </div>
      </Container>
    </footer>
  );
}
