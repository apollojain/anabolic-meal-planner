import { supabase } from "@/lib/supabase";

export default async function RecipesPage() {
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <pre>{error.message}</pre>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Recipes</h1>

      <div className="space-y-4">
        {recipes?.map((recipe) => (
          <div key={recipe.id} className="border rounded p-4">
            <h2 className="font-semibold">{recipe.title}</h2>
            <p>{recipe.meal_type}</p>
            <p>
              {recipe.calories} cal · {recipe.protein_g}g protein ·{" "}
              {recipe.carbs_g}g carbs · {recipe.fat_g}g fat
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}