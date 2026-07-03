import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { site, paths } from '@/lib/site';
import styles from './CtaBanner.module.css';

export default async function CtaBanner({ locale }: { locale: string }) {
  const t = await getTranslations('cta_final');

  return (
    <section className={`section ${styles.wrap}`} id="contacto">
      <div className="container">
        <Reveal>
          <div className={styles.banner}>
            <div className={styles.bgGlow} aria-hidden="true" />
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.subtitle}>{t('subtitle')}</p>

            <div className={styles.actions}>
              <Link href={`/${locale}${paths.contact}`} className={`btn btn--lg ${styles.btnLight}`}>
                {t('cta_primary')}
                <Icon name="arrowRight" size={18} />
              </Link>
              <a href={`tel:${site.phoneIntl}`} className={`btn btn--lg ${styles.btnGhost}`}>
                <Icon name="phone" size={18} />
                {t('cta_secondary')} · {site.phone}
              </a>
            </div>

            <div className={styles.channels}>
              <a
                href={`https://wa.me/${site.whatsappIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channel}
              >
                <Icon name="whatsapp" size={17} />
                WhatsApp · {site.whatsapp}
              </a>
              <a href={`mailto:${site.email}`} className={styles.channel}>
                <Icon name="mail" size={17} />
                {site.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
