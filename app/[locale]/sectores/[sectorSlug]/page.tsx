import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import styles from './SectorPage.module.css';

const VALID_SECTORS = [
  'centros-educativos',
  'despachos-abogados',
  'hoteles',
  'restaurantes',
  'agencias',
  'comercios',
  'pymes',
];

type Props = {
  params: {
    locale: string;
    sectorSlug: string;
  };
};

export async function generateStaticParams() {
  const paths: any[] = [];
  routing.locales.forEach((locale) => {
    VALID_SECTORS.forEach((sectorSlug) => {
      paths.push({ locale, sectorSlug });
    });
  });
  return paths;
}

export async function generateMetadata({ params: { locale, sectorSlug } }: Props) {
  if (!VALID_SECTORS.includes(sectorSlug)) {
    return {};
  }
  const t = await getTranslations({ locale });
  const sectorName = t(`dynamic_sectors.${sectorSlug}.title`);
  const sectorDesc = t(`dynamic_sectors.${sectorSlug}.desc`);

  return {
    title: `${sectorName} | Onilusion S.A.`,
    description: sectorDesc,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onilusion.com'}/${locale}/sectores/${sectorSlug}`,
    },
  };
}

export default async function SectorSlugPage({ params: { locale, sectorSlug } }: Props) {
  if (!VALID_SECTORS.includes(sectorSlug)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const sectorName = t(`dynamic_sectors.${sectorSlug}.title`);
  const sectorDesc = t(`dynamic_sectors.${sectorSlug}.desc`);

  return (
    <div className={styles.container}>
      <div className={styles.glow} />
      <div className="section-container">
        {/* Enlace de regreso */}
        <Link href={`/${locale}`} className={styles.backLink}>
          <Icon name="arrow" size={16} className={styles.backIcon} />
          {locale === 'en' ? 'Back to Home' : locale === 'fr' ? "Retour à l'accueil" : 'Volver al inicio'}
        </Link>

        {/* Contenido principal */}
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.badge}>Sectores de Actividad</span>
            <h1 className={styles.title}>{sectorName}</h1>
            <p className={styles.description}>{sectorDesc}</p>
          </div>

          <div className={styles.features}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Icon name="laptop" size={24} />
              </div>
              <h2 className={styles.cardTitle}>Adaptación Sectorial</h2>
              <p className={styles.cardText}>
                Comprendemos las normativas específicas, software de gestión habitual (ERP/CRM) y las necesidades críticas de tu sector.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Icon name="audit" size={24} />
              </div>
              <h2 className={styles.cardTitle}>Cumplimiento & RGPD</h2>
              <p className={styles.cardText}>
                Aseguramos la confidencialidad de los datos, copias de seguridad estancas y la auditoría exigida por la ley vigente.
              </p>
            </div>
          </div>

          {/* Banner de Contacto / Conversión */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaInfo}>
              <h3 className={styles.ctaTitle}>¿Quieres optimizar la tecnología de tu negocio?</h3>
              <p className={styles.ctaText}>
                Ofrecemos planes de soporte informático a medida con respuesta rápida presencial en Madrid y remota en toda España.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href={`/${locale}/contacto`} className="btn btn-primary">
                Solicitar asesoramiento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
