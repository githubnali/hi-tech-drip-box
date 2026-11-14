import type { EnquiryInput } from '@/types';
import { buildEnquiryWhatsAppMessage, createWhatsAppUrl } from './whatsapp';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim();
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const RATE_LIMIT_KEY = 'htdb:last-enquiry-at';
const RATE_LIMIT_MS = 30_000;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Client-side smoothing only — real spam protection belongs at the backend. */
export function getRateLimitRemaining() {
  try {
    const raw = window.localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return 0;
    const elapsed = Date.now() - Number(raw);
    if (!Number.isFinite(elapsed) || elapsed < 0) return 0;
    return Math.max(0, RATE_LIMIT_MS - elapsed);
  } catch {
    return 0;
  }
}

export function markSubmission() {
  try {
    window.localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
  } catch {
    /* storage may be unavailable — submission still works */
  }
}

export function getWhatsAppFallbackUrl(data: EnquiryInput) {
  return createWhatsAppUrl(buildEnquiryWhatsAppMessage(data));
}

export function openWhatsApp(url: string) {
  const opened = window.open(url, '_blank');
  if (opened) {
    try {
      opened.opener = null;
    } catch {
      /* cross-origin window handles may reject this — the tab is already open */
    }
    return true;
  }
  return false;
}

/**
 * Stores the enquiry in Supabase when VITE_SUPABASE_URL and
 * VITE_SUPABASE_ANON_KEY are configured. The anon key is a public key and
 * relies on an insert-only Row Level Security policy (see README).
 */
export async function saveEnquiryToSupabase(data: EnquiryInput) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase is not configured.');
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      full_name: data.fullName,
      mobile: data.mobile,
      email: data.email || null,
      city: data.city,
      model: data.model || null,
      terrace_area: data.terraceArea || null,
      message: data.message || null,
      source: 'website',
    }),
  });

  if (!response.ok) {
    throw new Error(`Enquiry could not be saved (status ${response.status}).`);
  }

  return true;
}
