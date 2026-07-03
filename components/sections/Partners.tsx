import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import styles from './Partners.module.css';

export default async function Partners() {
  const t = await getTranslations('partners');
  const brands = (await getTranslations()).raw('partners.brands') as string[];

  return (
    <section className={`section ${styles.partners}`} id="partners">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            {t('subtitle')}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className={styles.logos} role="list">
            {brands.map((brand) => (
              <li key={brand} className={styles.logoItem}>
                <span className={styles.logoText}>{brand}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
