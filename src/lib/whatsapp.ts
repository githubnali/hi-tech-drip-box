export const WHATSAPP_NUMBER = '919884035450';

export function createWhatsAppUrl(message: string) {
  const phone = WHATSAPP_NUMBER;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general:
    "Hi Alexander, I'm interested in the Hi-Tech Drip Box automated terrace gardening system. Please share more details.",
  model01:
    "Hi Alexander, I'm interested in Model 01 — Vegetables & Creepers, priced at ₹1,40,000 + GST. Please share installation details.",
  model02:
    "Hi Alexander, I'm interested in Model 02 — Small Trees, priced at ₹1,50,000 + GST. Please share installation details.",
  installation:
    'Hi Alexander, I would like to understand the installation process for a Hi-Tech Drip Box terrace garden. Please share the details.',
  videoSetup:
    'Hi Alexander, please share the complete terrace setup video for Hi-Tech Drip Box.',
  videoIrrigation:
    'Hi Alexander, please share the drip irrigation in action video for Hi-Tech Drip Box.',
  videoResults: 'Hi Alexander, please share the plant growth and results video for Hi-Tech Drip Box.',
  gardenLikeThis:
    "Hi Alexander, I'd like a terrace garden like the ones shown on your website. Please share more details.",
  recommendation:
    'Hi Alexander, I am not sure which Hi-Tech Drip Box model suits my terrace. Please help me choose.',
  quickEnquiry:
    "Hi Alexander, I'd like to know more about the Hi-Tech Drip Box automated terrace gardening system. Please get in touch.",
} as const;

export interface EnquiryMessageInput {
  fullName: string;
  mobile: string;
  email?: string;
  city: string;
  model?: string;
  terraceArea?: string;
  message?: string;
}

/**
 * Builds a readable, prefilled WhatsApp enquiry. Every optional field is only
 * included when the visitor filled it in.
 */
export function buildEnquiryWhatsAppMessage(data: EnquiryMessageInput) {
  const lines = [
    'New terrace garden enquiry — Hi-Tech Drip Box',
    '',
    `Name: ${data.fullName}`,
    `Mobile: ${data.mobile}`,
  ];

  if (data.email) lines.push(`Email: ${data.email}`);
  lines.push(`City / Location: ${data.city}`);
  if (data.model) lines.push(`Interested model: ${data.model}`);
  if (data.terraceArea) lines.push(`Approximate terrace area: ${data.terraceArea}`);
  if (data.message) lines.push('', `Message: ${data.message}`);

  return lines.join('\n');
}
