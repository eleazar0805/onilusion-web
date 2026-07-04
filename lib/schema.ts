import { site, localeUrl, paths } from './site';

const orgAddress = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  postalCode: site.address.postalCode,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
};

/** Organization + ProfessionalService (se emite en el layout, en todas las páginas). */
export function organizationSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.name,
        alternateName: site.brand,
        url: site.url,
        logo: `${site.url}/${site.defaultLocale}/opengraph-image`,
        email: site.email,
        telephone: site.phoneIntl,
        foundingDate: site.foundingDate,
        address: orgAddress,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: site.phoneIntl,
            contactType: 'customer service',
            areaServed: 'ES',
            availableLanguage: ['Spanish', 'English', 'French'],
          },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#localbusiness`,
        name: site.name,
        parentOrganization: { '@id': `${site.url}/#organization` },
        url: localeUrl(locale),
        telephone: site.phoneIntl,
        email: site.email,
        address: orgAddress,
        areaServed: { '@type': 'Country', name: 'España' },
        priceRange: '$$',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 40.40723,
          longitude: -3.66986,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:30',
          closes: '18:30',
        },
        sameAs: ['https://www.linkedin.com/company/onilusion'],
        hasMap: 'https://maps.google.com/?q=Calle+Doctor+Esquerdo,+105,+28007+Madrid',
        knowsAbout: [
          'Consultoría informática',
          'Ciberseguridad',
          'Mantenimiento informático',
          'Infraestructura tecnológica',
          'Telecomunicaciones',
          'Desarrollo web',
          'Desarrollo de software a medida',
          'Soluciones cloud',
        ],
      },
    ],
  };
}

/** Catálogo de servicios (home y página de servicios). */
export function servicesSchema(locale: string, services: { title: string; desc: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Servicios tecnológicos Onilusion',
    url: localeUrl(locale, paths.services),
    itemListElement: services.map((s, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.desc,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'España' },
      },
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbSchema(locale: string, crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: localeUrl(locale, c.path),
    })),
  };
}
