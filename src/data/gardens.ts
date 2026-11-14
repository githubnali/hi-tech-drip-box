import type { GardenCategory, GardenItem } from '@/types';

export const gardenFilters: { id: 'all' | GardenCategory; label: string }[] = [
  { id: 'all', label: 'All Gardens' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'small-trees', label: 'Small Trees' },
  { id: 'flowers', label: 'Flowers' },
  { id: 'creepers', label: 'Creepers' },
];

export const gardens: GardenItem[] = [
  {
    id: 'complete-terrace',
    title: 'Complete Terrace Garden Setup',
    caption:
      'Blue fibre planters arranged in rows along a checkered tiled walkway on a residential rooftop.',
    badge: 'Vegetables',
    categories: ['vegetables'],
    featuredOnHome: true,
    image: {
      src: '/images/gardens/terrace-checkered.webp',
      card: '/images/gardens/terrace-checkered-card.webp',
      alt: 'Automated terrace garden with rows of blue fibre planters on either side of a checkered tiled walkway',
      width: 1500,
      height: 1125,
    },
  },
  {
    id: 'flower-garden',
    title: 'Flower Garden on Terrace',
    caption:
      'Hibiscus and seasonal flowering plants growing in blue fibre planters under a green shade net.',
    badge: 'Flowers',
    categories: ['flowers'],
    featuredOnHome: true,
    image: {
      src: '/images/gardens/hibiscus-planters.webp',
      card: '/images/gardens/hibiscus-planters-card.webp',
      alt: 'Yellow and coral hibiscus flowers in blue fibre planters on a terrace',
      width: 960,
      height: 1200,
    },
  },
  {
    id: 'brinjal-seasonal',
    title: 'Brinjal & Seasonal Vegetables',
    caption:
      'Brinjal plants in flower, growing in fibre planters with drip lines running along the row.',
    badge: 'Vegetables',
    categories: ['vegetables'],
    featuredOnHome: true,
    image: {
      src: '/images/gardens/brinjal-row.webp',
      card: '/images/gardens/brinjal-row-card.webp',
      alt: 'Row of blue fibre planters with brinjal plants and white drip irrigation pipes on a terrace',
      width: 1200,
      height: 1600,
    },
  },
  {
    id: 'pomegranate',
    title: 'Pomegranate in Terrace Garden',
    caption:
      'Pomegranate fruits ripening on a young tree planted in a terrace fibre planter.',
    badge: 'Small Trees',
    categories: ['small-trees'],
    featuredOnHome: true,
    image: {
      src: '/images/gardens/pomegranate.webp',
      card: '/images/gardens/pomegranate-card.webp',
      alt: 'Pomegranate tree with orange fruit growing in a blue fibre planter on a terrace',
      width: 960,
      height: 1200,
    },
  },
  {
    id: 'leafy-greens',
    title: 'Leafy Greens & Herbs',
    caption: 'Dense leafy greens and herbs growing in fibre planters on a tiled terrace.',
    badge: 'Vegetables',
    categories: ['vegetables'],
    image: {
      src: '/images/gardens/leafy-greens.webp',
      card: '/images/gardens/leafy-greens-card.webp',
      alt: 'Lush leafy greens growing in blue fibre planters on a tiled rooftop terrace',
      width: 960,
      height: 1280,
    },
  },
  {
    id: 'feeder-layout',
    title: 'Layout with Feeder Box & Plumbing',
    caption:
      'Overhead view of a new terrace garden layout with fibre planters, feeder boxes and connecting plumbing.',
    badge: 'Complete Setup',
    categories: ['vegetables'],
    image: {
      src: '/images/gardens/aerial-layout.webp',
      card: '/images/gardens/aerial-layout-card.webp',
      alt: 'Overhead view of new blue fibre planters with soil, feeder boxes and white plumbing on a red terrace floor',
      width: 1280,
      height: 960,
    },
  },
  {
    id: 'bougainvillea',
    title: 'Bougainvillea Terrace Garden',
    caption:
      'Bright pink bougainvillea growing along a sunny terrace edge in blue fibre planters.',
    badge: 'Flowers',
    categories: ['flowers', 'creepers'],
    image: {
      src: '/images/gardens/bougainvillea.webp',
      card: '/images/gardens/bougainvillea-card.webp',
      alt: 'Pink bougainvillea and green foliage in a row of blue fibre planters on a terrace',
      width: 960,
      height: 1280,
    },
  },
  {
    id: 'multiple-crops',
    title: 'Leafy Crops Under Shade Net',
    caption:
      'Rows of leafy greens and seasonal crops in a shade-net growing area with irrigation lines.',
    badge: 'Vegetables',
    categories: ['vegetables'],
    image: {
      src: '/images/gardens/greenhouse-greens.webp',
      card: '/images/gardens/greenhouse-greens-card.webp',
      alt: 'Rows of leafy green crops in planters with white irrigation pipes under a green shade net',
      width: 1080,
      height: 611,
    },
  },
  {
    id: 'drip-system',
    title: 'Automated Drip System Layout',
    caption:
      'Wide view of a terrace garden being installed with drip irrigation lines and feeder boxes.',
    badge: 'Complete Setup',
    categories: ['vegetables'],
    image: {
      src: '/images/gardens/aerial-wide.webp',
      card: '/images/gardens/aerial-wide-card.webp',
      alt: 'Wide overhead view of a terrace garden installation with rows of blue planters and drip irrigation',
      width: 1280,
      height: 960,
    },
  },
  {
    id: 'brinjal-planter',
    title: 'Brinjal Growing in a Fibre Planter',
    caption:
      'A healthy brinjal plant being checked in a fibre planter with drip irrigation below the soil surface.',
    badge: 'Vegetables',
    categories: ['vegetables'],
    image: {
      src: '/images/gardens/brinjal-planter.webp',
      card: '/images/gardens/brinjal-planter-card.webp',
      alt: 'Close view of a brinjal plant with green fruit in a blue fibre planter',
      width: 1279,
      height: 1600,
    },
  },
  {
    id: 'installation',
    title: 'Planter Beds During Installation',
    caption:
      'The gardening team tending leafy vegetables and okra in raised fibre planters during an installation.',
    badge: 'Vegetables',
    categories: ['vegetables'],
    image: {
      src: '/images/gardens/installers-okra.webp',
      card: '/images/gardens/installers-okra-card.webp',
      alt: 'Two gardeners tending leafy vegetables and okra plants in blue fibre planters on a terrace',
      width: 1440,
      height: 1440,
    },
  },
];

export const featuredGardens = gardens.filter((garden) => garden.featuredOnHome);

export const galleryFacts = [
  { value: '300 sq. ft.', label: 'Designed system footprint' },
  { value: '11', label: 'Components in every kit' },
  { value: '2', label: 'Ready-to-install models' },
  { value: '5', label: 'Steps from plan to garden' },
];
