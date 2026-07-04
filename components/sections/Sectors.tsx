import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import styles from './Sectors.module.css';

const sectorIcons = ['building', 'users', 'target', 'star', 'building', 'monitor', 'handshake', 'lightbulb', 'star'];

const sectorSlugs = [
  'centros-educativos',
  'despachos-abogados',
  'agencias',
  'restaurantes',
  'hoteles',
  'comercios',
  'pymes', // oficinas
  'pymes', // empresas de servicios
  'pymes'  // pymes
];

export default async function Sectors({ locale = 'es' }: { locale?: string }) {
  const t = await getTranslations('sectors');
  const items = (await getTranslations()).raw('sectors.items') as string[];

  return (
    <section className={`section ${styles.sectors}`} id="sectores">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            {t('subtitle')}
          </p>
        </Reveal>

        <div className={styles.grid}>
          {items.map((sector, i) => {
            const slug = sectorSlugs[i] || 'pymes';
            return (
              <Reveal key={sector} delay={(i % 4) * 70}>
                <Link href={`/${locale}/sectores/${slug}`} className={styles.chip}>
                  <span className={styles.chipIcon}>
                    <Icon name={sectorIcons[i] ?? 'building'} size={20} />
                  </span>
                  <span className={styles.chipLabel}>{sector}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
