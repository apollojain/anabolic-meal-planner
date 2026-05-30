export default async function OnboardingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Profile saved</h1>

      <div className="border rounded p-4 space-y-2">
        <p>Calories: {params.calories}</p>
        <p>Protein: {params.protein}g</p>
        <p>Carbs: {params.carbs}g</p>
        <p>Fat: {params.fat}g</p>
      </div>
    </main>
  );
}