import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { legalMetadata } from '@/lib/seo';
import { paths } from '@/lib/site';
import LegalPage from '@/components/sections/LegalPage';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.cookies' });
  return legalMetadata(locale, t('title'), paths.cookies);
}

export default async function CookiesPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('pages.cookies');
  const sections = (await getTranslations()).raw('pages.cookies.sections') as {
    h: string;
    p: string;
  }[];

  return <LegalPage title={t('title')} subtitle={t('subtitle')} sections={sections} />;
}
