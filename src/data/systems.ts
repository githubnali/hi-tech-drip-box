import type { KitComponent, SystemModel } from '@/types';

export const systems: SystemModel[] = [
  {
    id: 'vegetables-creepers',
    number: '01',
    name: 'Vegetables & Creepers',
    shortName: 'Model 01',
    description:
      'Ideal for leafy vegetables, seasonal vegetables and suitable creepers like cucumber, bitter gourd and beans.',
    longDescription:
      'A ready-to-install system for a working vegetable terrace. Ten fibre planters with drip irrigation and automatic watering, planted with leafy greens, seasonal vegetables, herbs and compatible creepers.',
    price: '₹1,40,000',
    priceNote: '+ GST',
    potSize: '40″ (L) × 20″ (B) × 12″ (H)',
    kit: '10 Planters + 1 Feeder Box',
    planters: '10 fibre planters',
    feederBoxes: '1 feeder box with lid',
    suitable: ['Leafy Greens', 'Seasonal Vegetables', 'Creepers', 'Herbs'],
    suitableSummary:
      'Leafy vegetables, seasonal vegetables, creepers (cucumber, bitter gourd, beans) and herbs.',
    image: '/images/systems/model-vegetables.webp',
    imageAlt:
      'Rows of blue fibre planters with vegetable plants and drip irrigation lines on a terrace',
    whatsappMessage:
      "Hi Alexander, I'm interested in Model 01 — Vegetables & Creepers, priced at ₹1,40,000 + GST. Please share installation details.",
  },
  {
    id: 'small-trees',
    number: '02',
    name: 'Small Trees',
    shortName: 'Model 02',
    description:
      'Designed for small fruiting trees and larger growing plants suitable for terrace gardens.',
    longDescription:
      'A deeper planter system for a terrace with larger plants. Ten fibre planters with drip irrigation and automatic watering, suited to selected small fruiting trees, flowering plants and ornamentals.',
    price: '₹1,50,000',
    priceNote: '+ GST',
    potSize: '26″ (L) × 22″ (B) × 18″ (H)',
    kit: '10 Planters + 1 Feeder Box',
    planters: '10 fibre planters',
    feederBoxes: '1 feeder box with lid',
    suitable: ['Fruit Plants', 'Flowering Plants', 'Small Trees', 'Ornamentals'],
    suitableSummary:
      'Small fruiting trees such as pomegranate, lemon and guava, flowering plants and ornamentals — subject to site suitability.',
    image: '/images/systems/model-small-trees.webp',
    imageAlt: 'Pomegranate tree with ripening fruit growing in a blue fibre terrace planter',
    whatsappMessage:
      "Hi Alexander, I'm interested in Model 02 — Small Trees, priced at ₹1,50,000 + GST. Please share installation details.",
  },
];

export const kitComponents: KitComponent[] = [
  { id: 'planters', name: 'Fibre Planters', note: '10 planters', illustration: 'planter' },
  { id: 'filters', name: 'Filters', note: '10 filters', illustration: 'filter' },
  { id: 'stands', name: 'Fibre Stands', note: '20 stands', illustration: 'stand' },
  { id: 'drainage', name: 'Drainage Boards', note: '10 boards', illustration: 'drainage' },
  { id: 'feeder', name: 'Feeder Box + Lid', note: '1 unit', illustration: 'feeder' },
  { id: 'motor', name: 'Submersible Motor', note: '1 unit', illustration: 'motor' },
  { id: 'timer', name: 'Automatic Timer', note: '1 unit', illustration: 'timer' },
  { id: 'drip', name: 'Drip Irrigation Tubes', note: 'Full set', illustration: 'drip' },
  { id: 'plumbing', name: 'Plumbing Equipment', note: 'Full set', illustration: 'plumbing' },
  { id: 'soil', name: 'Organic Soil', note: 'Growing mix', illustration: 'soil' },
  { id: 'medium', name: 'Weightless Medium', note: 'Growing medium', illustration: 'medium' },
];

export const comparisonRows = [
  {
    label: 'Pot Size',
    icon: 'pot' as const,
    values: [systems[0].potSize, systems[1].potSize],
  },
  { label: 'Number of Planters', icon: 'planter' as const, values: ['10 planters', '10 planters'] },
  { label: 'Feeder Box', icon: 'feeder' as const, values: ['1 feeder box + lid', '1 feeder box + lid'] },
  { label: 'Suitable Plants', icon: 'leaf' as const, values: [systems[0].suitableSummary, systems[1].suitableSummary] },
  {
    label: 'Automated Irrigation',
    icon: 'drip' as const,
    values: ['Included — automatic timer + drip irrigation', 'Included — automatic timer + drip irrigation'],
  },
  {
    label: 'Included Installation',
    icon: 'tool' as const,
    values: ['Yes — professional installation', 'Yes — professional installation'],
  },
  {
    label: 'Price',
    icon: 'price' as const,
    values: ['₹1,40,000 + GST', '₹1,50,000 + GST'],
  },
];
