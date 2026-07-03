'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('onilusion_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('onilusion_cookie_consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('onilusion_cookie_consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.title}>{t('title')}</p>
          <p className={styles.desc}>
            {t('desc')}{' '}
            <Link href={`/${locale}/politica-cookies`} className={styles.link}>
              {t('privacy_link')}
            </Link>
          </p>
        </div>
        <div className={styles.actions}>
          <button className="btn btn--secondary btn--sm" onClick={reject}>
            {t('reject')}
          </button>
          <button className="btn btn--primary btn--sm" onClick={accept}>
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
