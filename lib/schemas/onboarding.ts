import { z } from "zod";

export const onboardingSchema = z.object({
  age: z.coerce.number().int().min(13).max(100),

  heightCm: z.coerce.number().int().min(120).max(230),

  weightKg: z.coerce.number().min(35).max(250),

  sex: z.enum(["male", "female"]),

  goal: z.enum(["lose", "maintain", "gain"]),

  activityLevel: z.enum([
    "sedentary",
    "light",
    "moderate",
    "very_active",
    "athlete",
  ]),

  mealsPerDay: z.coerce.number().int().min(3).max(6),
});

export const onboardingApiSchema = onboardingSchema.extend({
  userId: z.uuid(),
});

export type OnboardingFormInput = z.input<typeof onboardingSchema>;

export type OnboardingFormOutput = z.output<typeof onboardingSchema>;

export type OnboardingApiInput = z.infer<typeof onboardingApiSchema>;
