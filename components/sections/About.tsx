import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { paths } from '@/lib/site';
import styles from './About.module.css';

const valueIcons = ['handshake', 'target', 'lock', 'star'];

export default async function About({ locale }: { locale: string }) {
  const t = await getTranslations('about');
  const values = (await getTranslations()).raw('about.values') as {
    title: string;
    desc: string;
  }[];

  return (
    <section className={`section ${styles.about}`} id="sobre-onilusion">
      <div className="container">
        <div className={styles.grid}>
          <Reveal className={styles.intro}>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h2 className="section-title">{t('title')}</h2>
            <p className={styles.text}>{t('subtitle')}</p>
            <div className={styles.ctas}>
              <Link href={`/${locale}${paths.about}`} className="btn btn--primary">
                {t('cta_history')}
              </Link>
              <Link href={`/${locale}${paths.contact}`} className="btn btn--secondary">
                {t('cta_contact')}
              </Link>
            </div>
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
        </div>
      </div>
    </section>
  );
}
