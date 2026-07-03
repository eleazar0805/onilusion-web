import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Onilusion S.A. — Soluciones tecnológicas para empresas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #060D1F 0%, #0A1733 60%, #0E2352 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 9999,
              background: 'radial-gradient(circle at 32% 28%, #A9F0FA 0%, #4ED4EC 45%, #0FA8CE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 64,
              fontWeight: 700,
            }}
          >
            ↗
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 84, fontWeight: 800, color: '#FFFFFF', letterSpacing: -3 }}>
              onilusion
            </div>
            <div style={{ fontSize: 28, color: '#35C4E4', letterSpacing: 6, textTransform: 'uppercase' }}>
              Soluciones tecnológicas
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, fontSize: 30, color: '#C5CCDB', display: 'flex' }}>
          Consultoría IT · Ciberseguridad · Cloud · Desarrollo — Madrid · España
        </div>
      </div>
    ),
    size
  );
}
