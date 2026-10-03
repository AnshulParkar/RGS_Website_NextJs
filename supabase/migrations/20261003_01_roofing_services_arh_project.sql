-- 2026-10-03: Roofing services, extra capability services, ARH Airoli + Global Vipassana Pagoda projects.
-- Idempotent: inserts only rows whose slug does not exist yet; never overwrites admin edits.
-- Safe to run in the Supabase SQL editor or via `npm run db:setup`.

insert into categories (name, slug, description, image_url, sort_order, published)
values ('Roofing & Frameworks', 'roofing-frameworks', 'Polycarbonate domes and skylights, metal roofing sheets, glass roofing and the MS/SS frameworks that support them.', '/assets/Glass_Roofing.png', 5, true)
on conflict (slug) do nothing;

insert into services (name, slug, category_slug, excerpt, description, image_url, features, sort_order, published) values
('Polycarbonate Domes & Skylights', 'polycarbonate-domes-skylights', 'roofing-frameworks',
 'Architectural skylight domes and polycarbonate roofing that bring daylight into atriums, lobbies and walkways.',
 'Roop Glass Solutions fabricates and installs architectural skylight domes and polycarbonate roofing for institutional and commercial buildings, including the skylight dome at the Association for Research in Homoeopathy (ARH), Airoli. Dome geometry, sheet type and the supporting framework are planned for each building.',
 '/assets/projects/arh-airoli/arh-skylight-dome.jpg', '["Skylight domes", "Polycarbonate roofing", "Atrium and lobby daylighting", "Supporting MS/SS framework"]'::jsonb, 9, true),
('Metal Roofing Sheets', 'metal-roofing-sheets', 'roofing-frameworks',
 'Commercial metal roofing sheets installed on steel frameworks for sheds, canopies and buildings.',
 'Metal roofing sheets are installed on fabricated steel frameworks for commercial sheds, canopies, terraces and building roofs. Sheet profile, fixing details and the framework are reviewed with the project team for each site.',
 '/assets/Metal_Roofing.png', '["Commercial metal roofing", "Steel roof frameworks", "Sheds and canopies", "Site-specific detailing"]'::jsonb, 10, true),
('Glass Roofing & Canopies', 'glass-roofing-canopies', 'roofing-frameworks',
 'Glass roofs, entrance canopies and overhead protective frames for commercial buildings.',
 'Glass roofing and entrance canopies provide weather protection while keeping spaces bright. Roop Glass Solutions plans the glass, supporting structure and fixing system for each canopy or overhead frame.',
 '/assets/Glass_Roofing.png', '["Entrance canopies", "Glass roofs", "Overhead protective frames", "Toughened and laminated glass"]'::jsonb, 11, true),
('Dry Stone Cladding', 'dry-stone-cladding', 'acp-aluminium-cladding',
 'Dry-fixed natural stone cladding for commercial and institutional exteriors.',
 'Dry stone cladding fixes natural stone panels to a building exterior using a mechanical support system. Stone selection, panel layout and the fixing framework are planned for each facade.',
 '/assets/DryStone_Cladding.png', '["Exterior stone facades", "Mechanical fixing system", "Commercial and institutional buildings"]'::jsonb, 12, true),
('Glass Flooring & Walkways', 'glass-flooring-walkways', 'commercial-glass-work',
 'Heavy-duty glass floors, walkways and curved glass panels for feature spaces.',
 'Glass flooring, glass walkways and curved glass panels create feature spaces in commercial and public buildings. Load requirements, glass build-up and the supporting structure are assessed for each project.',
 '/assets/curvedglass.png', '["Glass flooring", "Glass walkways", "Curved glass panels", "Load-specific glass build-up"]'::jsonb, 13, true)
on conflict (slug) do nothing;

insert into projects (name, slug, category_slug, excerpt, description, location, completed_at, service_slugs, image_url, gallery, video_url, videos, featured, sort_order, published) values
('Association for Research in Homoeopathy (ARH)', 'association-for-research-in-homoeopathy-airoli', 'glass-facade-systems',
 'Glass facade and skylight dome work for the ARH homoeopathy clinic and hospital in Airoli, Navi Mumbai.',
 'Roop Glass Solutions executed the glass facade and dome work at the Association for Research in Homoeopathy (ARH) – Homoeopathy Clinic & Hospital in Airoli, Navi Mumbai. The work includes the glazed entrance facade carrying the ARH signage, full-height glazing along the internal walkways, and a large circular skylight dome that brings daylight into the central atrium. The project videos walk through the entrance, the glazed corridors and the dome.',
 'Airoli, Navi Mumbai', null,
 '["structural-glazing", "polycarbonate-domes-skylights", "ms-ss-framework"]'::jsonb,
 '/assets/projects/arh-airoli/arh-entrance-glass-facade.jpg',
 '["/assets/projects/arh-airoli/arh-entrance-glass-facade.jpg", "/assets/projects/arh-airoli/arh-skylight-dome.jpg", "/assets/projects/arh-airoli/arh-building-exterior-airoli.jpg", "/assets/projects/arh-airoli/arh-structural-glazing-wall.jpg", "/assets/projects/arh-airoli/arh-skylight-dome-underside.jpg", "/assets/projects/arh-airoli/arh-glazed-corridor.jpg"]'::jsonb,
 'https://youtu.be/LDPYjVCv57Y', '["https://youtube.com/shorts/1aEMBbH4LOo"]'::jsonb, true, 0, true),
('Global Vipassana Pagoda', 'global-vipassana-pagoda-gorai', 'glass-facade-systems',
 'Architectural structural and glazing elements at the Global Vipassana Pagoda, Gorai, Mumbai.',
 'Roop Glass Solutions delivered architectural structural and glazing elements at the Global Vipassana Pagoda in Gorai, Mumbai — one of the city''s best-known landmarks. Contact our team to discuss similar work for institutional and public buildings.',
 'Gorai, Mumbai', null,
 '["structural-glazing", "ms-ss-framework"]'::jsonb,
 '/assets/Pagoda.png', '["/assets/Pagoda.png"]'::jsonb, null, '[]'::jsonb, true, 0, true)
on conflict (slug) do nothing;
