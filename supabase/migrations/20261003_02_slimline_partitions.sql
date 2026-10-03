-- 2026-10-03: Aluminium glass slimline partitions category + services (from the RGS aluminium catalogue).
-- Idempotent: inserts only rows whose slug does not exist yet; never overwrites admin edits.

insert into categories (name, slug, description, image_url, sort_order, published)
values ('Aluminium Glass Slimline Partitions', 'aluminium-glass-slimline-partitions',
 'Slimline aluminium glass partitions, minimal sliding systems, slim sliding doors and windows, and casement windows and doors.',
 '/assets/slimline/slimline-a38-panoramic.webp', 6, true)
on conflict (slug) do nothing;

insert into services (name, slug, category_slug, excerpt, description, image_url, features, sort_order, published) values
('Aluminium Glass Slimline Partition', 'aluminium-glass-slimline-partition', 'aluminium-glass-slimline-partitions',
 $rgs$Floor-to-ceiling aluminium glass partitions with 18–20 mm sightlines for offices, cabins, homes and balconies.$rgs$,
 $rgs$Aluminium glass slimline partitions divide space without losing light. Slim aluminium profiles hold large glass panels — up to 3.4 m high in the A28 series and 4 m in the A38 — with sightlines as narrow as 18 mm, sliding or fixed panels, hidden tracks and matching slim aluminium doors. Roop Glass Solutions supplies and installs these systems for offices, cabins, residences and balcony enclosures.$rgs$,
 '/assets/slimline/slimline-experience-centre.webp', '["18–20 mm sightlines", "Panels up to 4 m high", "Sliding, fixed and door combinations", "Single or double glazing"]'::jsonb, 14, true),
('Minimal Slimline Sliding Systems', 'slimline-sliding-systems', 'aluminium-glass-slimline-partitions',
 $rgs$A38, A28, A28S and A28C minimal sliding systems for floor-to-ceiling glass with hidden tracks and corner openings.$rgs$,
 $rgs$Minimal slimline sliding systems reduce visible aluminium to an 18–20 mm interlock so a glass wall reads as one uninterrupted view. The A38 takes 38 mm double glazing up to 4 m high and 500 kg per shutter; the A28 family accepts 8–28 mm glass up to 3.4 m, with concealed frames (A28S), hidden tracks (A28C) and post-free corner openings.$rgs$,
 '/assets/slimline/slimline-a38-panoramic.webp', '["A38 · A28 · A28S · A28C", "Up to 4,000 mm high", "Hidden track & concealed frame", "Corner opening"]'::jsonb, 15, true),
('Slim Aluminium Sliding Doors & Windows', 'aluminium-sliding-doors-windows', 'aluminium-glass-slimline-partitions',
 $rgs$A3500, A3000 and A2200 slim sliding doors and windows for high-rise apartments and residential projects.$rgs$,
 $rgs$Slim interlocking aluminium sliding doors and windows for apartments and commercial buildings. The A3500 suits high-wind, high-rise sliding doors up to 2.8 m; the A3000 window offers multipoint flush locking and can combine with a fixed glass railing below; the A2200 budget series is built for cost-controlled housing projects with mosquito-mesh compatibility.$rgs$,
 '/assets/slimline/slimline-a3500-sliding-door.webp', '["A3500 · A3000 · A2200", "Up to 2,800 mm high", "Multipoint locking", "Window-cum-railing option"]'::jsonb, 16, true),
('Aluminium Casement Windows & Doors', 'aluminium-casement-windows-doors', 'aluminium-glass-slimline-partitions',
 $rgs$A60 Invisible, A4000 and A4000D casement windows and slim aluminium doors with tilt & turn options.$rgs$,
 $rgs$Aluminium casement windows and doors for full ventilation and slim door frames. The A60 Invisible hides its frames in the wall for a minimal look; the A4000 window supports tilt & turn, inward, outward and double-shutter opening; the A4000D door suits cabins, balconies and partition doors up to 2.8 m high.$rgs$,
 '/assets/slimline/slimline-a4000d-door.webp', '["A60 · A4000 · A4000D", "Tilt & turn", "Concealed-frame casement", "Doors up to 2,800 mm"]'::jsonb, 17, true)
on conflict (slug) do nothing;
