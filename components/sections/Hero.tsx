import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { paths } from '@/lib/site';
import HeroVideo from './HeroVideo';
import styles from './Hero.module.css';

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations('hero');

  const trustItems = [t('trust1'), t('trust2'), t('trust3')];

  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={`badge ${styles.badge} animate-fade-in-up`}>{t('badge')}</span>
            <h1 className={`${styles.title} animate-fade-in-up animate-delay-100`}>
              {t('h1_part1')}{' '}
              <span className={styles.titleAccent}>{t('h1_part2')}</span>{' '}
              {t('h1_part3')}
            </h1>
            <p className={`${styles.subtitle} animate-fade-in-up animate-delay-200`}>
              {t('subtitle')}
            </p>
            <div className={`${styles.ctas} animate-fade-in-up animate-delay-300`}>
              <Link href={`/${locale}${paths.contact}`} className="btn btn--primary btn--lg">
                {t('cta_primary')}
                <Icon name="arrowRight" size={18} />
              </Link>
              <Link href={`/${locale}${paths.services}`} className="btn btn--secondary btn--lg">
                {t('cta_secondary')}
              </Link>
            </div>
            <ul className={`${styles.trustList} animate-fade-in-up animate-delay-400`} role="list">
              {trustItems.map((item) => (
                <li key={item} className={styles.trustItem}>
                  <span className={styles.trustCheck}>
                    <Icon name="check" size={13} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.media} animate-fade-in-up animate-delay-200`}>
            <div className={styles.videoFrame}>
              <HeroVideo />
            </div>
            <div className={styles.videoGlow} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
