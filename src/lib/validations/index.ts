import { z } from "zod";

import {
  contactBudgets,
  contactServices,
  type ContactBudget,
  type ContactService,
} from "@/data/contact";

function requiredChoice<T extends string>(
  values: readonly T[],
  message: string,
) {
  return z
    .string()
    .min(1, message)
    .refine((value): value is T => values.includes(value as T), { message });
}

const turnstileRequired = Boolean(
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim(),
);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please use a shorter name."),
  email: z
    .string()
    .trim()
    .max(254, "Please enter a valid email.")
    .email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number.")
    .max(32, "Please enter a valid phone number.")
    .refine(
      (value) => {
        const digits = value.replace(/\D/g, "").length;
        return digits >= 8 && digits <= 15;
      },
      { message: "Please enter a valid phone number." },
    ),
  company: z
    .string()
    .trim()
    .max(120, "Please use a shorter company name.")
    .optional(),
  service: requiredChoice<ContactService>(
    contactServices,
    "Please choose a service.",
  ),
  budget: requiredChoice<ContactBudget>(
    contactBudgets,
    "Please choose a budget range.",
  ),
  details: z
    .string()
    .trim()
    .min(10, "Please share a bit more about your project.")
    .max(2000, "Please keep this under 2,000 characters."),
  website: z.string().max(200).optional(),
  startedAt: z.number().int().positive(),
  turnstileToken: turnstileRequired
    ? z.string().min(1, "Please complete the verification.").max(4096)
    : z.string().max(4096).optional(),
});

export type ContactValues = z.input<typeof contactSchema>;
export type ContactPayload = Omit<
  z.output<typeof contactSchema>,
  "website" | "startedAt" | "turnstileToken"
>;
