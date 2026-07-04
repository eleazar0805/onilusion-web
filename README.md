# Onilusion S.A. — Web Corporativa

Sitio web corporativo de **Onilusion S.A.**, empresa tecnológica española con sede en Madrid y cobertura nacional.

Construido con **Next.js 14**, **next-intl** (ES / EN / FR), **TypeScript** y **CSS Modules**.

---

## Requisitos

- Node.js ≥ 18
- npm ≥ 9

---

## Instalación y desarrollo local

```bash
# Instalar dependencias
cd onilusion-web
npm install

# Variables de entorno
cp .env.example .env.local
# Editar .env.local con las credenciales de email

# Servidor de desarrollo (http://localhost:3000)
npm run dev
```

---

## Variables de entorno

Crea `.env.local` a partir de `.env.example`:

| Variable | Descripción |
|---|---|
| `SMTP_HOST` | Servidor SMTP para el formulario de contacto |
| `SMTP_PORT` | Puerto SMTP (ej. 587) |
| `SMTP_USER` | Usuario del correo saliente |
| `SMTP_PASS` | Contraseña del correo saliente |
| `SMTP_FROM` | Remitente (ej. `noreply@onilusion.com`) |
| `CONTACT_EMAIL` | Receptor de formularios (`info@onilusion.com`) |
| `NEXT_PUBLIC_GA_ID` | (Opcional) ID de Google Analytics 4 — solo se carga tras consentimiento |
| `NEXT_PUBLIC_GTM_ID` | (Opcional) ID de Google Tag Manager — solo se carga tras consentimiento |

> ⚠️ **Nunca subas `.env.local` a Git** — está excluido en `.gitignore`.

---

## Scripts

```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Build de producción
npm run start    # Servir el build
npm run lint     # ESLint
```

---

## Estructura

```
onilusion-web/
├── app/[locale]/          # Rutas ES/EN/FR
│   ├── page.tsx           # Home
│   ├── layout.tsx         # Layout raíz
│   ├── servicios/
│   ├── sobre-nosotros/
│   ├── contacto/
│   ├── preguntas-frecuentes/
│   └── aviso-legal / politica-*/
├── app/api/contact/       # API route del formulario
├── components/
│   ├── layout/            # Header, Footer, CookieBanner
│   ├── sections/          # Hero, Services, Cyber, WhyChooseUs…
│   └── ui/                # Icon, Logo, Reveal, CountUp, JsonLd
├── lib/
│   ├── site.ts            # Datos corporativos (fuente única de verdad)
│   ├── schema.ts          # Schema.org JSON-LD
│   ├── seo.ts             # Metadata por página
│   └── contact-schema.ts  # Validación Zod del formulario
├── messages/
│   ├── es.json            # Español (idioma principal)
│   ├── en.json            # Inglés
│   └── fr.json            # Francés
├── public/videos/
│   ├── hero.mp4           # Vídeo de fondo del hero
│   └── hero-poster.jpg    # Póster de fallback
└── styles/globals.css     # Design tokens y utilidades
```

---

## Despliegue

### Vercel (recomendado)

1. Importa el repositorio en [vercel.com](https://vercel.com).
2. Añade las variables de entorno en **Settings → Environment Variables**.
3. Conecta `onilusion.com` en **Settings → Domains**.

### VPS / Node.js

```bash
npm run build && npm run start
```

Configura Nginx como proxy inverso hacia el puerto 3000.

### Cloudflare

Coloca Cloudflare delante para CDN, protección DDoS y SSL.  
Los security headers ya están configurados en `next.config.mjs`.

---

## SEO incluido

- Title, description y canonical por página e idioma.
- hreflang ES / EN / FR.
- Open Graph + Twitter Cards.
- Schema.org: Organization, ProfessionalService, OfferCatalog, FAQPage, BreadcrumbList.
- Sitemap en `/sitemap.xml` · Robots en `/robots.txt`.

---

## Empresa

**Onilusion S.A.**  
CIF: A82874603  
Calle Doctor Esquerdo, 105 · 28007 Madrid · España  
📞 914 009 634 · 💬 625 622 127  
✉️ info@onilusion.com · 🌐 www.onilusion.com

---

*© 2001–2026 Onilusion S.A. Todos los derechos reservados.*
