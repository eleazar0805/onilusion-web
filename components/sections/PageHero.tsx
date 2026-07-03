import styles from './PageHero.module.css';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export default function PageHero({ title, subtitle, eyebrow }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
