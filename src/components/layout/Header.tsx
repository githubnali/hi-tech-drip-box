import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Phone } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { WhatsAppButton } from '@/components/common/Actions';
import { navigation, site } from '@/data/site';
import { cn } from '@/lib/utils';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-forest-900/10 bg-white/92 shadow-header backdrop-blur-xl supports-[backdrop-filter]:bg-white/82">
        <Container className="flex h-[72px] items-center justify-between gap-3 lg:h-[80px]">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative block rounded-full px-2.5 py-2 text-[0.9rem] font-semibold tracking-[-0.01em] transition-all xl:px-3.5 xl:text-[0.95rem]',
                        'after:absolute after:inset-x-2.5 after:-bottom-[3px] after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-forest-600 after:transition-transform after:duration-200 xl:after:inset-x-3.5',
                        'hover:bg-leaf-50 hover:text-forest-700',
                        isActive
                          ? 'text-forest-800 after:scale-x-100'
                          : 'text-ink/75',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phone.tel}`}
              className="hidden items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 transition-colors hover:border-forest-600/40 hover:bg-leaf-50 xl:inline-flex"
              aria-label={`Call Alexander on ${site.phone.display}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-leaf-100 text-forest-700">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.62rem] font-medium uppercase tracking-[0.08em] text-muted">
                  Call {site.contactPerson}
                </span>
                <span className="block text-[0.82rem] font-semibold text-ink">{site.phone.local}</span>
              </span>
            </a>

            <WhatsAppButton size="sm" className="hidden px-5 sm:inline-flex" />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest-800 transition-colors hover:bg-leaf-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-dialog"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
