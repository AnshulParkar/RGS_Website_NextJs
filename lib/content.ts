export type Category = {
  id: string
  name: string
  slug: string
  description: string
  imageUrl?: string | null
  sortOrder: number
}

export type Service = {
  id: string
  name: string
  slug: string
  excerpt: string
  description: string
  categorySlug: string
  imageUrl?: string | null
  features: string[]
  sortOrder: number
  published: boolean
}

export type Project = {
  id: string
  name: string
  slug: string
  excerpt: string
  description: string
  location: string
  completedAt?: string | null
  categorySlug: string
  serviceSlugs: string[]
  imageUrl?: string | null
  gallery: string[]
  videoUrl?: string | null
  videos: string[]
  featured: boolean
  sortOrder: number
  published: boolean
}

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string | null
  publishedAt?: string | null
  sortOrder: number
  published: boolean
}

export type Testimonial = {
  id: string
  name: string
  role: string
  location: string
  project: string
  quote: string
  rating: number
  sortOrder: number
  published: boolean
}

export const fallbackTestimonials: Testimonial[] = [
  { id: "garg", name: "Architect Mr. Garg", role: "Architect", location: "Navi Mumbai", project: "ACP Facade & Glass Work", rating: 5, sortOrder: 1, published: true,
    quote: "RoopGlass successfully executed ACP facade and glass work for our Navi Mumbai Maha Nagar Palika projects. Highly professional and reliable!" },
  { id: "agrawal", name: "R.K. Agrawal", role: "Admin Head", location: "Gorai, Mumbai", project: "Tourist Attraction & Meditation Center", rating: 5, sortOrder: 2, published: true,
    quote: "RoopGlass delivered exceptional interior glass work for the Global Pagoda Vipassana Gallery. Truly enhanced the spiritual ambiance of the space." },
  { id: "metkar", name: "Mr. Uday Metkar", role: "Delta Tect Engineering", location: "Mumbai", project: "Glass Facade", rating: 5, sortOrder: 3, published: true,
    quote: "Glass facade work for high-rise buildings is challenging, but RoopGlass handled it with precision and expertise. The quality and finish exceeded expectations." },
  { id: "mewada", name: "Dilip Mewada & Associates", role: "Owner", location: "Mumbai", project: "Glass Facade Work", rating: 5, sortOrder: 4, published: true,
    quote: "The glass partitions installed by RoopGlass gave our restaurant a modern, open, and welcoming atmosphere. Our customers love the new vibe!" },
]

export const fallbackCategories: Category[] = [
  {
    id: "facade-systems",
    name: "Glass Facade Systems",
    slug: "glass-facade-systems",
    description: "Commercial facade systems for contemporary building exteriors.",
    imageUrl: "/assets/Structural_Glazing.png",
    sortOrder: 1,
  },
  {
    id: "acp-cladding",
    name: "ACP & Aluminium Cladding",
    slug: "acp-aluminium-cladding",
    description: "Commercial ACP and aluminium cladding work for building exteriors.",
    imageUrl: "/assets/Aluminium_Cladding.png",
    sortOrder: 2,
  },
  {
    id: "commercial-glass",
    name: "Commercial Glass Work",
    slug: "commercial-glass-work",
    description: "Glass partitions, walls and specialised glazing for commercial spaces.",
    imageUrl: "/assets/office_glass_partition.jpg",
    sortOrder: 3,
  },
  {
    id: "railings",
    name: "Glass & Structural Railings",
    slug: "glass-structural-railings",
    description: "Glass and structural railing solutions for commercial applications.",
    imageUrl: "/images/glassRailing.png",
    sortOrder: 4,
  },
  {
    id: "roofing-frameworks",
    name: "Roofing & Frameworks",
    slug: "roofing-frameworks",
    description: "Polycarbonate domes and skylights, metal roofing sheets, glass roofing and the MS/SS frameworks that support them.",
    imageUrl: "/assets/Glass_Roofing.png",
    sortOrder: 5,
  },
  {
    id: "slimline-partitions",
    name: "Aluminium Glass Slimline Partitions",
    slug: "aluminium-glass-slimline-partitions",
    description: "Slimline aluminium glass partitions, minimal sliding systems, slim sliding doors and windows, and casement windows and doors.",
    imageUrl: "/assets/slimline/slimline-a38-panoramic.webp",
    sortOrder: 6,
  },
]

export const fallbackServices: Service[] = [
  {
    id: "structural-glazing", name: "Structural Glazing", slug: "structural-glazing",
    categorySlug: "glass-facade-systems", imageUrl: "/assets/Structural_Glazing.png",
    excerpt: "Structural glazing for commercial building facades.",
    description: "Roop Glass Solutions provides structural glazing work for commercial building exteriors. Discuss your building design, required system and site conditions with our team before finalising the scope.",
    features: ["Commercial facade work", "Glass facade systems", "Site-specific scope"], sortOrder: 1, published: true,
  },
  {
    id: "curtain-wall", name: "Curtain Wall System", slug: "curtain-wall-system",
    categorySlug: "glass-facade-systems", imageUrl: "/assets/CurtainWall.png",
    excerpt: "Curtain wall glazing for commercial exteriors.",
    description: "Curtain wall systems are a commercial facade option for buildings that require a glazed exterior. Scope, glass selection and structural requirements are planned for each project.",
    features: ["Commercial exteriors", "Glass infill panels", "Project-specific planning"], sortOrder: 2, published: true,
  },
  {
    id: "unitized-glazing", name: "Unitized Glazing System", slug: "unitized-glazing-system",
    categorySlug: "glass-facade-systems", imageUrl: "/assets/unitizedsystem.png",
    excerpt: "Unitized glazing systems for applicable commercial facade projects.",
    description: "Unitized glazing uses prefabricated facade units and is assessed according to each commercial project’s design and installation requirements.",
    features: ["Prefabricated units", "Commercial projects", "Facade coordination"], sortOrder: 3, published: true,
  },
  {
    id: "acp-cladding", name: "ACP & Aluminium Cladding", slug: "acp-aluminium-cladding",
    categorySlug: "acp-aluminium-cladding", imageUrl: "/assets/Aluminium_Cladding.png",
    excerpt: "ACP and aluminium cladding work for commercial facades.",
    description: "Roop Glass Solutions undertakes ACP and aluminium cladding work for commercial buildings. The appropriate panel, finish and installation scope depend on the project requirements.",
    features: ["Commercial cladding", "ACP facade work", "Project-specific finishes"], sortOrder: 4, published: true,
  },
  {
    id: "glass-partition", name: "Commercial Glass Partitions", slug: "commercial-glass-partitions",
    categorySlug: "commercial-glass-work", imageUrl: "/assets/office_glass_partition.jpg",
    excerpt: "Glass partitions and walls for commercial interiors.",
    description: "Glass partitions help divide commercial interiors while retaining light and visual openness. We can discuss fixed, sliding and other suitable configurations for your site.",
    features: ["Commercial interiors", "Glass walls", "Fixed and sliding options"], sortOrder: 5, published: true,
  },
  {
    id: "frameless-glazing", name: "Frameless Glazing", slug: "frameless-glazing",
    categorySlug: "commercial-glass-work", imageUrl: "/assets/Frameless_Glazing.png",
    excerpt: "Frameless glass work for selected commercial applications.",
    description: "Frameless glazing provides a minimal glass finish for suitable commercial spaces. The final system depends on safety, access and project requirements.",
    features: ["Glass walls", "Commercial applications", "Custom scope"], sortOrder: 6, published: true,
  },
  {
    id: "glass-railing", name: "Glass Railing", slug: "glass-railing",
    categorySlug: "glass-structural-railings", imageUrl: "/images/glassRailing.png",
    excerpt: "Glass railing work for appropriate commercial sites.",
    description: "Glass railing systems can be planned for commercial areas where the project requirements support their use. Contact us to discuss the location and required finish.",
    features: ["Commercial sites", "Glass railing", "Project consultation"], sortOrder: 7, published: true,
  },
  {
    id: "metal-framework", name: "MS & SS Framework", slug: "ms-ss-framework",
    categorySlug: "roofing-frameworks", imageUrl: "/assets/MS&SSframeWorks.png",
    excerpt: "Mild steel and stainless steel framework for project requirements.",
    description: "MS and SS framework work supports selected glass, facade and roofing projects. Requirements are reviewed with the project team before work begins.",
    features: ["MS framework", "SS framework", "Commercial project support"], sortOrder: 8, published: true,
  },
  {
    id: "polycarbonate-domes", name: "Polycarbonate Domes & Skylights", slug: "polycarbonate-domes-skylights",
    categorySlug: "roofing-frameworks", imageUrl: "/assets/projects/arh-airoli/arh-skylight-dome.jpg",
    excerpt: "Architectural skylight domes and polycarbonate roofing that bring daylight into atriums, lobbies and walkways.",
    description: "Roop Glass Solutions fabricates and installs architectural skylight domes and polycarbonate roofing for institutional and commercial buildings, including the skylight dome at the Association for Research in Homoeopathy (ARH), Airoli. Dome geometry, sheet type and the supporting framework are planned for each building.",
    features: ["Skylight domes", "Polycarbonate roofing", "Atrium and lobby daylighting", "Supporting MS/SS framework"], sortOrder: 9, published: true,
  },
  {
    id: "metal-roofing", name: "Metal Roofing Sheets", slug: "metal-roofing-sheets",
    categorySlug: "roofing-frameworks", imageUrl: "/assets/Metal_Roofing.png",
    excerpt: "Commercial metal roofing sheets installed on steel frameworks for sheds, canopies and buildings.",
    description: "Metal roofing sheets are installed on fabricated steel frameworks for commercial sheds, canopies, terraces and building roofs. Sheet profile, fixing details and the framework are reviewed with the project team for each site.",
    features: ["Commercial metal roofing", "Steel roof frameworks", "Sheds and canopies", "Site-specific detailing"], sortOrder: 10, published: true,
  },
  {
    id: "glass-roofing", name: "Glass Roofing & Canopies", slug: "glass-roofing-canopies",
    categorySlug: "roofing-frameworks", imageUrl: "/assets/Glass_Roofing.png",
    excerpt: "Glass roofs, entrance canopies and overhead protective frames for commercial buildings.",
    description: "Glass roofing and entrance canopies provide weather protection while keeping spaces bright. Roop Glass Solutions plans the glass, supporting structure and fixing system for each canopy or overhead frame.",
    features: ["Entrance canopies", "Glass roofs", "Overhead protective frames", "Toughened and laminated glass"], sortOrder: 11, published: true,
  },
  {
    id: "dry-stone-cladding", name: "Dry Stone Cladding", slug: "dry-stone-cladding",
    categorySlug: "acp-aluminium-cladding", imageUrl: "/assets/DryStone_Cladding.png",
    excerpt: "Dry-fixed natural stone cladding for commercial and institutional exteriors.",
    description: "Dry stone cladding fixes natural stone panels to a building exterior using a mechanical support system. Stone selection, panel layout and the fixing framework are planned for each facade.",
    features: ["Exterior stone facades", "Mechanical fixing system", "Commercial and institutional buildings"], sortOrder: 12, published: true,
  },
  {
    id: "glass-flooring", name: "Glass Flooring & Walkways", slug: "glass-flooring-walkways",
    categorySlug: "commercial-glass-work", imageUrl: "/assets/curvedglass.png",
    excerpt: "Heavy-duty glass floors, walkways and curved glass panels for feature spaces.",
    description: "Glass flooring, glass walkways and curved glass panels create feature spaces in commercial and public buildings. Load requirements, glass build-up and the supporting structure are assessed for each project.",
    features: ["Glass flooring", "Glass walkways", "Curved glass panels", "Load-specific glass build-up"], sortOrder: 13, published: true,
  },
  {
    id: "slimline-partition", name: "Aluminium Glass Slimline Partition", slug: "aluminium-glass-slimline-partition",
    categorySlug: "aluminium-glass-slimline-partitions", imageUrl: "/assets/slimline/slimline-experience-centre.webp",
    excerpt: "Floor-to-ceiling aluminium glass partitions with 18–20 mm sightlines for offices, cabins, homes and balconies.",
    description: "Aluminium glass slimline partitions divide space without losing light. Slim aluminium profiles hold large glass panels — up to 3.4 m high in the A28 series and 4 m in the A38 — with sightlines as narrow as 18 mm, sliding or fixed panels, hidden tracks and matching slim aluminium doors. Roop Glass Solutions supplies and installs these systems for offices, cabins, residences and balcony enclosures.",
    features: ["18–20 mm sightlines", "Panels up to 4 m high", "Sliding, fixed and door combinations", "Single or double glazing"], sortOrder: 14, published: true,
  },
  {
    id: "slimline-sliding", name: "Minimal Slimline Sliding Systems", slug: "slimline-sliding-systems",
    categorySlug: "aluminium-glass-slimline-partitions", imageUrl: "/assets/slimline/slimline-a38-panoramic.webp",
    excerpt: "A38, A28, A28S and A28C minimal sliding systems for floor-to-ceiling glass with hidden tracks and corner openings.",
    description: "Minimal slimline sliding systems reduce visible aluminium to an 18–20 mm interlock so a glass wall reads as one uninterrupted view. The A38 takes 38 mm double glazing up to 4 m high and 500 kg per shutter; the A28 family accepts 8–28 mm glass up to 3.4 m, with concealed frames (A28S), hidden tracks (A28C) and post-free corner openings.",
    features: ["A38 · A28 · A28S · A28C", "Up to 4,000 mm high", "Hidden track & concealed frame", "Corner opening"], sortOrder: 15, published: true,
  },
  {
    id: "slim-sliding", name: "Slim Aluminium Sliding Doors & Windows", slug: "aluminium-sliding-doors-windows",
    categorySlug: "aluminium-glass-slimline-partitions", imageUrl: "/assets/slimline/slimline-a3500-sliding-door.webp",
    excerpt: "A3500, A3000 and A2200 slim sliding doors and windows for high-rise apartments and residential projects.",
    description: "Slim interlocking aluminium sliding doors and windows for apartments and commercial buildings. The A3500 suits high-wind, high-rise sliding doors up to 2.8 m; the A3000 window offers multipoint flush locking and can combine with a fixed glass railing below; the A2200 budget series is built for cost-controlled housing projects with mosquito-mesh compatibility.",
    features: ["A3500 · A3000 · A2200", "Up to 2,800 mm high", "Multipoint locking", "Window-cum-railing option"], sortOrder: 16, published: true,
  },
  {
    id: "casement", name: "Aluminium Casement Windows & Doors", slug: "aluminium-casement-windows-doors",
    categorySlug: "aluminium-glass-slimline-partitions", imageUrl: "/assets/slimline/slimline-a4000d-door.webp",
    excerpt: "A60 Invisible, A4000 and A4000D casement windows and slim aluminium doors with tilt & turn options.",
    description: "Aluminium casement windows and doors for full ventilation and slim door frames. The A60 Invisible hides its frames in the wall for a minimal look; the A4000 window supports tilt & turn, inward, outward and double-shutter opening; the A4000D door suits cabins, balconies and partition doors up to 2.8 m high.",
    features: ["A60 · A4000 · A4000D", "Tilt & turn", "Concealed-frame casement", "Doors up to 2,800 mm"], sortOrder: 17, published: true,
  },
]

const project = (id: string, name: string, slug: string, location: string, imageUrl: string, completedAt: string, categorySlug = "glass-facade-systems", sortOrder = 0): Project => ({
  id, name, slug, location, imageUrl, completedAt, categorySlug,
  excerpt: `Commercial project in ${location}.`,
  description: `A commercial project completed by Roop Glass Solutions in ${location}. Contact our team to discuss the verified scope of work and similar requirements for your site.`,
  serviceSlugs: categorySlug === "acp-aluminium-cladding" ? ["acp-aluminium-cladding"] : ["structural-glazing"],
  gallery: [imageUrl], videoUrl: null, videos: [], featured: true, sortOrder, published: true,
})

// Owner-stated scope for headline projects; everything else keeps the neutral fallback copy.
const projectOverrides: Record<string, Partial<Project>> = {
  "amanora-mall-pune": {
    excerpt: "Large-scale retail facade and commercial glazing at Amanora Mall, Pune.",
    description: "Roop Glass Solutions delivered large-scale retail facade and commercial glazing solutions at Amanora Mall in Pune. Contact our team to discuss facade and glazing work for retail and mixed-use developments.",
  },
  "income-tax-building": {
    excerpt: "Government institutional glazing contract at the Income Tax Building, Mumbai.",
    description: "Roop Glass Solutions executed a government institutional contract at the Income Tax Building in Mumbai. Contact our team to discuss glazing and facade work for public sector buildings.",
  },
  "nmmc-vashi": {
    excerpt: "Installations at the Navi Mumbai Municipal Corporation (NMMC) premises in Vashi.",
    description: "Roop Glass Solutions completed key installations at the Navi Mumbai Municipal Corporation (NMMC) premises in Vashi, Navi Mumbai. Contact our team to discuss cladding and glazing work for civic buildings.",
  },
  "nmmc-airoli": {
    excerpt: "Installations at the Navi Mumbai Municipal Corporation (NMMC) premises in Airoli.",
    description: "Roop Glass Solutions completed key installations at the Navi Mumbai Municipal Corporation (NMMC) premises in Airoli, Navi Mumbai. Contact our team to discuss cladding and glazing work for civic buildings.",
  },
}

const arhImages = [
  "/assets/projects/arh-airoli/arh-entrance-glass-facade.jpg",
  "/assets/projects/arh-airoli/arh-skylight-dome.jpg",
  "/assets/projects/arh-airoli/arh-building-exterior-airoli.jpg",
  "/assets/projects/arh-airoli/arh-structural-glazing-wall.jpg",
  "/assets/projects/arh-airoli/arh-skylight-dome-underside.jpg",
  "/assets/projects/arh-airoli/arh-glazed-corridor.jpg",
]

export const fallbackProjects: Project[] = [
  {
    id: "arh-airoli",
    name: "Association for Research in Homoeopathy (ARH)",
    slug: "association-for-research-in-homoeopathy-airoli",
    location: "Airoli, Navi Mumbai",
    completedAt: null,
    categorySlug: "glass-facade-systems",
    serviceSlugs: ["structural-glazing", "polycarbonate-domes-skylights", "ms-ss-framework"],
    imageUrl: arhImages[0],
    gallery: arhImages,
    videoUrl: "https://youtu.be/LDPYjVCv57Y",
    videos: ["https://youtube.com/shorts/1aEMBbH4LOo"],
    excerpt: "Glass facade and skylight dome work for the ARH homoeopathy clinic and hospital in Airoli, Navi Mumbai.",
    description:
      "Roop Glass Solutions executed the glass facade and dome work at the Association for Research in Homoeopathy (ARH) – Homoeopathy Clinic & Hospital in Airoli, Navi Mumbai. The work includes the glazed entrance facade carrying the ARH signage, full-height glazing along the internal walkways, and a large circular skylight dome that brings daylight into the central atrium. The project videos walk through the entrance, the glazed corridors and the dome.",
    featured: true,
    sortOrder: 0,
    published: true,
  },
  {
    id: "vipassana-pagoda",
    name: "Global Vipassana Pagoda",
    slug: "global-vipassana-pagoda-gorai",
    location: "Gorai, Mumbai",
    completedAt: null,
    categorySlug: "glass-facade-systems",
    serviceSlugs: ["structural-glazing", "ms-ss-framework"],
    imageUrl: "/assets/Pagoda.png",
    gallery: ["/assets/Pagoda.png"],
    videoUrl: null,
    videos: [],
    excerpt: "Architectural structural and glazing elements at the Global Vipassana Pagoda, Gorai, Mumbai.",
    description:
      "Roop Glass Solutions delivered architectural structural and glazing elements at the Global Vipassana Pagoda in Gorai, Mumbai — one of the city's best-known landmarks. Contact our team to discuss similar work for institutional and public buildings.",
    featured: true,
    sortOrder: 0,
    published: true,
  },
  project("ajl-bandra", "AJL Project", "ajl-project-bandra", "Bandra, Mumbai", "/assets/AJLprojectBandra.png", "2023-11-20", "glass-facade-systems", 1),
  project("magic-square", "Magic Square Malad", "magic-square-malad", "Malad, Mumbai", "/assets/MagicSquareMalad.png", "2024-01-15", "glass-facade-systems", 2),
  project("amanora", "Amanora Mall", "amanora-mall-pune", "Pune", "/assets/AmanoraMallPune.png", "2022-09-10", "glass-facade-systems", 3),
  project("income-tax", "Income Tax Building", "income-tax-building", "Mumbai", "/assets/IncomeTaxBuilding.png", "2023-02-28", "glass-facade-systems", 4),
  project("tania", "Tania Horizon", "tania-horizon-thane", "Thane", "/assets/TaniaHorizon.png", "2024-03-05", "glass-facade-systems", 5),
  project("vvmc", "VVMC", "vvmc", "Vasai-Virar", "/assets/VVMC.png", "2023-05-12", "acp-aluminium-cladding", 6),
  project("mtdc", "MTDC Kharghar", "mtdc-kharghar", "Kharghar, Navi Mumbai", "/assets/MTDCkharghar.png", "2023-08-18", "glass-facade-systems", 7),
  project("nmmc-vashi", "NMMC Vashi", "nmmc-vashi", "Vashi, Navi Mumbai", "/assets/NMMCVashi.png", "2023-04-22", "acp-aluminium-cladding", 8),
  project("nmmc-airoli", "NMMC Airoli", "nmmc-airoli", "Airoli, Navi Mumbai", "/assets/NMMCAiroli.png", "2023-06-15", "acp-aluminium-cladding", 9),
  project("trueearth", "TrueEarth", "trueearth-vikhroli", "Vikhroli, Mumbai", "/assets/TrueEarth.png", "2024-05-01", "glass-facade-systems", 10),
].map((item) => ({ ...item, ...(projectOverrides[item.slug] || {}) }))

