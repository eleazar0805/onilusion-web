import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/ui/JsonLd';
import { servicesSchema } from '@/lib/schema';
import { servicePath } from '@/lib/site';
import styles from './Services.module.css';

const serviceIcons: Record<string, string> = {
  consultoria: 'lightbulb',
  infraestructura: 'server',
  ciberseguridad: 'shield',
  desarrollo: 'code',
  cloud: 'cloud',
  telecom: 'antenna',
  hardware: 'laptop',
  auditorias: 'audit',
  // legacy fallbacks
  mantenimiento: 'monitor',
  redes: 'network',
};

export default async function Services({ locale }: { locale: string }) {
  const t = await getTranslations('services');
  const items = (await getTranslations()).raw('services.items') as {
    id: string;
    title: string;
    desc: string;
    problem: string;
  }[];

  return (
    <section className={`section ${styles.services}`} id="servicios">
      <JsonLd data={servicesSchema(locale, items)} />
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{t('subtitle')}</span>
          <h2 className="section-title">{t('title')}</h2>
        </Reveal>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 80}>
              <Link
                href={`/${locale}${servicePath(item.id)}`}
                className={styles.card}
                aria-label={item.title}
              >
                <span className={styles.icon}>
                  <Icon name={serviceIcons[item.id] ?? 'target'} size={24} />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                <span className={styles.cardCta}>
                  {t('cta').replace('→', '').trim()}
                  <Icon name="arrowRight" size={15} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
