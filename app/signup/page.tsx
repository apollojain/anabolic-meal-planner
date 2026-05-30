// app/signup/page.tsx
"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import {
  signupSchema,
  type SignupInput,
  type SignupOutput,
} from "@/lib/schemas/signup";

export default function SignupPage() {
  const router = useRouter();
    
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput, unknown, SignupOutput>({
    resolver: zodResolver(signupSchema),
  });

  

  async function onSubmit(values: SignupOutput) {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  if (error) {
    console.error(error);
    return;
  }

  router.push("/onboarding");
}

  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded p-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border rounded p-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white rounded p-3"
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </main>
  );
}