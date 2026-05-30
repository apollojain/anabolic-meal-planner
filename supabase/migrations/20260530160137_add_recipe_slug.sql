alter table recipes
add column slug text;

update recipes
set slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'))
where slug is null;

alter table recipes
alter column slug set not null;

alter table recipes
add constraint recipes_slug_unique unique (slug);