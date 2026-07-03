import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { paths } from '@/lib/site';
import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import PageHero from '@/components/sections/PageHero';
import TrustBar from '@/components/sections/TrustBar';
import CtaBanner from '@/components/sections/CtaBanner';
import styles from './sobre-nosotros.module.css';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return buildMetadata(locale, 'about', paths.about);
}

const valueIcons = ['handshake', 'target', 'lock', 'star'];

export default async function AboutPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('pages.about');
  const tNav = await getTranslations('nav');
  const tAll = await getTranslations();
  const values = tAll.raw('about.values') as { title: string; desc: string }[];

  const facts = [t('founded'), t('location'), t('coverage')];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: 'Onilusion', path: '' },
          { name: tNav('about'), path: paths.about },
        ])}
      />

      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className={`section ${styles.body}`}>
        <div className="container">
          <div className={styles.facts}>
            {facts.map((fact) => (
              <span key={fact} className="badge">
                <Icon name="check" size={13} strokeWidth={2.5} />
                {fact}
              </span>
            ))}
          </div>

          <div className={styles.columns}>
            <Reveal className={styles.block}>
              <h2 className={styles.blockTitle}>{t('mission_title')}</h2>
              <p className={styles.blockText}>{t('mission_text')}</p>
            </Reveal>
            <Reveal delay={100} className={styles.block}>
              <h2 className={styles.blockTitle}>{t('diff_title')}</h2>
              <p className={styles.blockText}>{t('diff_text')}</p>
            </Reveal>
          </div>

          <Reveal className={styles.valuesHeader}>
            <h2 className="section-title">{t('values_title')}</h2>
          </Reveal>

          <div className={styles.values}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <article className={`card ${styles.valueCard}`}>
                  <span className={styles.valueIcon}>
                    <Icon name={valueIcons[i] ?? 'star'} size={22} />
                  </span>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.footerCta}>
            <Link href={`/${locale}${paths.contact}`} className="btn btn--primary btn--lg">
              {tAll('about.cta_contact')}
              <Icon name="arrowRight" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <TrustBar />
      <CtaBanner locale={locale} />
    </>
  );
}
