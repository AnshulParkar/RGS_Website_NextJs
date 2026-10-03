-- Run this once in the Supabase SQL editor before enabling the admin area.
create extension if not exists pgcrypto;

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  image_url text,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category_slug text not null references categories(slug) on update cascade,
  excerpt text not null default '',
  description text not null default '',
  image_url text,
  features jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category_slug text not null references categories(slug) on update cascade,
  excerpt text not null default '',
  description text not null default '',
  location text not null default '',
  completed_at date,
  service_slugs jsonb not null default '[]'::jsonb,
  image_url text,
  gallery jsonb not null default '[]'::jsonb,
  video_url text,
  videos jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  published_at timestamptz,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text,
  phone text,
  project_location text,
  service_interest text,
  message text not null,
  preferred_contact text,
  status text not null default 'new' check (status in ('new', 'responded', 'in_progress', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  location text not null default '',
  project text not null default '',
  quote text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  email text,
  source text not null default 'admin' check (source in ('admin', 'visitor')),
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists categories_updated_at on categories;
drop trigger if exists services_updated_at on services;
drop trigger if exists projects_updated_at on projects;
drop trigger if exists posts_updated_at on posts;
drop trigger if exists inquiries_updated_at on inquiries;
drop trigger if exists testimonials_updated_at on testimonials;
create trigger categories_updated_at before update on categories for each row execute procedure set_updated_at();
create trigger services_updated_at before update on services for each row execute procedure set_updated_at();
create trigger projects_updated_at before update on projects for each row execute procedure set_updated_at();
create trigger posts_updated_at before update on posts for each row execute procedure set_updated_at();
create trigger inquiries_updated_at before update on inquiries for each row execute procedure set_updated_at();
create trigger testimonials_updated_at before update on testimonials for each row execute procedure set_updated_at();

alter table categories enable row level security;
alter table services enable row level security;
alter table projects enable row level security;
alter table posts enable row level security;
alter table inquiries enable row level security;
alter table testimonials enable row level security;

-- The site accesses public data only through server code using the service-role key.
-- Do not add anonymous write policies. Create a public Storage bucket named `media`.

-- Migration: add video columns if they don't exist yet
-- Run this if your projects table was already created without them:
-- ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url text;
-- ALTER TABLE projects ADD COLUMN IF NOT EXISTS videos jsonb NOT NULL DEFAULT '[]'::jsonb;
