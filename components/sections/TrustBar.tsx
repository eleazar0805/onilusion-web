import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import CountUp from '@/components/ui/CountUp';
import styles from './TrustBar.module.css';

const stats = [
  { value: 'years_value', label: 'years_label' },
  { value: 'clients_value', label: 'clients_label' },
  { value: 'projects_value', label: 'projects_label' },
  { value: 'coverage_value', label: 'coverage_label' },
] as const;

export default async function TrustBar() {
  const t = await getTranslations('trust');

  return (
    <section className={styles.bar} aria-label="Cifras de Onilusion">
      <div className="container">
        <Reveal>
          <dl className={styles.grid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <dd className={styles.value}><CountUp value={t(s.value)} /></dd>
                <dt className={styles.label}>{t(s.label)}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
