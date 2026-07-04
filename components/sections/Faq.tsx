import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { paths } from '@/lib/site';
import FaqAccordion from './FaqAccordion';
import styles from './Faq.module.css';

type FaqProps = {
  locale: string;
  /** Número máximo de preguntas a mostrar (home muestra un subconjunto). */
  limit?: number;
  showHeader?: boolean;
};

export default async function Faq({ locale, limit, showHeader = true }: FaqProps) {
  const t = await getTranslations('faq');
  const allItems = (await getTranslations()).raw('faq.items') as { q: string; a: string }[];
  const items = limit ? allItems.slice(0, limit) : allItems;

  return (
    <section className={`section ${styles.faq}`} id="faq">
      <div className="container">
        {showHeader && (
          <Reveal className="section-header section-header--center">
            <h2 className="section-title">{t('title')}</h2>
            <p className="section-subtitle" style={{ marginTop: 16 }}>
              {t('subtitle')}
            </p>
          </Reveal>
        )}

        <Reveal delay={100}>
          <FaqAccordion items={items} headingLevel={showHeader ? 'h3' : 'h2'} />
        </Reveal>

        <Reveal delay={150} className={styles.footerCta}>
          <Link href={`/${locale}${paths.contact}`} className="btn btn--secondary">
            {t('cta')}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
