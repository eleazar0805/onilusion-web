import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import styles from './ServicePage.module.css';

const VALID_SERVICES = [
  'ciberseguridad',
  'mantenimiento-informatico',
  'consultoria-informatica',
  'auditoria-informatica',
  'servicios-it',
  'infraestructura-tecnologica',
  'telecomunicaciones',
  'redes-empresariales',
  'desarrollo-web',
  'desarrollo-software',
  'cloud',
  'apis-integraciones',
  'soporte-informatico',
];

type Props = {
  params: {
    locale: string;
    serviceSlug: string;
  };
};

export async function generateStaticParams() {
  const paths: any[] = [];
  routing.locales.forEach((locale) => {
    VALID_SERVICES.forEach((serviceSlug) => {
      paths.push({ locale, serviceSlug });
    });
  });
  return paths;
}

export async function generateMetadata({ params: { locale, serviceSlug } }: Props) {
  if (!VALID_SERVICES.includes(serviceSlug)) {
    return {};
  }
  const t = await getTranslations({ locale });
  const serviceName = t(`dynamic_services.${serviceSlug}.title`);
  const serviceDesc = t(`dynamic_services.${serviceSlug}.desc`);

  return {
    title: `${serviceName} | Onilusion S.A.`,
    description: serviceDesc,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onilusion.com'}/${locale}/${serviceSlug}`,
    },
  };
}

export default async function ServiceSlugPage({ params: { locale, serviceSlug } }: Props) {
  if (!VALID_SERVICES.includes(serviceSlug)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const serviceName = t(`dynamic_services.${serviceSlug}.title`);
  const serviceDesc = t(`dynamic_services.${serviceSlug}.desc`);

  return (
    <div className={styles.container}>
      <div className={styles.glow} />
      <div className="section-container">
        {/* Enlace de regreso */}
        <Link href={`/${locale}/servicios`} className={styles.backLink}>
          <Icon name="arrow" size={16} className={styles.backIcon} />
          {t('cookies.back' as any) || 'Volver a Servicios'}
        </Link>

        {/* Contenido principal */}
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.badge}>Servicio Especializado</span>
            <h1 className={styles.title}>{serviceName}</h1>
            <p className={styles.description}>{serviceDesc}</p>
          </div>

          <div className={styles.features}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Icon name="cpu" size={24} />
              </div>
              <h2 className={styles.cardTitle}>Infraestructura & Control</h2>
              <p className={styles.cardText}>
                Diseño e implementación bajo estándares ISO y metodologías ágiles ITIL para asegurar la máxima estabilidad empresarial.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Icon name="shield" size={24} />
              </div>
              <h2 className={styles.cardTitle}>Seguridad Integrada</h2>
              <p className={styles.cardText}>
                Auditoría técnica proactiva, copias de seguridad híbridas cifradas y monitorización continua desde el primer minuto.
              </p>
            </div>
          </div>

          {/* Banner de Contacto / Conversión */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaInfo}>
              <h3 className={styles.ctaTitle}>¿Necesitas soporte con este servicio?</h3>
              <p className={styles.ctaText}>
                Analizamos el estado actual de tu infraestructura informática y proponemos una solución adaptada a tus necesidades de negocio.
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
