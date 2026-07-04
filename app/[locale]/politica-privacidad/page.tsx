import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { legalMetadata } from '@/lib/seo';
import { paths } from '@/lib/site';
import LegalPage from '@/components/sections/LegalPage';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.privacy' });
  return legalMetadata(locale, t('title'), paths.privacy, t('subtitle'));
}

export default async function PrivacyPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.privacy');
  const sections = (await getTranslations()).raw('pages.privacy.sections') as {
    h: string;
    p: string;
  }[];

  return <LegalPage title={t('title')} subtitle={t('subtitle')} sections={sections} />;
}
