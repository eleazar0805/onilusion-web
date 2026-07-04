'use client';

import { useState, useId } from 'react';
import styles from './Faq.module.css';

type FaqItem = { q: string; a: string };

type FaqAccordionProps = {
  items: FaqItem[];
  /** Nivel de encabezado de las preguntas: h2 en la página FAQ (bajo el H1), h3 en la home (bajo el H2 de sección). */
  headingLevel?: 'h2' | 'h3';
};

export default function FaqAccordion({ items, headingLevel = 'h3' }: FaqAccordionProps) {
  const Heading = headingLevel;
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const headingId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={item.q} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
            {headingLevel === 'h2' ? (
              <h2 className={styles.heading}>
                <button
                  id={headingId}
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={styles.chevron} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
              </h2>
            ) : (
              <h3 className={styles.heading}>
                <button
                  id={headingId}
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className={styles.chevron} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
              </h3>
            )}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className={styles.panel}
              hidden={!isOpen}
            >
              <p className={styles.answer}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
