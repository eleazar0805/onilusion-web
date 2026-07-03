import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';
import { organizationSchema } from '@/lib/schema';
import JsonLd from '@/components/ui/JsonLd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import '@/styles/globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.brand,
  formatDetection: { telephone: true, email: true },
};

export const viewport: Viewport = {
  themeColor: '#060D1F',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sora.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={organizationSchema(locale)} />
        <NextIntlClientProvider messages={messages}>
          <a href="#contenido" className="skip-link">
            {locale === 'en' ? 'Skip to content' : locale === 'fr' ? 'Aller au contenu' : 'Saltar al contenido'}
          </a>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
