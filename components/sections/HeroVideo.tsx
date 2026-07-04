'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

/**
 * Vídeo de fondo del hero: autoplay silencioso en bucle con póster de fallback.
 *
 * React no serializa el atributo `muted` en el HTML inicial, así que
 * navegadores estrictos (Brave, modos de ahorro en móvil) ven un vídeo
 * "con sonido" y bloquean el autoplay sin reintentarlo. Forzamos muted
 * por JS y reintentamos play(); si aun así se bloquea, queda el póster.
 * Con prefers-reduced-motion el vídeo no se reproduce.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');

    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          /* Autoplay bloqueado por el navegador: se muestra el póster. */
        });
      }
    };

    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.video}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/videos/hero-poster.jpg"
      aria-hidden="true"
      tabIndex={-1}
    >
      {/* WebM (VP9): ~la mitad de peso; los navegadores que no lo soporten usan el mp4 */}
      <source src="/videos/hero.webm" type="video/webm" />
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
