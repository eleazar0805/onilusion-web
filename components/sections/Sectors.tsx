import { getTranslations } from 'next-intl/server';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import styles from './Sectors.module.css';

const sectorIcons = ['building', 'users', 'target', 'star', 'building', 'monitor', 'handshake', 'lightbulb'];

export default async function Sectors() {
  const t = await getTranslations('sectors');
  const items = (await getTranslations()).raw('sectors.items') as string[];

  return (
    <section className={`section ${styles.sectors}`} id="sectores">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            {t('subtitle')}
          </p>
        </Reveal>

        <div className={styles.grid}>
          {items.map((sector, i) => (
            <Reveal key={sector} delay={(i % 4) * 70}>
              <div className={styles.chip}>
                <span className={styles.chipIcon}>
                  <Icon name={sectorIcons[i] ?? 'building'} size={20} />
                </span>
                <span className={styles.chipLabel}>{sector}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
