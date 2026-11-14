import { z } from 'zod';

export const MODEL_OPTIONS = [
  'Vegetables & Creepers',
  'Small Trees',
  'Need Recommendation',
] as const;

const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer.`)
    .optional()
    .or(z.literal(''));

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(80, 'Please use 80 characters or fewer.'),
  mobile: z
    .string()
    .trim()
    .min(1, 'Please enter your mobile number.')
    .refine(
      (value) => /^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(value.replace(/[\s-]/g, '')),
      'Enter a valid 10-digit Indian mobile number.',
    ),
  email: z
    .string()
    .trim()
    .max(120, 'Please use 120 characters or fewer.')
    .optional()
    .or(z.literal(''))
    .refine((value) => !value || z.string().email().safeParse(value).success, {
      message: 'Enter a valid email address, or leave this blank.',
    }),
  city: z
    .string()
    .trim()
    .min(2, 'Please enter your city or location.')
    .max(80, 'Please use 80 characters or fewer.'),
  model: z.enum(MODEL_OPTIONS).optional().or(z.literal('')),
  terraceArea: optionalText(60, 'Terrace area'),
  message: optionalText(700, 'Message'),
  /** Hidden honeypot field — must stay empty. */
  website: z.string().max(0, 'Spam check failed.').optional().or(z.literal('')),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
