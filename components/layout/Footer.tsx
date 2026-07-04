import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import { site } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href={`/${locale}`} className={styles.logo} aria-label="Onilusion — Inicio">
              <Logo />
            </Link>
            <p className={styles.desc}>{t('footer.description')}</p>
            <div className={styles.social}>
              <a
                href="https://www.linkedin.com/company/onilusion"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Onilusion en LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
              <a href={`mailto:${site.email}`} className={styles.socialLink} aria-label={`Email: ${site.email}`}>
                <Icon name="mail" size={16} />
                {site.email}
              </a>
            </div>
            <div className={styles.contact}>
              <span className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true"><Icon name="pin" size={16} /></span>
                {site.address.street}, {site.address.postalCode} {site.address.city}
              </span>
              <a href={`tel:${site.phoneIntl}`} className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true"><Icon name="phone" size={16} /></span>
                {site.phone}
              </a>
              <a
                href={`https://wa.me/${site.whatsappIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
              >
                <span className={styles.contactIcon} aria-hidden="true"><Icon name="whatsapp" size={16} /></span>
                {site.whatsapp}
              </a>
              <a href={`mailto:${site.email}`} className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true"><Icon name="mail" size={16} /></span>
                {site.email}
              </a>
            </div>
          </div>

          <div className={styles.columns}>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>{t('footer.services_title')}</h3>
              <ul className={styles.columnLinks}>
                <li><Link href={`/${locale}/servicios`}>{t('footer.links.services')}</Link></li>
                <li><Link href={`/${locale}/servicios#ciberseguridad`}>{t('footer.links.cybersecurity')}</Link></li>
                <li><Link href={`/${locale}/servicios#infraestructura`}>{t('footer.links.maintenance')}</Link></li>
                <li><Link href={`/${locale}/servicios#consultoria`}>{t('footer.links.consulting')}</Link></li>
                <li><Link href={`/${locale}/servicios#desarrollo`}>{t('footer.links.development')}</Link></li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3 className={styles.columnTitle}>{t('footer.company_title')}</h3>
              <ul className={styles.columnLinks}>
                <li><Link href={`/${locale}/sobre-nosotros`}>{t('footer.links.about')}</Link></li>
                <li><Link href={`/${locale}/preguntas-frecuentes`}>{t('footer.links.faq')}</Link></li>
                <li><Link href={`/${locale}/contacto`}>{t('footer.links.contact')}</Link></li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3 className={styles.columnTitle}>{t('footer.legal_title')}</h3>
              <ul className={styles.columnLinks}>
                <li><Link href={`/${locale}/aviso-legal`}>{t('footer.links.legal')}</Link></li>
                <li><Link href={`/${locale}/politica-privacidad`}>{t('footer.links.privacy')}</Link></li>
                <li><Link href={`/${locale}/politica-cookies`}>{t('footer.links.cookies')}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{t('footer.copyright')}</p>
          <div className={styles.langSwitch}>
            <Link href="/es" className={locale === 'es' ? styles.langActive : styles.lang}>ES</Link>
            <span className={styles.langSep}>·</span>
            <Link href="/en" className={locale === 'en' ? styles.langActive : styles.lang}>EN</Link>
            <span className={styles.langSep}>·</span>
            <Link href="/fr" className={locale === 'fr' ? styles.langActive : styles.lang}>FR</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
