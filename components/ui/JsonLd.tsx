type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Emite un bloque Schema.org JSON-LD (datos generados en servidor, no del usuario). */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
