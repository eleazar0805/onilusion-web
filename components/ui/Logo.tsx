import styles from './Logo.module.css';

type LogoProps = {
  variant?: 'dark' | 'light';
  withTagline?: boolean;
  size?: number;
};

/**
 * Marca Onilusion: esfera cian con flecha ascendente + wordmark.
 * Versión vectorial del logo corporativo para renderizado nítido
 * sobre fondos claros y oscuros.
 */
export default function Logo({ variant = 'dark', withTagline = true, size = 34 }: LogoProps) {
  return (
    <span className={styles.logo}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={styles.mark}
      >
        <defs>
          <radialGradient id="onl-sphere" cx="32%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#A9F0FA" />
            <stop offset="45%" stopColor="#4ED4EC" />
            <stop offset="100%" stopColor="#0FA8CE" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill="url(#onl-sphere)" />
        <path
          d="M11 29.5 C12.5 18.5 19 13.5 26.5 12.5"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M22.5 7.5 L33 11.5 L25.5 18.5 Z" fill="#FFFFFF" />
      </svg>
      <span className={styles.text}>
        <span className={`${styles.wordmark} ${variant === 'light' ? styles.wordmarkLight : ''}`}>
          onilusion
        </span>
        {withTagline && <span className={styles.tagline}>Soluciones tecnológicas</span>}
      </span>
    </span>
  );
}
