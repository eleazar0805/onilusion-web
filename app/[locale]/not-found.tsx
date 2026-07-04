import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { paths } from '@/lib/site';
import styles from './not-found.module.css';

export default async function NotFoundPage() {
  const locale = await getLocale();
  const t = await getTranslations('notfound');

  return (
    <section className={styles.wrap}>
      <div className="container">
        <p className={styles.code} aria-hidden="true">404</p>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.desc}>{t('desc')}</p>
        <div className={styles.actions}>
          <Link href={`/${locale}`} className="btn btn--primary btn--lg">
            {t('cta')}
            <Icon name="arrowRight" size={18} />
          </Link>
          <Link href={`/${locale}${paths.services}`} className="btn btn--secondary btn--lg">
            {t('cta2')}
          </Link>
        </div>
      </div>
    </section>
  );
}
