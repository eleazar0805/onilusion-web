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
  const [showPrefs, setShowPrefs] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(false);
  const [allowMarketing, setAllowMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('onilusion_cookie_consent');
    if (!consent) {
      setVisible(true);
    } else if (consent === 'custom') {
      const savedPrefs = localStorage.getItem('onilusion_cookie_prefs');
      if (savedPrefs) {
        try {
          const parsed = JSON.parse(savedPrefs);
          setAllowAnalytics(!!parsed.analytics);
          setAllowMarketing(!!parsed.marketing);
        } catch {
          // Si el JSON falla, asumimos desactivado
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setVisible(true);
      setShowPrefs(true);
    };
    window.addEventListener('open-cookie-settings', handleOpen);
    return () => window.removeEventListener('open-cookie-settings', handleOpen);
  }, []);


  // Rastro RGPD: cuándo y con qué versión de la política se decidió.
  const recordConsentMeta = () => {
    localStorage.setItem(
      'onilusion_cookie_consent_meta',
      JSON.stringify({ date: new Date().toISOString(), version: '2026-07' })
    );
  };

  const acceptAll = () => {
    localStorage.setItem('onilusion_cookie_consent', 'accepted');
    localStorage.setItem(
      'onilusion_cookie_prefs',
      JSON.stringify({ analytics: true, marketing: true })
    );
    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
    recordConsentMeta();
    setVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('onilusion_cookie_consent', 'rejected');
    localStorage.setItem(
      'onilusion_cookie_prefs',
      JSON.stringify({ analytics: false, marketing: false })
    );
    window.gtag?.('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    recordConsentMeta();
    setVisible(false);
  };

  const saveCustom = () => {
    localStorage.setItem('onilusion_cookie_consent', 'custom');
    localStorage.setItem(
      'onilusion_cookie_prefs',
      JSON.stringify({ analytics: allowAnalytics, marketing: allowMarketing })
    );
    window.gtag?.('consent', 'update', {
      analytics_storage: allowAnalytics ? 'granted' : 'denied',
      ad_storage: allowMarketing ? 'granted' : 'denied',
      ad_user_data: allowMarketing ? 'granted' : 'denied',
      ad_personalization: allowMarketing ? 'granted' : 'denied',
    });
    recordConsentMeta();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`${styles.banner} ${showPrefs ? styles.bannerExtended : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={t('title')}
    >
      <div className={styles.inner}>
        <div className={styles.mainArea}>
          <div className={styles.content}>
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.desc}>
              {t('desc')}{' '}
              <Link href={`/${locale}/politica-cookies`} className={styles.link}>
                {t('privacy_link')}
              </Link>
            </p>
          </div>

          <div className={styles.actions}>
            <button
              className="btn btn--secondary btn--sm"
              onClick={() => setShowPrefs(!showPrefs)}
              aria-expanded={showPrefs}
              aria-controls="cookie-preferences-panel"
            >
              {t('configure')}
            </button>
            <button className="btn btn--secondary btn--sm" onClick={rejectAll}>
              {t('reject')}
            </button>
            <button className="btn btn--primary btn--sm" onClick={acceptAll}>
              {t('accept')}
            </button>
          </div>
        </div>

        {showPrefs && (
          <div id="cookie-preferences-panel" className={styles.preferences}>
            <div className={styles.prefList}>
              {/* Cookies Técnicas */}
              <div className={styles.prefItem}>
                <div className={styles.prefText}>
                  <h3 className={styles.prefTitle}>{t('pref_technical_title')}</h3>
                  <p className={styles.prefDesc}>{t('pref_technical_desc')}</p>
                </div>
                <div className={styles.switchWrap}>
                  <span className={styles.alwaysActive}>{locale === 'en' ? 'Always active' : locale === 'fr' ? 'Toujours actif' : 'Siempre activas'}</span>
                </div>
              </div>

              {/* Cookies de Análisis */}
              <div className={styles.prefItem}>
                <div className={styles.prefText}>
                  <h3 className={styles.prefTitle}>{t('pref_analytics_title')}</h3>
                  <p className={styles.prefDesc}>{t('pref_analytics_desc')}</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={allowAnalytics}
                    onChange={(e) => setAllowAnalytics(e.target.checked)}
                    aria-label={t('pref_analytics_title')}
                  />
                  <span className={styles.slider} />
                </label>
              </div>

              {/* Cookies de Marketing */}
              <div className={styles.prefItem}>
                <div className={styles.prefText}>
                  <h3 className={styles.prefTitle}>{t('pref_marketing_title')}</h3>
                  <p className={styles.prefDesc}>{t('pref_marketing_desc')}</p>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={allowMarketing}
                    onChange={(e) => setAllowMarketing(e.target.checked)}
                    aria-label={t('pref_marketing_title')}
                  />
                  <span className={styles.slider} />
                </label>
              </div>
            </div>

            <div className={styles.prefActions}>
              <button className="btn btn--primary btn--sm" onClick={saveCustom}>
                {t('save')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
