import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { paths } from '@/lib/site';
import styles from './Cyber.module.css';

const cyberIcons = ['search', 'lock', 'network', 'alert'];

export default async function Cyber({ locale }: { locale: string }) {
  const t = await getTranslations('cyber');
  const items = (await getTranslations()).raw('cyber.items') as {
    title: string;
    desc: string;
  }[];

  return (
    <section className={`section ${styles.cyber}`} id="ciberseguridad">
      <div className={styles.shieldBg} aria-hidden="true">
        <Icon name="shield" size={480} strokeWidth={0.5} />
      </div>
      <div className="container">
        <div className={styles.grid}>
          <Reveal className={styles.intro}>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h2 className="section-title">{t('title')}</h2>
            <p className={styles.text}>{t('subtitle')}</p>
            <Link href={`/${locale}${paths.services}#ciberseguridad`} className="btn btn--primary">
              {t('cta')}
              <Icon name="arrowRight" size={16} />
            </Link>
          </Reveal>

          <div className={styles.items}>
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <article className={styles.item}>
                  <span className={styles.itemIcon}>
                    <Icon name={cyberIcons[i] ?? 'shield'} size={20} />
                  </span>
                  <div>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDesc}>{item.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
