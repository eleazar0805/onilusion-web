import PageHero from './PageHero';
import styles from './LegalPage.module.css';

type LegalSection = { h: string; p: string };

type LegalPageProps = {
  title: string;
  subtitle?: string;
  sections: LegalSection[];
  /** Bloque opcional de datos identificativos (aviso legal). */
  companyData?: { label: string; value: string }[];
  companyDataTitle?: string;
};

export default function LegalPage({
  title,
  subtitle,
  sections,
  companyData,
  companyDataTitle,
}: LegalPageProps) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} />
      <section className={`section ${styles.legal}`}>
        <div className="container">
          <div className={styles.content}>
            {companyData && (
              <div className={styles.companyCard}>
                {companyDataTitle && <h2 className={styles.sectionTitle}>{companyDataTitle}</h2>}
                <dl className={styles.dataList}>
                  {companyData.map((row) => (
                    <div key={row.label} className={styles.dataRow}>
                      <dt className={styles.dataLabel}>{row.label}</dt>
                      <dd className={styles.dataValue}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {sections.map((section) => (
              <div key={section.h} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.h}</h2>
                <p className={styles.sectionText}>{section.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
