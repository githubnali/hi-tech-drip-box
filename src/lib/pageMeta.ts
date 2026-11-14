import pages from '@/data/pages.json';

type PageKey = keyof typeof pages;
type PageMeta = (typeof pages)[PageKey];

export const pageMeta = pages as Record<PageKey, PageMeta>;
