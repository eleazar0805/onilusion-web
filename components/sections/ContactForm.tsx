'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { contactSchema, type ContactData } from '@/lib/contact-schema';
import { paths } from '@/lib/site';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();
  const services = t.raw('services') as string[];
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: '' },
  });

  const onSubmit = async (data: ContactData) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </span>
        <h3 className={styles.successTitle}>{t('success_title')}</h3>
        <p className={styles.successDesc}>{t('success_desc')}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.row}>
        <div className="form-group">
          <label className="form-label" htmlFor="cf-name">{t('name')} *</label>
          <input
            id="cf-name"
            className="form-input"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && <span className="form-error" role="alert">{t('name')}: 2+</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="cf-company">{t('company')}</label>
          <input
            id="cf-company"
            className="form-input"
            type="text"
            autoComplete="organization"
            {...register('company')}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label className="form-label" htmlFor="cf-email">{t('email')} *</label>
          <input
            id="cf-email"
            className="form-input"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && <span className="form-error" role="alert">✕ {t('email')}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="cf-phone">{t('phone')}</label>
          <input
            id="cf-phone"
            className="form-input"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="cf-service">{t('service')} *</label>
        <select
          id="cf-service"
          className="form-select"
          aria-invalid={!!errors.service}
          defaultValue=""
          {...register('service')}
        >
          <option value="" disabled>
            —
          </option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && <span className="form-error" role="alert">✕ {t('service')}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="cf-message">{t('message')} *</label>
        <textarea
          id="cf-message"
          className="form-textarea"
          rows={5}
          aria-invalid={!!errors.message}
          {...register('message')}
        />
        {errors.message && <span className="form-error" role="alert">✕ {t('message')} (10+)</span>}
      </div>

      {/* Honeypot anti-spam: oculto para humanos */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <label className="form-checkbox-label">
        <input
          type="checkbox"
          className="form-checkbox"
          aria-invalid={!!errors.privacy}
          {...register('privacy')}
        />
        <span>
          {t('privacy')}{' '}
          <Link href={`/${locale}${paths.privacy}`} className={styles.privacyLink}>
            {t('privacy_link')}
          </Link>{' '}
          *
        </span>
      </label>
      {errors.privacy && <span className="form-error" role="alert">✕</span>}

      {status === 'error' && (
        <p className={styles.errorBox} role="alert">{t('error')}</p>
      )}

      <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
