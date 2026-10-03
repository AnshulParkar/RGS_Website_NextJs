-- 2026-10-03: Testimonials managed from the admin and submitted by visitors at /review.
-- Idempotent: creates the table if missing and seeds the original four homepage testimonials
-- only while the table is empty, so admin edits and deletions are never overwritten.

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

drop trigger if exists testimonials_updated_at on testimonials;
create trigger testimonials_updated_at before update on testimonials for each row execute procedure set_updated_at();
alter table testimonials enable row level security;

insert into testimonials (name, role, location, project, quote, rating, source, sort_order, published)
select * from (values
  ('Architect Mr. Garg', 'Architect', 'Navi Mumbai', 'ACP Facade & Glass Work',
   'RoopGlass successfully executed ACP facade and glass work for our Navi Mumbai Maha Nagar Palika projects. Highly professional and reliable!', 5, 'admin', 1, true),
  ('R.K. Agrawal', 'Admin Head', 'Gorai, Mumbai', 'Tourist Attraction & Meditation Center',
   'RoopGlass delivered exceptional interior glass work for the Global Pagoda Vipassana Gallery. Truly enhanced the spiritual ambiance of the space.', 5, 'admin', 2, true),
  ('Mr. Uday Metkar', 'Delta Tect Engineering', 'Mumbai', 'Glass Facade',
   'Glass facade work for high-rise buildings is challenging, but RoopGlass handled it with precision and expertise. The quality and finish exceeded expectations.', 5, 'admin', 3, true),
  ('Dilip Mewada & Associates', 'Owner', 'Mumbai', 'Glass Facade Work',
   'The glass partitions installed by RoopGlass gave our restaurant a modern, open, and welcoming atmosphere. Our customers love the new vibe!', 5, 'admin', 4, true)
) as seed(name, role, location, project, quote, rating, source, sort_order, published)
where not exists (select 1 from testimonials);
