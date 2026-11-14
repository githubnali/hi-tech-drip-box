export type GardenCategory = 'vegetables' | 'small-trees' | 'flowers' | 'creepers';

export interface GardenImage {
  src: string;
  card: string;
  alt: string;
  width: number;
  height: number;
}

export interface GardenItem {
  id: string;
  title: string;
  caption: string;
  badge: string;
  categories: GardenCategory[];
  image: GardenImage;
  featuredOnHome?: boolean;
}

export interface SystemModel {
  id: string;
  number: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  price: string;
  priceNote: string;
  potSize: string;
  kit: string;
  planters: string;
  feederBoxes: string;
  suitable: string[];
  suitableSummary: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
}

export interface KitComponent {
  id: string;
  name: string;
  note: string;
  illustration: KitIllustrationKey;
}

export type KitIllustrationKey =
  | 'planter'
  | 'filter'
  | 'stand'
  | 'drainage'
  | 'feeder'
  | 'motor'
  | 'timer'
  | 'drip'
  | 'plumbing'
  | 'soil'
  | 'medium';

export interface ProcessStep {
  number: number;
  title: string;
  shortDescription: string;
  description: string;
  icon: 'clipboard' | 'sprout' | 'wrench' | 'timer' | 'leaf';
}

export interface Benefit {
  title: string;
  description: string;
  icon: 'droplets' | 'leaf' | 'power' | 'move' | 'shield';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface EnquiryInput {
  fullName: string;
  mobile: string;
  email?: string;
  city: string;
  model?: string;
  terraceArea?: string;
  message?: string;
}
