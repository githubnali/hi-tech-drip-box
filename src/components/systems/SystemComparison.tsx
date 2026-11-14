import {
  Boxes,
  Container as ContainerIcon,
  Droplets,
  IndianRupee,
  Leaf,
  Package,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { comparisonRows, systems } from '@/data/systems';

const rowIcons: Record<string, LucideIcon> = {
  pot: Package,
  planter: Boxes,
  feeder: ContainerIcon,
  leaf: Leaf,
  drip: Droplets,
  tool: Wrench,
  price: IndianRupee,
};

export function SystemComparison() {
  return (
    <section id="comparison" className="scroll-mt-24 bg-leaf-50 py-14 lg:py-20">
      <Container>
        <div className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7 lg:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.65fr] lg:items-start lg:gap-10">
            <SectionHeading
              kicker="Quick Comparison"
              title="Model Comparison"
              description="A simple side-by-side view to help you choose the right system for your terrace garden."
            />

            <div>
              <div className="hidden overflow-hidden rounded-2xl border border-line md:block">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Comparison of Hi-Tech Drip Box Model 01 Vegetables &amp; Creepers and Model 02 Small Trees
                  </caption>
                  <thead>
                    <tr className="bg-leaf-100">
                      <th scope="col" className="px-4 py-3 text-[0.8rem] font-bold text-forest-900">
                        Feature
                      </th>
                      {systems.map((system) => (
                        <th
                          key={system.id}
                          scope="col"
                          className="px-4 py-3 text-[0.8rem] font-bold text-forest-900"
                        >
                          Model {system.number} — {system.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => {
                      const Icon = rowIcons[row.icon] ?? Leaf;
                      const isPrice = row.icon === 'price';
                      return (
                        <tr
                          key={row.label}
                          className={isPrice ? 'bg-leaf-50/80' : 'border-t border-line'}
                        >
                          <th
                            scope="row"
                            className="w-[24%] px-4 py-3 text-[0.82rem] font-semibold text-forest-900"
                          >
                            <span className="flex items-start gap-2">
                              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" aria-hidden="true" />
                              {row.label}
                            </span>
                          </th>
                          {row.values.map((value, index) => (
                            <td
                              key={`${row.label}-${index}`}
                              className={
                                isPrice
                                  ? 'px-4 py-3 text-[0.95rem] font-bold text-forest-800'
                                  : 'px-4 py-3 text-[0.82rem] leading-relaxed text-muted'
                              }
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 md:hidden">
                {comparisonRows.map((row) => {
                  const Icon = rowIcons[row.icon] ?? Leaf;
                  return (
                    <div key={row.label} className="rounded-xl border border-line bg-white p-3.5">
                      <p className="flex items-center gap-2 text-[0.8rem] font-bold text-forest-900">
                        <Icon className="h-4 w-4 text-forest-600" aria-hidden="true" />
                        {row.label}
                      </p>
                      <dl className="mt-2 grid gap-1.5">
                        {row.values.map((value, index) => (
                          <div key={`${row.label}-${index}`} className="grid grid-cols-[5.5rem_1fr] gap-2">
                            <dt className="text-[0.7rem] font-medium text-muted">Model {index + 1}</dt>
                            <dd className="text-[0.78rem] leading-snug text-ink">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
