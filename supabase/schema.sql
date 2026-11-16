create table if not exists public.products (
  id integer primary key,
  category text not null check (category in ('tenis', 'camisas', 'esporte', 'outros')),
  name text not null,
  description text not null,
  price_pix_cents integer check (price_pix_cents is null or price_pix_cents >= 0),
  price_card_cents integer check (price_card_cents is null or price_card_cents >= 0),
  illustrative boolean not null default false,
  is_active boolean not null default true
);

create table if not exists public.product_images (
  product_id integer not null references public.products (id) on delete cascade,
  position integer not null check (position >= 0),
  url text not null,
  primary key (product_id, position)
);

alter table public.products enable row level security;
alter table public.product_images enable row level security;

grant usage on schema public to anon, authenticated, service_role;
grant select on public.products, public.product_images to anon, authenticated;
grant all on public.products, public.product_images to service_role;

drop policy if exists "Anyone can read active products" on public.products;
create policy "Anyone can read active products"
  on public.products for select
  to anon, authenticated
  using (is_active);

drop policy if exists "Anyone can read images of active products" on public.product_images;
create policy "Anyone can read images of active products"
  on public.product_images for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.products
      where products.id = product_images.product_id
        and products.is_active
    )
  );
