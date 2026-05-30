-- ==========================================
-- Recipes
-- ==========================================

create table recipes (
    id uuid primary key default gen_random_uuid(),

    title text not null,
    meal_type text not null,

    calories integer not null check (calories >= 0),
    protein_g integer not null check (protein_g >= 0),
    carbs_g integer not null check (carbs_g >= 0),
    fat_g integer not null check (fat_g >= 0),

    ingredients jsonb not null,
    instructions text not null,

    created_at timestamptz not null default now()
);

create index recipes_meal_type_idx
    on recipes(meal_type);


-- ==========================================
-- User Profiles
-- Extends Supabase Auth
-- ==========================================

create table user_profiles (
    id uuid primary key
        references auth.users(id)
        on delete cascade,

    height_cm integer check (height_cm > 0),
    weight_kg integer check (weight_kg > 0),
    age integer check (age > 0),

    sex text,

    activity_level text,

    goal text
        check (goal in ('lose', 'maintain', 'gain')),

    created_at timestamptz not null default now()
);


-- ==========================================
-- Meal Plans
-- ==========================================

create table meal_plans (
    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references user_profiles(id)
        on delete cascade,

    daily_calories integer not null check (daily_calories > 0),
    daily_protein_g integer not null check (daily_protein_g > 0),

    created_at timestamptz not null default now()
);

create index meal_plans_user_id_idx
    on meal_plans(user_id);


-- ==========================================
-- Meal Plan Items
-- One row = one meal
-- ==========================================

create table meal_plan_items (
    id uuid primary key default gen_random_uuid(),

    meal_plan_id uuid not null
        references meal_plans(id)
        on delete cascade,

    day_number integer not null
        check (day_number between 1 and 7),

    meal_type text not null,

    recipe_id uuid not null
        references recipes(id),

    serving_multiplier numeric(5,2)
        not null
        default 1.00,

    created_at timestamptz not null default now()
);

create index meal_plan_items_meal_plan_id_idx
    on meal_plan_items(meal_plan_id);

create index meal_plan_items_recipe_id_idx
    on meal_plan_items(recipe_id);