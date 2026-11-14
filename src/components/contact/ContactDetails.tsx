import { Clock, MapPin, Phone } from 'lucide-react';
import { site } from '@/data/site';

export function ContactDetails() {
  return (
    <div>
      <h2 className="flex items-center gap-3 text-[0.95rem] font-bold text-forest-900">
        <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-forest-600/70" />
        Contact Details
      </h2>
      <ul className="mt-4 space-y-4">
        <li className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-forest-700">
            <Phone className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-wide text-muted">Speak to</p>
            <a
              href={`tel:${site.phone.tel}`}
              className="text-[0.92rem] font-semibold text-forest-900 underline-offset-4 hover:underline"
            >
              {site.contactPerson} — {site.phone.local}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-forest-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-wide text-muted">Service area</p>
            <p className="max-w-xs text-[0.82rem] leading-relaxed text-muted">{site.serviceAreaNote}</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-forest-700">
            <Clock className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-wide text-muted">Visits</p>
            <p className="max-w-xs text-[0.82rem] leading-relaxed text-muted">{site.hoursNote}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
