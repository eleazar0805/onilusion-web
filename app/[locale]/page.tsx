import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import HowWeWork from '@/components/sections/HowWeWork';
import Cyber from '@/components/sections/Cyber';
import Sectors from '@/components/sections/Sectors';
import Partners from '@/components/sections/Partners';
import Faq from '@/components/sections/Faq';
import CtaBanner from '@/components/sections/CtaBanner';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return buildMetadata(locale, 'home');
}

export default function HomePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <TrustBar />
      <About locale={locale} />
      <Services locale={locale} />
      <HowWeWork />
      <Cyber locale={locale} />
      <Sectors />
      <Faq locale={locale} limit={6} />
      <Partners />
      <CtaBanner locale={locale} />
    </>
  );
}
