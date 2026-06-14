import { z } from "zod";

export const PRACTICE_SIZES = ["Growth (1–3 GPs)", "Scale (4–8 GPs)", "Enterprise (8+ GPs)"] as const;

export const demoSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  practice: z.string().min(2, "Please enter your Practice name."),
  size: z.enum(PRACTICE_SIZES, { message: "Please select your Practice size." }),
  phone: z.string().optional(),
  message: z.string().max(2000).optional(),
});

export type DemoFormValues = z.infer<typeof demoSchema>;
