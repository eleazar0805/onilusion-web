import { z } from 'zod';

/** Esquema compartido cliente/servidor para el formulario de contacto. */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  email: z.string().trim().email().max(200),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+\d\s().-]*$/)
    .optional()
    .or(z.literal('')),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(4000),
  privacy: z.literal(true),
  // Honeypot: debe llegar vacío. Los bots suelen rellenarlo.
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactData = z.infer<typeof contactSchema>;
