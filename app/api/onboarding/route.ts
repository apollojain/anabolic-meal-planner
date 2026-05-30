import { onboardingApiSchema } from "@/lib/schemas/onboarding";
import { calculateNutritionTargets } from "@/lib/nutrition";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = onboardingApiSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        error: "Invalid onboarding payload",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const input = parsed.data;

  const { data, error } = await supabaseAdmin
    .from("user_profiles")
    .insert({
      // temporary fake ID until auth exists
      id: input.userId,

      age: input.age,
      height_cm: input.heightCm,
      weight_kg: input.weightKg,
      sex: input.sex,
      goal: input.goal,
      activity_level: input.activityLevel,
      meals_per_day: input.mealsPerDay,
    })
    .select()
    .single();

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  const targets = calculateNutritionTargets(input);

  return Response.json({
    success: true,
    profile: data,
    targets,
  });
}
