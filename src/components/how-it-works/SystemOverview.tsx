import { CheckCircle2, Droplets, Sprout, Timer } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';

const labels = [
  { text: 'Fibre Planters & Stands', className: 'left-[4%] top-[7%]' },
  { text: 'Organic Soil & Plants', className: 'right-[4%] top-[7%]' },
  { text: 'Drip Irrigation Tubes', className: 'bottom-[26%] left-[4%]' },
  { text: 'Feeder Box + Lid', className: 'bottom-[7%] right-[4%]' },
];

const included = [
  'Durable fibre planters with stands',
  'Organic soil, manure and healthy plants',
  'Drip irrigation for precise watering',
  'Automatic timer for scheduled irrigation',
  'Submersible motor and feeder box',
  'Plumbing equipment and fittings',
  'Complete installation at your home',
];

export function SystemOverview() {
  return (
    <section className="bg-leaf-50 py-14 lg:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.12fr_1fr] lg:items-center lg:gap-12">
          <div className="rounded-3xl border border-leaf-200 bg-white p-2 shadow-card">
            <div className="relative overflow-hidden rounded-2xl bg-leaf-100">
              <img
                src="/images/systems/system-overview.webp"
                alt="Terrace garden system with blue fibre planters, drip irrigation pipes and feeder boxes along a checkered tiled walkway"
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              {labels.map((label) => (
                <span
                  key={label.text}
                  aria-hidden="true"
                  className={`absolute hidden items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.66rem] font-semibold text-forest-900 shadow-sm ring-1 ring-line backdrop-blur xl:inline-flex ${label.className}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
                  {label.text}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 px-3 py-3">
              <p className="flex items-center gap-2 text-[0.72rem] leading-snug text-muted">
                <Droplets className="h-4 w-4 shrink-0 text-forest-600" aria-hidden="true" />
                Irrigation lines run to every planter.
              </p>
              <span className="flex items-center gap-1.5 rounded-full bg-leaf-100 px-2.5 py-1 text-[0.62rem] font-semibold text-forest-800">
                <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                Automated
              </span>
            </div>
          </div>

          <div>
            <SectionHeading
              kicker="System Overview"
              title="A Smart & Efficient Farming Setup"
              description="A fully integrated setup that combines fibre planters, organic growing materials, irrigation and automation to make terrace gardening simpler."
            />
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-forest-900">
                  <CheckCircle2
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 fill-forest-700 text-white"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-2 text-[0.78rem] text-muted">
              <Sprout className="h-4 w-4 text-forest-600" aria-hidden="true" />
              Plant selection is planned with you during consultation.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
