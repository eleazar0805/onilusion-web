import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { legalMetadata } from '@/lib/seo';
import { paths } from '@/lib/site';
import LegalPage from '@/components/sections/LegalPage';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages.legal' });
  return legalMetadata(locale, t('title'), paths.legal);
}

export default async function LegalNoticePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.legal');
  const sections = (await getTranslations()).raw('pages.legal.sections') as {
    h: string;
    p: string;
  }[];

  const companyData = [
    { label: t('name_label'), value: t('name') },
    { label: t('cif_label'), value: t('cif') },
    { label: t('address_label'), value: t('address') },
    { label: t('activity_label'), value: t('activity') },
    { label: t('email_label'), value: t('email') },
    { label: t('phone_label'), value: t('phone') },
  ];

  return (
    <LegalPage
      title={t('title')}
      sections={sections}
      companyData={companyData}
      companyDataTitle={t('company')}
    />
  );
}
