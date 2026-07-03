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

  // Con el menú abierto: bloquear scroll del fondo y permitir cerrar con Escape.
  // El bloqueo va en <html>: ponerlo en <body> lo convierte en contenedor de
  // scroll y rompe el header sticky (desaparecía al abrir el menú con scroll).
  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Cambia de idioma conservando la página actual.
  const switchLocale = (target: string) =>
    `/${target}${pathname.replace(/^\/(es|en|fr)(?=\/|$)/, '') || ''}`;

  // Navegación por secciones de la portada (anclas limpias).
  const navLinks = [
    { href: `/${locale}#inicio`, label: t('nav.home') },
    { href: `/${locale}#servicios`, label: t('nav.services') },
    { href: `/${locale}#sobre-nosotros`, label: t('nav.about') },
    { href: `/${locale}#faq`, label: t('nav.faq') },
    { href: `/${locale}#contacto`, label: t('nav.contact') },
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
    <>
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
      </header>

      {/* Menú móvil: fuera del header para que position:fixed funcione
          desde cualquier punto de la página (el backdrop-filter del header
          crearía un containing block y lo desposicionaría). */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobileMenuInner} aria-label="Menú móvil">
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.mobileContact}>
            <a href={`tel:${site.phoneIntl}`} className={styles.mobileChannel} tabIndex={menuOpen ? 0 : -1}>
              <Icon name="phone" size={17} />
              {site.phone}
            </a>
            <a
              href={`https://wa.me/${site.whatsappIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileChannel}
              tabIndex={menuOpen ? 0 : -1}
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
            tabIndex={menuOpen ? 0 : -1}
          >
            {t('nav.cta')}
          </Link>
        </nav>
      </div>
    </>
  );
}
