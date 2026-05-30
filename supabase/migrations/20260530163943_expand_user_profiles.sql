alter table user_profiles
add column if not exists meals_per_day integer;

alter table user_profiles
add column if not exists dietary_restrictions jsonb default '[]'::jsonb;

alter table user_profiles
add column if not exists excluded_foods jsonb default '[]'::jsonb;