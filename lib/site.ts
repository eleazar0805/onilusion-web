/**
 * Datos corporativos de Onilusion S.A.
 * Única fuente de verdad para SEO, Schema.org y componentes.
 */
export const site = {
  name: 'Onilusion S.A.',
  brand: 'Onilusion',
  url: 'https://www.onilusion.com',
  email: 'info@onilusion.com',
  phone: '914 009 634',
  phoneIntl: '+34914009634',
  whatsapp: '625 622 127',
  whatsappIntl: '34625622127',
  cif: 'A82874603',
  foundingDate: '2001-01-09',
  address: {
    street: 'Calle Doctor Esquerdo, 105',
    postalCode: '28007',
    city: 'Madrid',
    region: 'Madrid',
    country: 'ES',
  },
  locales: ['es', 'en', 'fr'] as const,
  defaultLocale: 'es' as const,
} as const;

export type Locale = (typeof site.locales)[number];

/** Rutas localizadas: el slug es único (ES) para URLs limpias y consistentes. */
export const paths = {
  home: '',
  services: '/servicios',
  about: '/sobre-nosotros',
  faq: '/preguntas-frecuentes',
  contact: '/contacto',
  legal: '/aviso-legal',
  privacy: '/politica-privacidad',
  cookies: '/politica-cookies',
} as const;

export function localeUrl(locale: string, path: string = ''): string {
  return `${site.url}/${locale}${path}`;
}

/** Landing por servicio: id de categoría → slug SEO (igual en todos los idiomas). */
export const serviceSlugs: Record<string, string> = {
  consultoria: 'consultoria-informatica',
  ciberseguridad: 'ciberseguridad',
  infraestructura: 'mantenimiento-informatico',
  telecom: 'telecomunicaciones',
  cloud: 'cloud-erp',
  desarrollo: 'desarrollo-software-web',
  hardware: 'equipamiento-tecnologico',
  auditorias: 'auditorias-informaticas',
};

export const slugToServiceId: Record<string, string> = Object.fromEntries(
  Object.entries(serviceSlugs).map(([id, slug]) => [slug, id])
);

export function servicePath(id: string): string {
  return `${paths.services}/${serviceSlugs[id] ?? id}`;
}
