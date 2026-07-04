import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { site, localeUrl, sectorSlugs } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import PageHero from '@/components/sections/PageHero';
import CtaBanner from '@/components/sections/CtaBanner';
import styles from './SectorPage.module.css';

const VALID_SECTORS = sectorSlugs;

type Props = { params: { locale: string; sectorSlug: string } };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_SECTORS.map((sectorSlug) => ({ locale, sectorSlug }))
  );
}

export async function generateMetadata({ params: { locale, sectorSlug } }: Props): Promise<Metadata> {
  if (!VALID_SECTORS.includes(sectorSlug as (typeof VALID_SECTORS)[number])) return {};
  const t = await getTranslations({ locale });
  const title = t(`dynamic_sectors.${sectorSlug}.title`);
  const description = t(`dynamic_sectors.${sectorSlug}.desc`);
  const path = `/sectores/${sectorSlug}`;

  return {
    title: `${title} | ${site.name}`,
    description,
    alternates: {
      canonical: localeUrl(locale, path),
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
      title: `${title} | ${site.name}`,
      description,
      url: localeUrl(locale, path),
      locale: locale === 'es' ? 'es_ES' : locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title: `${title} | ${site.name}`, description },
  };
}

export default async function SectorLandingPage({ params: { locale, sectorSlug } }: Props) {
  if (!VALID_SECTORS.includes(sectorSlug as (typeof VALID_SECTORS)[number])) notFound();
  setRequestLocale(locale);

  const t = await getTranslations();
  const tUi = await getTranslations('pages.sector_landing');
  const title = t(`dynamic_sectors.${sectorSlug}.title`);
  const description = t(`dynamic_sectors.${sectorSlug}.desc`);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: 'Onilusion', path: '' },
          { name: tUi('badge'), path: '/#sectores' },
          { name: title, path: `/sectores/${sectorSlug}` },
        ])}
      />

      <PageHero eyebrow={tUi('badge')} title={title} subtitle={description} />

      <section className={`section ${styles.body}`}>
        <div className="container">
          <div className={styles.cards}>
            <Reveal>
              <article className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon name="target" size={24} />
                </span>
                <h2 className={styles.cardTitle}>{tUi('card1_title')}</h2>
                <p className={styles.cardText}>{tUi('card1_text')}</p>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon name="shield" size={24} />
                </span>
                <h2 className={styles.cardTitle}>{tUi('card2_title')}</h2>
                <p className={styles.cardText}>{tUi('card2_text')}</p>
              </article>
            </Reveal>
          </div>

          <Reveal className={styles.backRow}>
            <Link href={`/${locale}/#sectores`} className="btn btn--secondary">
              {tUi('back')}
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner locale={locale} />
    </>
  );
}
