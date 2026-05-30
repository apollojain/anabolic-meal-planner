// lib/schemas/signup.ts
import { z } from "zod";

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupInput = z.input<typeof signupSchema>;
export type SignupOutput = z.output<typeof signupSchema>;
