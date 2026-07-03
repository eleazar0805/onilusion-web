import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { site, localeUrl } from './site';

type PageKey = 'home' | 'services' | 'about' | 'contact' | 'faq';

const metaKeys: Record<PageKey, { title: string; desc: string }> = {
  home: { title: 'meta.home_title', desc: 'meta.home_desc' },
  services: { title: 'meta.services_title', desc: 'meta.services_desc' },
  about: { title: 'meta.about_title', desc: 'meta.about_desc' },
  contact: { title: 'meta.contact_title', desc: 'meta.contact_desc' },
  faq: { title: 'meta.faq_title', desc: 'meta.faq_desc' },
};

/** Metadata por página con canonical, hreflang, Open Graph y Twitter Cards. */
export async function buildMetadata(locale: string, page: PageKey, path: string = ''): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const title = t(metaKeys[page].title);
  const description = t(metaKeys[page].desc);
  const canonical = localeUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: localeUrl('es', path),
        en: localeUrl('en', path),
        fr: localeUrl('fr', path),
        'x-default': localeUrl(site.defaultLocale, path),
      },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url: canonical,
      locale: locale === 'es' ? 'es_ES' : locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/** Metadata simple para páginas legales (título propio, sin OG específico). */
export function legalMetadata(locale: string, title: string, path: string): Metadata {
  return {
    title: `${title} | ${site.name}`,
    alternates: {
      canonical: localeUrl(locale, path),
      languages: {
        es: localeUrl('es', path),
        en: localeUrl('en', path),
        fr: localeUrl('fr', path),
        'x-default': localeUrl(site.defaultLocale, path),
      },
    },
    robots: { index: true, follow: true },
  };
}
