'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { site, paths } from '@/lib/site';
import styles from './MobileStickyActions.module.css';

export default function MobileStickyActions() {
  const t = useTranslations('mobile_sticky');
  const locale = useLocale();

  return (
    <div className={styles.stickyBar} role="complementary" aria-label="Acciones rápidas">
      {/* Botón de Llamar */}
      <a
        href={`tel:${site.phoneIntl}`}
        className={styles.actionBtn}
        aria-label={`${t('call')}: ${site.phone}`}
      >
        <span className={styles.iconWrap}>
          <Icon name="phone" size={18} />
        </span>
        <span className={styles.label}>{t('call')}</span>
      </a>

      {/* Botón de WhatsApp */}
      <a
        href={`https://wa.me/${site.whatsappIntl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.actionBtn} ${styles.whatsappBtn}`}
        aria-label={`${t('whatsapp')}: ${site.whatsapp}`}
      >
        <span className={styles.iconWrap}>
          <Icon name="whatsapp" size={18} />
        </span>
        <span className={styles.label}>{t('whatsapp')}</span>
      </a>

      {/* Botón de Contacto / Asesoramiento */}
      <Link
        href={`/${locale}${paths.contact}`}
        className={`${styles.actionBtn} ${styles.contactBtn}`}
        aria-label={t('contact')}
      >
        <span className={styles.iconWrap}>
          <Icon name="mail" size={18} />
        </span>
        <span className={styles.label}>{t('contact')}</span>
      </Link>
    </div>
  );
}
