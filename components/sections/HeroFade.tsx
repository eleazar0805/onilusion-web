'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Desvanece y desplaza suavemente el contenido del hero al hacer scroll
 * (parallax ligero solo con transform/opacity, vía requestAnimationFrame).
 * Con prefers-reduced-motion el efecto queda desactivado.
 */
export default function HeroFade({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const fadeEnd = Math.max(el.offsetHeight * 0.85, 400);
      const progress = Math.min(y / fadeEnd, 1);
      el.style.opacity = String(1 - progress * 0.9);
      el.style.transform = `translateY(${Math.round(progress * -48)}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
