'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import { site, paths } from '@/lib/site';
import styles from './Header.module.css';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Cambia de idioma conservando la página actual.
  const switchLocale = (target: string) =>
    `/${target}${pathname.replace(/^\/(es|en|fr)(?=\/|$)/, '') || ''}`;

  const navLinks = [
    { href: `/${locale}${paths.services}`, label: t('nav.services') },
    { href: `/${locale}${paths.about}`, label: t('nav.about') },
    { href: `/${locale}${paths.faq}`, label: t('nav.faq') },
    { href: `/${locale}${paths.contact}`, label: t('nav.contact') },
  ];

  const langSwitch = (
    <>
      {(['es', 'en', 'fr'] as const).map((l, i) => (
        <span key={l} className={styles.langWrap}>
          {i > 0 && <span className={styles.langSep} aria-hidden="true">·</span>}
          <Link
            href={switchLocale(l)}
            className={locale === l ? styles.langActive : styles.lang}
            lang={l}
            aria-current={locale === l ? 'true' : undefined}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </>
  );

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className="container">
        <nav className={styles.nav} aria-label="Navegación principal">
          <Link href={`/${locale}`} className={styles.logo} aria-label="Onilusion — Inicio">
            <Logo />
          </Link>

          {/* Navegación de escritorio */}
          <ul className={styles.navLinks} role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a href={`tel:${site.phoneIntl}`} className={styles.phone} aria-label={`Teléfono ${site.phone}`}>
              <Icon name="phone" size={15} />
              <span>{site.phone}</span>
            </a>
            <a
              href={`https://wa.me/${site.whatsappIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsapp}
              aria-label={`WhatsApp ${site.whatsapp}`}
            >
              <Icon name="whatsapp" size={17} />
            </a>

            <div className={styles.langSwitch} aria-label="Selector de idioma">
              {langSwitch}
            </div>

            <Link href={`/${locale}${paths.contact}`} className="btn btn--primary btn--sm">
              {t('nav.cta')}
            </Link>

            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuInner}>
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.mobileContact}>
            <a href={`tel:${site.phoneIntl}`} className={styles.mobileChannel}>
              <Icon name="phone" size={17} />
              {site.phone}
            </a>
            <a
              href={`https://wa.me/${site.whatsappIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileChannel}
            >
              <Icon name="whatsapp" size={17} />
              {site.whatsapp}
            </a>
          </div>

          <div className={styles.mobileLang}>{langSwitch}</div>

          <Link
            href={`/${locale}${paths.contact}`}
            className="btn btn--primary"
            onClick={() => setMenuOpen(false)}
          >
            {t('nav.cta')}
          </Link>
        </div>
      </div>
    </header>
  );
}
