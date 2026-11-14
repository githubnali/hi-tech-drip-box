import type { Benefit, FaqItem, ProcessStep } from '@/types';

const siteUrlFromEnv = import.meta.env.VITE_SITE_URL?.trim();

/**
 * Business details live here so content stays in one place.
 * Fields marked "confirmed: false" are not yet supplied by the business and are
 * intentionally not shown as facts on the website.
 */
export const site = {
  name: 'Hi-Tech Drip Box',
  tagline: 'Automatic Farming System',
  positioning: 'Your Space. Your Garden. Automatically.',
  description:
    'Complete, ready-to-install automated terrace gardening systems with fibre planters, organic soil, plants, drip irrigation and professional installation.',
  url: (siteUrlFromEnv || 'https://www.hitechdripbox.com').replace(/\/$/, ''),
  contactPerson: 'Alexander',
  phone: {
    display: '+91 98840 35450',
    local: '98840 35450',
    tel: '+919884035450',
  },
  whatsapp: {
    number: '919884035450',
  },
  /** Not supplied — add these in src/data/site.ts when confirmed. */
  email: '',
  address: '',
  social: {
    instagram: '',
    facebook: '',
  },
  /** Not supplied — displayed as a consultation note rather than invented hours. */
  serviceAreaNote: 'Service area and site visits are confirmed during your consultation.',
  hoursNote: 'Installation visits are scheduled with Alexander once your site is assessed.',
} as const;

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Our Systems', to: '/our-systems' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Our Gardens', to: '/our-gardens' },
  { label: 'Contact', to: '/contact' },
] as const;

export const benefits: Benefit[] = [
  {
    title: 'Water-Efficient Irrigation',
    description: 'Drip lines deliver water directly to each planter.',
    icon: 'droplets',
  },
  {
    title: 'Organic Growing',
    description: 'Organic soil, manure and healthy plants to begin with.',
    icon: 'leaf',
  },
  {
    title: 'Automated Watering',
    description: 'A timer schedules watering through the drip system.',
    icon: 'power',
  },
  {
    title: 'Portable & Relocatable',
    description: 'Planters and stands can be moved when your terrace changes.',
    icon: 'move',
  },
  {
    title: 'Durable Fibreglass',
    description: 'Sturdy fibre planters built for outdoor terrace use.',
    icon: 'shield',
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Understand Your Space',
    shortDescription: 'We assess your terrace area, sunlight and water access.',
    description:
      'We start by understanding your terrace area, available sunlight, water access and installation suitability so the layout fits your home.',
    icon: 'clipboard',
  },
  {
    number: 2,
    title: 'Plan & Set Up Your Garden',
    shortDescription: 'We recommend the model, plant mix and layout.',
    description:
      'Together we choose the right model and plan the plant mix and planter layout for the space you have available.',
    icon: 'sprout',
  },
  {
    number: 3,
    title: 'Professional Installation',
    shortDescription: 'Planters, plumbing, drip system and automation.',
    description:
      'The fibre planters, stands, organic soil, plants, plumbing and drip system are installed at your home by our team.',
    icon: 'wrench',
  },
  {
    number: 4,
    title: 'Automatic Irrigation Setup',
    shortDescription: 'Timer and motor are configured for scheduled watering.',
    description:
      'The automatic timer, submersible motor, feeder box and irrigation tubes are connected and configured for scheduled watering.',
    icon: 'timer',
  },
  {
    number: 5,
    title: 'Grow & Enjoy',
    shortDescription: 'Your terrace becomes a productive green space.',
    description:
      'Your terrace becomes a productive organic garden. We explain basic ongoing plant care and the scheduled watering routine at handover.',
    icon: 'leaf',
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'space',
    question: 'How much space is required for the installation?',
    answer:
      'The system is designed for approximately 300 sq. ft. of rooftop or terrace space. Every terrace is different, so Alexander will assess your space and confirm what suits your home.',
  },
  {
    id: 'plants',
    question: 'What plants can I grow in the system?',
    answer:
      'Model 01 is suited to leafy greens, seasonal vegetables, herbs and compatible creepers such as cucumber, bitter gourd and beans. Model 02 is designed for suitable small fruiting trees (for example pomegranate, lemon or guava), flowering plants and ornamentals. Plant suitability is confirmed during consultation.',
  },
  {
    id: 'automatic',
    question: 'Is the irrigation system fully automatic?',
    answer:
      'The automatic timer controls scheduled watering through the drip irrigation lines, so you do not have to water each planter by hand. Alexander will walk you through how the timer is set up for your garden.',
  },
  {
    id: 'installation',
    question: 'Do you provide installation at my home?',
    answer:
      'Yes. Professional installation is included, covering the fibre planters, stands, organic soil, plants, plumbing and automatic irrigation setup at your home.',
  },
  {
    id: 'kit',
    question: 'What is included in the kit?',
    answer:
      'Every kit includes 10 fibre planters, 10 filters, 20 fibre stands, 10 drainage boards, 1 feeder box with lid, 1 submersible motor, 1 automatic timer, drip irrigation tubes, plumbing equipment, organic soil and weightless growing medium.',
  },
  {
    id: 'relocate',
    question: 'Can the garden be relocated later?',
    answer:
      'The planters and stands are portable, so the garden can be moved. Talk to Alexander about relocating an installed system so the plumbing and irrigation can be adjusted correctly.',
  },
  {
    id: 'maintenance',
    question: 'Does the system require maintenance?',
    answer:
      'Watering is automated, but plants still need routine care such as pruning, checking growth and occasional cleaning of filters. We explain the basic care routine when the installation is handed over.',
  },
  {
    id: 'model',
    question: 'How can I choose the right model?',
    answer:
      'Choose Model 01 for leafy vegetables, seasonal vegetables and creepers, and Model 02 for suitable small fruiting trees and larger terrace plants. If you are unsure, call Alexander on +91 98840 35450 and he will recommend a system for your terrace.',
  },
];
