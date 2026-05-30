insert into recipes (
  slug,
  title,
  meal_type,
  calories,
  protein_g,
  carbs_g,
  fat_g,
  ingredients,
  instructions
)
values
(
  'protein-oatmeal',
  'Protein Oatmeal',
  'breakfast',
  450,
  35,
  45,
  10,
  '["oats", "whey protein", "berries"]'::jsonb,
  'Mix oats, whey, and berries.'
),
(
  'chicken-rice-bowl',
  'Chicken Rice Bowl',
  'lunch',
  650,
  55,
  70,
  15,
  '["chicken breast", "rice", "broccoli"]'::jsonb,
  'Cook chicken, rice, and broccoli. Combine.'
)
on conflict (slug) do update
set
  title = excluded.title,
  meal_type = excluded.meal_type,
  calories = excluded.calories,
  protein_g = excluded.protein_g,
  carbs_g = excluded.carbs_g,
  fat_g = excluded.fat_g,
  ingredients = excluded.ingredients,
  instructions = excluded.instructions;