import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import styles from './HowWeWork.module.css';

export default async function HowWeWork() {
  const t = await getTranslations('howwework');
  const steps = (await getTranslations()).raw('howwework.steps') as {
    num: string;
    title: string;
    desc: string;
  }[];

  return (
    <section className={`section ${styles.how}`} id="metodo">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{t('subtitle')}</span>
          <h2 className="section-title">{t('title')}</h2>
        </Reveal>

        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 100} as="li" className={styles.stepWrap}>
              <div className={styles.step}>
                <span className={styles.num}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
