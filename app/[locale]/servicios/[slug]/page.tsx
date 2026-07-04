import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { site, paths, localeUrl, serviceSlugs, slugToServiceId, servicePath } from '@/lib/site';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import PageHero from '@/components/sections/PageHero';
import FaqAccordion from '@/components/sections/FaqAccordion';
import CtaBanner from '@/components/sections/CtaBanner';
import styles from './servicio.module.css';

type Props = { params: { locale: string; slug: string } };

type Category = {
  id: string;
  title: string;
  desc: string;
  items: string[];
  landing?: {
    h1: string;
    meta_title: string;
    meta_desc: string;
    intro: string;
    benefits: string[];
    faqs: { q: string; a: string }[];
  };
};

const serviceIcons: Record<string, string> = {
  consultoria: 'lightbulb',
  ciberseguridad: 'shield',
  infraestructura: 'monitor',
  telecom: 'antenna',
  cloud: 'cloud',
  desarrollo: 'code',
  hardware: 'laptop',
  auditorias: 'audit',
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.values(serviceSlugs).map((slug) => ({ locale, slug }))
  );
}

async function getCategory(locale: string, slug: string): Promise<Category | undefined> {
  const id = slugToServiceId[slug];
  if (!id) return undefined;
  const t = await getTranslations({ locale });
  const categories = t.raw('pages.services.categories') as Category[];
  return categories.find((c) => c.id === id);
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const category = await getCategory(locale, slug);
  if (!category?.landing) return {};
  const path = `${paths.services}/${slug}`;
  return {
    title: category.landing.meta_title,
    description: category.landing.meta_desc,
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
      title: category.landing.meta_title,
      description: category.landing.meta_desc,
      url: localeUrl(locale, path),
      locale: locale === 'es' ? 'es_ES' : locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.landing.meta_title,
      description: category.landing.meta_desc,
    },
  };
}

export default async function ServiceLandingPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);
  const category = await getCategory(locale, slug);
  if (!category?.landing) notFound();
  const { landing } = category;

  const t = await getTranslations('pages.service_landing');
  const tNav = await getTranslations('nav');
  const tCta = await getTranslations('cta_final');

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category.title,
    description: landing.meta_desc,
    url: localeUrl(locale, `${paths.services}/${slug}`),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'España' },
    serviceType: category.title,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(landing.faqs)} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: 'Onilusion', path: '' },
          { name: tNav('services'), path: paths.services },
          { name: category.title, path: `${paths.services}/${slug}` },
        ])}
      />

      <PageHero title={landing.h1} subtitle={landing.intro} />

      <section className={`section ${styles.body}`}>
        <div className="container">
          <div className={styles.columns}>
            {/* Qué incluye */}
            <Reveal className={styles.included}>
              <h2 className={styles.blockTitle}>
                <span className={styles.blockIcon}>
                  <Icon name={serviceIcons[category.id] ?? 'target'} size={22} />
                </span>
                {t('included')}
              </h2>
              <ul className={styles.items} role="list">
                {category.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.itemCheck} aria-hidden="true">
                      <Icon name="check" size={12} strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Por qué Onilusion */}
            <Reveal delay={100} className={styles.benefits}>
              <h2 className={styles.blockTitle}>
                <span className={styles.blockIcon}>
                  <Icon name="star" size={22} />
                </span>
                {t('benefits')}
              </h2>
              <ul className={styles.benefitList} role="list">
                {landing.benefits.map((benefit) => (
                  <li key={benefit} className={styles.benefit}>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}${paths.contact}`} className="btn btn--primary">
                {tCta('cta_primary')}
                <Icon name="arrowRight" size={16} />
              </Link>
            </Reveal>
          </div>

          {/* FAQ del servicio */}
          <Reveal className={styles.faqBlock}>
            <h2 className={styles.faqTitle}>{t('faq')}</h2>
            <FaqAccordion items={landing.faqs} />
          </Reveal>

          <Reveal className={styles.backRow}>
            <Link href={`/${locale}${paths.services}`} className="btn btn--secondary">
              {t('back')}
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner locale={locale} />
    </>
  );
}
