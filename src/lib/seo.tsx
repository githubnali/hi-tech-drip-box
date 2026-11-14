import { Helmet } from 'react-helmet-async';
import { site } from '@/data/site';
import type { FaqItem } from '@/types';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  faq?: FaqItem[];
}

export function Seo({ title, description, path, image = '/images/branding/og-image.webp', noindex, faq }: SeoProps) {
  const canonical = `${site.url}${path === '/' ? '/' : path}`;
  const imageUrl = `${site.url}${image}`;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    description: site.description,
    telephone: site.phone.tel,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      name: site.contactPerson,
      telephone: site.phone.tel,
      availableLanguage: ['English', 'Tamil'],
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content="Hi-Tech Drip Box automated terrace garden installation" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      {faq?.length ? (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          })}
        </script>
      ) : null}
    </Helmet>
  );
}
