import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import styles from './Partners.module.css';

export default async function Partners() {
  const t = await getTranslations('partners');
  const brands = (await getTranslations()).raw('partners.brands') as string[];

  return (
    <section className={`section ${styles.partners}`} id="partners">
      <div className="container">
        <Reveal className={`section-header section-header--center ${styles.header}`}>
          <h2 className={`section-title ${styles.title}`}>{t('title')}</h2>
          <p className={`section-subtitle ${styles.subtitle}`}>{t('subtitle')}</p>
        </Reveal>
      </div>

      {/* Marquee infinito: la lista se duplica para el bucle sin cortes */}
      <Reveal delay={100}>
        <div className={styles.marquee}>
          <ul className={styles.track} role="list" aria-label={t('title')}>
            {brands.map((brand) => (
              <li key={brand} className={styles.logoItem}>
                <span className={styles.logoText}>{brand}</span>
              </li>
            ))}
            {brands.map((brand) => (
              <li key={`${brand}-dup`} className={styles.logoItem} aria-hidden="true">
                <span className={styles.logoText}>{brand}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
