import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { paths } from '@/lib/site';
import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/sections/PageHero';
import Faq from '@/components/sections/Faq';
import CtaBanner from '@/components/sections/CtaBanner';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return buildMetadata(locale, 'faq', paths.faq);
}

export default async function FaqPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('pages.faq');
  const tNav = await getTranslations('nav');
  const items = (await getTranslations()).raw('faq.items') as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: 'Onilusion', path: '' },
          { name: tNav('faq'), path: paths.faq },
        ])}
      />
      <JsonLd data={faqSchema(items)} />

      <PageHero title={t('title')} subtitle={t('subtitle')} />
      <Faq locale={locale} showHeader={false} />
      <CtaBanner locale={locale} />
    </>
  );
}
