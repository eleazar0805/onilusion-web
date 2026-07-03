import type { MetadataRoute } from 'next';
import { site, paths, localeUrl } from '@/lib/site';

const pageEntries: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: paths.home, priority: 1, changeFrequency: 'weekly' },
  { path: paths.services, priority: 0.9, changeFrequency: 'monthly' },
  { path: paths.about, priority: 0.7, changeFrequency: 'monthly' },
  { path: paths.faq, priority: 0.6, changeFrequency: 'monthly' },
  { path: paths.contact, priority: 0.8, changeFrequency: 'monthly' },
  { path: paths.legal, priority: 0.2, changeFrequency: 'yearly' },
  { path: paths.privacy, priority: 0.2, changeFrequency: 'yearly' },
  { path: paths.cookies, priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pageEntries.flatMap((entry) =>
    site.locales.map((locale) => ({
      url: localeUrl(locale, entry.path),
      lastModified: new Date(),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(
          site.locales.map((l) => [l, localeUrl(l, entry.path)])
        ),
      },
    }))
  );
}
