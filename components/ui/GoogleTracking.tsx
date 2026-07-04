'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function GoogleTracking() {
  useEffect(() => {
    // Restaurar consentimiento guardado en localStorage en el primer renderizado
    const savedPrefs = localStorage.getItem('onilusion_cookie_prefs');
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        window.gtag?.('consent', 'update', {
          analytics_storage: parsed.analytics ? 'granted' : 'denied',
          ad_storage: parsed.marketing ? 'granted' : 'denied',
          ad_user_data: parsed.marketing ? 'granted' : 'denied',
          ad_personalization: parsed.marketing ? 'granted' : 'denied',
        });
      } catch {
        // Ignorar fallos de parsing
      }
    }
  }, []);

  return (
    <>
      {/* 1. Inicialización por defecto de Consent Mode v2 */}
      <Script
        id="google-consent-mode"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            
            // Establecer denegado por defecto en la carga inicial (RGPD estricto)
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            
            // Configurar dataLayer para GTM
            gtag('js', new Date());
          `,
        }}
      />

      {/* 2. Inyección de Google Analytics 4 (GA4) */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* 3. Inyección de Google Tag Manager (GTM) */}
      {gtmId && (
        <Script
          id="google-tag-manager-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}
    </>
  );
}

// Extender la interfaz del objeto window global de TypeScript
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}
