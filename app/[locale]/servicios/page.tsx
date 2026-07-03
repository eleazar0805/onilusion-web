import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, servicesSchema } from '@/lib/schema';
import { paths } from '@/lib/site';
import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import PageHero from '@/components/sections/PageHero';
import CtaBanner from '@/components/sections/CtaBanner';
import styles from './servicios.module.css';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return buildMetadata(locale, 'services', paths.services);
}

const categoryIcons: Record<string, string> = {
  consultoria: 'lightbulb',
  ciberseguridad: 'shield',
  mantenimiento: 'monitor',
  infraestructura: 'server',
  telecom: 'antenna',
  cloud: 'cloud',
  desarrollo: 'code',
};

export default async function ServicesPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('pages.services');
  const tNav = await getTranslations('nav');
  const categories = (await getTranslations()).raw('pages.services.categories') as {
    id: string;
    title: string;
    desc: string;
    items: string[];
  }[];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: 'Onilusion', path: '' },
          { name: tNav('services'), path: paths.services },
        ])}
      />
      <JsonLd data={servicesSchema(locale, categories)} />

      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className={`section ${styles.list}`}>
        <div className="container">
          <div className={styles.categories}>
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={(i % 2) * 80}>
                <article id={cat.id} className={styles.category}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryIcon}>
                      <Icon name={categoryIcons[cat.id] ?? 'target'} size={24} />
                    </span>
                    <h2 className={styles.categoryTitle}>{cat.title}</h2>
                  </div>
                  <p className={styles.categoryDesc}>{cat.desc}</p>
                  <ul className={styles.items} role="list">
                    {cat.items.map((item) => (
                      <li key={item} className={styles.item}>
                        <span className={styles.itemCheck} aria-hidden="true">
                          <Icon name="check" size={12} strokeWidth={2.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.footerCta}>
            <Link href={`/${locale}${paths.contact}`} className="btn btn--primary btn--lg">
              {t('cta')}
              <Icon name="arrowRight" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner locale={locale} />
    </>
  );
}
