import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/contact-schema';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

/* Rate limit sencillo en memoria: 5 envíos por IP cada 15 minutos.
   Para producción tras Cloudflare, complementarlo con reglas WAF. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; start: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/** Neutraliza saltos de línea en campos de cabecera para evitar header injection. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_data' }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot relleno → respondemos OK sin procesar para no dar pistas al bot.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const smtpHost = process.env.SMTP_HOST;

  if (!smtpHost) {
    // SMTP sin configurar (entorno de desarrollo): registramos y confirmamos.
    console.info('[contacto] Solicitud recibida (SMTP no configurado):', {
      name: data.name,
      email: data.email,
      service: data.service,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? `Web Onilusion <no-reply@onilusion.com>`,
      to: process.env.CONTACT_TO ?? site.email,
      replyTo: singleLine(data.email),
      subject: `[Web] Solicitud de ${singleLine(data.name)} — ${singleLine(data.service)}`,
      text: [
        `Nombre: ${data.name}`,
        `Empresa: ${data.company || '—'}`,
        `Email: ${data.email}`,
        `Teléfono: ${data.phone || '—'}`,
        `Servicio: ${data.service}`,
        '',
        'Mensaje:',
        data.message,
      ].join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contacto] Error enviando email:', error);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
}
