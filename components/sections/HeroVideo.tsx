'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

/**
 * Vídeo del hero: autoplay silencioso en bucle.
 * Si el usuario prefiere movimiento reducido, se detiene en el primer frame.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
    }
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
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
