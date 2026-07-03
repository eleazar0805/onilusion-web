'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Anima una cifra tipo "+500" o "+1.000" desde 0 al entrar en viewport.
 * Los valores sin dígitos (p. ej. "España") se muestran tal cual.
 * Con prefers-reduced-motion se muestra el valor final directamente.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const digits = value.replace(/[^\d]/g, '');
    if (!digits) return; // sin número: estático
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = parseInt(digits, 10);
    const separator = value.includes('.') ? '.' : value.includes(',') ? ',' : '';
    const prefix = value.match(/^[^\d]*/)?.[0] ?? '';
    const suffix = value.match(/[^\d.,]*$/)?.[0] ?? '';

    const format = (n: number) => {
      let s = String(n);
      if (separator) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return `${prefix}${s}${suffix}`;
    };

    let raf = 0;
    const animate = () => {
      const duration = 1300;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(format(Math.round(target * eased)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    setDisplay(format(0));
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
