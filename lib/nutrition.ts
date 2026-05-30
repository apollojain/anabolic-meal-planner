type Sex = "male" | "female";
type Goal = "lose" | "maintain" | "gain";
type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very_active"
  | "athlete";

export function calculateNutritionTargets(input: {
  age: number;
  heightCm: number;
  weightKg: number;
  sex: Sex;
  goal: Goal;
  activityLevel: ActivityLevel;
}) {
  const bmr =
    input.sex === "male"
      ? 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age + 5
      : 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age - 161;

  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725,
    athlete: 1.9,
  }[input.activityLevel];

  const tdee = bmr * activityMultiplier;

  const dailyCalories =
    input.goal === "lose"
      ? tdee - 400
      : input.goal === "gain"
        ? tdee + 300
        : tdee;

  const proteinG = Math.round(input.weightKg * 2.0);

  const fatG = Math.round((dailyCalories * 0.25) / 9);

  const carbsG = Math.round(
    (dailyCalories - proteinG * 4 - fatG * 9) / 4
  );

  return {
    dailyCalories: Math.round(dailyCalories),
    dailyProteinG: proteinG,
    dailyCarbsG: Math.max(carbsG, 0),
    dailyFatG: fatG,
  };
}