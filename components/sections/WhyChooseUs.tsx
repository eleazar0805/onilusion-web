import { getTranslations } from 'next-intl/server';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import styles from './WhyChooseUs.module.css';

const reasonIcons = [
  'target',
  'headset',
  'pin',
  'star',
  'lightbulb',
  'handshake',
];

export default async function WhyChooseUs() {
  const t = await getTranslations('whychooseus');
  const stats = (await getTranslations()).raw('whychooseus.stats') as {
    value: string;
    label: string;
  }[];
  const reasons = (await getTranslations()).raw('whychooseus.reasons') as string[];

  return (
    <section className={`section ${styles.why}`} id="por-que-onilusion">
      {/* Glow decorativo */}
      <div className={styles.glow} aria-hidden="true" />

      <div className="container">
        {/* Encabezado + stats en la misma fila (layout maqueta) */}
        <div className={styles.top}>
          <Reveal className={styles.header}>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h2 className={`section-title ${styles.title}`}>{t('title')}</h2>
          </Reveal>

          <Reveal delay={100} className={styles.statsRow}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={styles.stat}>
                {i > 0 && <span className={styles.statSep} aria-hidden="true" />}
                <div className={styles.statInner}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Razones en grid */}
        <div className={styles.reasons}>
          {reasons.map((reason, i) => (
            <Reveal key={reason} delay={(i % 3) * 80}>
              <div className={styles.reason}>
                <span className={styles.reasonIcon}>
                  <Icon name={reasonIcons[i] ?? 'check'} size={18} />
                </span>
                <span className={styles.reasonText}>{reason}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
