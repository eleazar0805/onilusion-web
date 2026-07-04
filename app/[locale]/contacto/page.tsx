import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site, paths } from '@/lib/site';
import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import PageHero from '@/components/sections/PageHero';
import ContactForm from '@/components/sections/ContactForm';
import styles from './contacto.module.css';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return buildMetadata(locale, 'contact', paths.contact);
}

export default async function ContactPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const tNav = await getTranslations('nav');

  const channels = [
    {
      icon: 'pin',
      label: t('address_label'),
      value: t('address'),
      href: undefined as string | undefined,
    },
    { icon: 'phone', label: t('phone_label'), value: site.phone, href: `tel:${site.phoneIntl}` },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: site.whatsapp,
      href: `https://wa.me/${site.whatsappIntl}`,
    },
    { icon: 'mail', label: t('email_label'), value: site.email, href: `mailto:${site.email}` },
    { icon: 'pin', label: t('coverage_label'), value: t('coverage'), href: undefined },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: 'Onilusion', path: '' },
          { name: tNav('contact'), path: paths.contact },
        ])}
      />

      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className={`section ${styles.contact}`}>
        <div className="container">
          <div className={styles.grid}>
            <Reveal className={styles.info}>
              <ul className={styles.channels} role="list">
                {channels.map((ch) => (
                  <li key={ch.label} className={styles.channel}>
                    <span className={styles.channelIcon}>
                      <Icon name={ch.icon} size={20} />
                    </span>
                    <div>
                      <span className={styles.channelLabel}>{ch.label}</span>
                      {ch.href ? (
                        <a
                          href={ch.href}
                          className={styles.channelValue}
                          {...(ch.href.startsWith('http')
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {ch.value}
                        </a>
                      ) : (
                        <span className={styles.channelValue} style={{ whiteSpace: 'pre-line' }}>
                          {ch.value}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100} className={styles.formWrap}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
