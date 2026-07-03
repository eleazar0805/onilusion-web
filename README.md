# Web corporativa — Onilusion S.A.

Web corporativa premium de **Onilusion S.A.**, empresa tecnológica española con sede en Madrid: consultoría informática, ciberseguridad, infraestructura, telecomunicaciones, cloud y desarrollo para pymes y empresas de toda España.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **next-intl** — internacionalización ES / EN / FR (ES por defecto, prefijo de idioma en URL)
- **CSS Modules** + design tokens (sin frameworks CSS)
- **react-hook-form + zod** — formulario de contacto con validación compartida cliente/servidor
- **nodemailer** — envío del formulario vía SMTP (solo servidor)

## Estructura

```
app/
  [locale]/            Páginas por idioma (es/en/fr)
    page.tsx           Home (hero con vídeo, servicios, ciberseguridad, FAQ…)
    servicios/         Catálogo completo de servicios
    sobre-nosotros/    Misión, diferenciación y valores
    preguntas-frecuentes/
    contacto/          Formulario + datos de contacto
    aviso-legal/  politica-privacidad/  politica-cookies/
    layout.tsx         Layout raíz: fuentes, Header/Footer, JSON-LD, cookies
    opengraph-image.tsx  Imagen OG generada (next/og)
  api/contact/         API del formulario (validación, honeypot, rate limit)
  sitemap.ts  robots.ts  icon.svg
components/
  layout/              Header, Footer, CookieBanner
  sections/            Secciones de página
  ui/                  Logo, iconos, Reveal (scroll), JSON-LD
i18n/  middleware.ts    Enrutado de idiomas (next-intl)
messages/              es.json · en.json · fr.json (todos los textos)
lib/                   Datos corporativos, SEO, Schema.org, esquema del formulario
public/videos/hero.mp4 Vídeo del hero
styles/globals.css     Design tokens + utilidades
```

## Ejecutar en local

Requiere **Node.js 18.17+** (recomendado 20 LTS).

```bash
npm install
npm run dev        # http://localhost:3000 → redirige a /es
```

## Build de producción

```bash
npm run build
npm start
```

## Formulario de contacto

La API (`/api/contact`) valida con zod, incluye honeypot anti-spam, rate limit por IP y neutralización de cabeceras. Para que envíe emails, copia `.env.example` a `.env.local` y rellena las variables SMTP. **Sin SMTP configurado**, la API registra la solicitud en logs del servidor y responde OK (útil en desarrollo).

Las variables de entorno solo se usan en servidor: ninguna clave llega al navegador.

## Despliegue

Cualquier hosting con soporte Node/Next.js:

- **Vercel**: importar el repo y desplegar (cero configuración). Añadir las variables SMTP en *Project Settings → Environment Variables*.
- **Servidor propio / VPS**: `npm run build && npm start` detrás de un proxy (Nginx/Caddy) con HTTPS.
- **Cloudflare** delante como CDN/WAF recomendado: la cabecera `cf-connecting-ip` ya se usa para el rate limit.

Las cabeceras de seguridad (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) se emiten desde `next.config.ts`.

## SEO

- Metadata por página e idioma con canonical + hreflang (es/en/fr/x-default)
- Open Graph y Twitter Cards; imagen OG generada con `next/og`
- Schema.org JSON-LD: Organization, ProfessionalService, Service/OfferCatalog, FAQPage, BreadcrumbList, ContactPoint
- `sitemap.xml` y `robots.txt` generados por Next
- Un único H1 por página, jerarquía semántica de encabezados, alt/aria en medios

Al publicar: dar de alta la propiedad en **Google Search Console** y enviar `https://www.onilusion.com/sitemap.xml`. Para analítica (GA4), añadir el script solo tras consentimiento del banner de cookies.

## Idiomas

Español es el idioma por defecto (`/es`). Todos los textos viven en `messages/*.json`; para ajustar una traducción basta editar el JSON correspondiente. Las rutas usan slugs en español en todos los idiomas (URLs estables y limpias).

## Accesibilidad y rendimiento

- HTML semántico, focus visible, navegación por teclado, `prefers-reduced-motion` respetado (incluido el vídeo del hero)
- Fuentes optimizadas con `next/font` (sin peticiones de render bloqueantes)
- Animaciones CSS ligeras con IntersectionObserver; JavaScript mínimo
