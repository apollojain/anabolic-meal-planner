"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  onboardingSchema,
  type OnboardingFormInput,
} from "@/lib/schemas/onboarding";

export default function OnboardingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormInput>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      sex: "male",
      goal: "maintain",
      activityLevel: "moderate",
      mealsPerDay: 4,
    },
  });

  async function onSubmit(values: OnboardingFormInput) {
    console.log(values);

    // later:
    // await fetch("/api/profile", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Build your meal plan</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label>Age</label>
          <input
            type="number"
            {...register("age")}
            className="w-full border rounded p-2"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div>
          <label>Height cm</label>
          <input
            type="number"
            {...register("heightCm")}
            className="w-full border rounded p-2"
          />
          {errors.heightCm && (
            <p className="text-red-500">{errors.heightCm.message}</p>
          )}
        </div>

        <div>
          <label>Weight kg</label>
          <input
            type="number"
            {...register("weightKg")}
            className="w-full border rounded p-2"
          />
          {errors.weightKg && (
            <p className="text-red-500">{errors.weightKg.message}</p>
          )}
        </div>

        <div>
          <label>Sex</label>
          <select {...register("sex")} className="w-full border rounded p-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex && <p className="text-red-500">{errors.sex.message}</p>}
        </div>

        <div>
          <label>Goal</label>
          <select {...register("goal")} className="w-full border rounded p-2">
            <option value="lose">Lose fat</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Gain muscle</option>
          </select>
          {errors.goal && <p className="text-red-500">{errors.goal.message}</p>}
        </div>

        <div>
          <label>Activity Level</label>
          <select
            {...register("activityLevel")}
            className="w-full border rounded p-2"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly active</option>
            <option value="moderate">Moderately active</option>
            <option value="very_active">Very active</option>
            <option value="athlete">Athlete</option>
          </select>
          {errors.activityLevel && (
            <p className="text-red-500">{errors.activityLevel.message}</p>
          )}
        </div>

        <div>
          <label>Meals per day</label>
          <input
            type="number"
            {...register("mealsPerDay")}
            className="w-full border rounded p-2"
          />
          {errors.mealsPerDay && (
            <p className="text-red-500">{errors.mealsPerDay.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-black text-white rounded p-3"
        >
          {isSubmitting ? "Saving..." : "Continue"}
        </button>
      </form>
    </main>
  );
}