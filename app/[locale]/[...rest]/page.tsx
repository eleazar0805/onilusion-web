import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

/** Cualquier ruta no reconocida bajo /es|en|fr muestra la 404 del idioma. */
export default function CatchAllPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  notFound();
}
