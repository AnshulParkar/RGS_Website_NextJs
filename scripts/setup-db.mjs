import { existsSync, readdirSync, readFileSync } from "fs"
import { resolve } from "path"
import pg from "pg"

const { Client } = pg

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error("DATABASE_URL is not set in environment")
  process.exit(1)
}

const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
})

async function run() {
  await client.connect()
  console.log("Connected to PostgreSQL database...")

  const schemaSql = readFileSync(resolve(process.cwd(), "supabase/schema.sql"), "utf-8")
  console.log("Applying schema...")
  await client.query(schemaSql)
  console.log("Schema successfully applied!")

  // Check if categories already exist
  const catCountRes = await client.query("SELECT COUNT(*) FROM categories")
  const catCount = parseInt(catCountRes.rows[0].count, 10)

  if (catCount === 0) {
    console.log("Seeding categories...")
    const categories = [
      { name: "Glass Facade Systems", slug: "glass-facade-systems", description: "Commercial facade systems for contemporary building exteriors.", image_url: "/assets/Structural_Glazing.png", sort_order: 1, published: true },
      { name: "ACP & Aluminium Cladding", slug: "acp-aluminium-cladding", description: "Commercial ACP and aluminium cladding work for building exteriors.", image_url: "/assets/Aluminium_Cladding.png", sort_order: 2, published: true },
      { name: "Commercial Glass Work", slug: "commercial-glass-work", description: "Glass partitions, walls and specialised glazing for commercial spaces.", image_url: "/assets/Frameless_Glazing.png", sort_order: 3, published: true },
      { name: "Glass & Structural Railings", slug: "glass-structural-railings", description: "Glass and structural railing solutions for commercial applications.", image_url: "/images/glassRailing.png", sort_order: 4, published: true },
      { name: "Roofing & Frameworks", slug: "roofing-frameworks", description: "Commercial glass roofing, metal roofing and support framework work.", image_url: "/assets/Glass_Roofing.png", sort_order: 5, published: true },
    ]

    for (const c of categories) {
      await client.query(
        "INSERT INTO categories (name, slug, description, image_url, sort_order, published) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (slug) DO NOTHING",
        [c.name, c.slug, c.description, c.image_url, c.sort_order, c.published]
      )
    }

    console.log("Seeding services...")
    const services = [
      { name: "Structural Glazing", slug: "structural-glazing", category_slug: "glass-facade-systems", image_url: "/assets/Structural_Glazing.png", excerpt: "Structural glazing for commercial building facades.", description: "Roop Glass Solutions provides structural glazing work for commercial building exteriors. Discuss your building design, required system and site conditions with our team before finalising the scope.", features: JSON.stringify(["Commercial facade work", "Glass facade systems", "Site-specific scope"]), published: true },
      { name: "Curtain Wall System", slug: "curtain-wall-system", category_slug: "glass-facade-systems", image_url: "/assets/CurtainWall.png", excerpt: "Curtain wall glazing for commercial exteriors.", description: "Curtain wall systems are a commercial facade option for buildings that require a glazed exterior. Scope, glass selection and structural requirements are planned for each project.", features: JSON.stringify(["Commercial exteriors", "Glass infill panels", "Project-specific planning"]), published: true },
      { name: "Unitized Glazing System", slug: "unitized-glazing-system", category_slug: "glass-facade-systems", image_url: "/assets/unitizedsystem.png", excerpt: "Unitized glazing systems for applicable commercial facade projects.", description: "Unitized glazing uses prefabricated facade units and is assessed according to each commercial project’s design and installation requirements.", features: JSON.stringify(["Prefabricated units", "Commercial projects", "Facade coordination"]), published: true },
      { name: "ACP & Aluminium Cladding", slug: "acp-aluminium-cladding", category_slug: "acp-aluminium-cladding", image_url: "/assets/Aluminium_Cladding.png", excerpt: "ACP and aluminium cladding work for commercial facades.", description: "Roop Glass Solutions undertakes ACP and aluminium cladding work for commercial buildings. The appropriate panel, finish and installation scope depend on the project requirements.", features: JSON.stringify(["Commercial cladding", "ACP facade work", "Project-specific finishes"]), published: true },
      { name: "Commercial Glass Partitions", slug: "commercial-glass-partitions", category_slug: "commercial-glass-work", image_url: "/images/glassPartition.png", excerpt: "Glass partitions and walls for commercial interiors.", description: "Glass partitions help divide commercial interiors while retaining light and visual openness. We can discuss fixed, sliding and other suitable configurations for your site.", features: JSON.stringify(["Commercial interiors", "Glass walls", "Fixed and sliding options"]), published: true },
      { name: "Frameless Glazing", slug: "frameless-glazing", category_slug: "commercial-glass-work", image_url: "/assets/Frameless_Glazing.png", excerpt: "Frameless glass work for selected commercial applications.", description: "Frameless glazing provides a minimal glass finish for suitable commercial spaces. The final system depends on safety, access and project requirements.", features: JSON.stringify(["Glass walls", "Commercial applications", "Custom scope"]), published: true },
      { name: "Glass Railing", slug: "glass-railing", category_slug: "glass-structural-railings", image_url: "/images/glassRailing.png", excerpt: "Glass railing work for appropriate commercial sites.", description: "Glass railing systems can be planned for commercial areas where the project requirements support their use. Contact us to discuss the location and required finish.", features: JSON.stringify(["Commercial sites", "Glass railing", "Project consultation"]), published: true },
      { name: "MS & SS Framework", slug: "ms-ss-framework", category_slug: "roofing-frameworks", image_url: "/assets/MS&SSframeWorks.png", excerpt: "Mild steel and stainless steel framework for project requirements.", description: "MS and SS framework work supports selected glass, facade and roofing projects. Requirements are reviewed with the project team before work begins.", features: JSON.stringify(["MS framework", "SS framework", "Commercial project support"]), published: true },
    ]

    for (const s of services) {
      await client.query(
        "INSERT INTO services (name, slug, category_slug, excerpt, description, image_url, features, published) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (slug) DO NOTHING",
        [s.name, s.slug, s.category_slug, s.excerpt, s.description, s.image_url, s.features, s.published]
      )
    }

    console.log("Seeding projects...")
    const projects = [
      { name: "Magic Square Malad", slug: "magic-square-malad", location: "Malad, Mumbai", image_url: "/assets/MagicSquareMalad.png", completed_at: "2024-01-15", category_slug: "glass-facade-systems", service_slugs: JSON.stringify(["structural-glazing"]), gallery: JSON.stringify(["/assets/MagicSquareMalad.png"]), videos: JSON.stringify([]), featured: true, published: true },
      { name: "AJL Project", slug: "ajl-project-bandra", location: "Bandra, Mumbai", image_url: "/assets/AJLprojectBandra.png", completed_at: "2023-11-20", category_slug: "glass-facade-systems", service_slugs: JSON.stringify(["structural-glazing"]), gallery: JSON.stringify(["/assets/AJLprojectBandra.png"]), videos: JSON.stringify([]), featured: true, published: true },
      { name: "Amanora Mall", slug: "amanora-mall-pune", location: "Pune", image_url: "/assets/AmanoraMallPune.png", completed_at: "2022-09-10", category_slug: "glass-facade-systems", service_slugs: JSON.stringify(["structural-glazing"]), gallery: JSON.stringify(["/assets/AmanoraMallPune.png"]), videos: JSON.stringify([]), featured: true, published: true },
      { name: "Income Tax Building", slug: "income-tax-building", location: "Mumbai", image_url: "/assets/IncomeTaxBuilding.png", completed_at: "2023-02-28", category_slug: "glass-facade-systems", service_slugs: JSON.stringify(["structural-glazing"]), gallery: JSON.stringify(["/assets/IncomeTaxBuilding.png"]), videos: JSON.stringify([]), featured: true, published: true },
      { name: "Tania Horizon", slug: "tania-horizon-thane", location: "Thane", image_url: "/assets/TaniaHorizon.png", completed_at: "2024-03-05", category_slug: "glass-facade-systems", service_slugs: JSON.stringify(["structural-glazing"]), gallery: JSON.stringify(["/assets/TaniaHorizon.png"]), videos: JSON.stringify([]), featured: true, published: true },
      { name: "VVMC", slug: "vvmc", location: "Vasai-Virar", image_url: "/assets/VVMC.png", completed_at: "2023-05-12", category_slug: "acp-aluminium-cladding", service_slugs: JSON.stringify(["acp-aluminium-cladding"]), gallery: JSON.stringify(["/assets/VVMC.png"]), videos: JSON.stringify([]), featured: true, published: true },
      { name: "MTDC Kharghar", slug: "mtdc-kharghar", location: "Kharghar, Navi Mumbai", image_url: "/assets/MTDCkharghar.png", completed_at: "2023-08-18", category_slug: "glass-facade-systems", service_slugs: JSON.stringify(["structural-glazing"]), gallery: JSON.stringify(["/assets/MTDCkharghar.png"]), videos: JSON.stringify([]), featured: true, published: true },
      { name: "NMMC Vashi", slug: "nmmc-vashi", location: "Vashi, Navi Mumbai", image_url: "/assets/NMMCVashi.png", completed_at: "2023-04-22", category_slug: "acp-aluminium-cladding", service_slugs: JSON.stringify(["acp-aluminium-cladding"]), gallery: JSON.stringify(["/assets/NMMCVashi.png"]), videos: JSON.stringify([]), featured: true, published: true },
      { name: "NMMC Airoli", slug: "nmmc-airoli", location: "Airoli, Navi Mumbai", image_url: "/assets/NMMCAiroli.png", completed_at: "2023-06-15", category_slug: "acp-aluminium-cladding", service_slugs: JSON.stringify(["acp-aluminium-cladding"]), gallery: JSON.stringify(["/assets/NMMCAiroli.png"]), videos: JSON.stringify([]), featured: true, published: true },
      { name: "TrueEarth", slug: "trueearth-vikhroli", location: "Vikhroli, Mumbai", image_url: "/assets/TrueEarth.png", completed_at: "2024-05-01", category_slug: "glass-facade-systems", service_slugs: JSON.stringify(["structural-glazing"]), gallery: JSON.stringify(["/assets/TrueEarth.png"]), videos: JSON.stringify([]), featured: true, published: true },
    ]

    for (const p of projects) {
      await client.query(
        `INSERT INTO projects (name, slug, category_slug, excerpt, description, location, completed_at, service_slugs, image_url, gallery, videos, featured, published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (slug) DO NOTHING`,
        [
          p.name, p.slug, p.category_slug,
          `Commercial project in ${p.location}.`,
          `A commercial project completed by Roop Glass Solutions in ${p.location}. Contact our team to discuss the verified scope of work and similar requirements for your site.`,
          p.location, p.completed_at, p.service_slugs, p.image_url, p.gallery, p.videos, p.featured, p.published
        ]
      )
    }

    console.log("Seeding sample post...")
    await client.query(
      `INSERT INTO posts (title, slug, excerpt, content, cover_image, published_at, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (slug) DO NOTHING`,
      [
        "Key Considerations for Commercial Glass Facade Engineering in India",
        "key-considerations-commercial-glass-facade-india",
        "An overview of wind load, thermal insulation, structural sealant performance, and safety glazing standards for commercial high-rises.",
        `Commercial building facades in Indian metropolitan centers encounter rigorous environmental demands — ranging from heavy monsoon precipitation and high wind loads to intense solar radiation and urban noise pollution.

Selecting the right glass facade system requires careful evaluation of structural glazing tape vs. silicone sealants, double-glazed unit (DGU) thermal values (U-value and SHGC), acoustic insulation ratings, and adherence to the National Building Code (NBC) safety glass specifications.

Roop Glass Solutions works alongside architects, structural consultants, and project engineers across Mumbai, Thane, Navi Mumbai, and Pune to ensure precision detailing, anchoring durability, and site-verified execution.`,
        "/assets/Structural_Glazing.png",
        new Date().toISOString(),
        true
      ]
    )
    console.log("Seeding completed successfully!")
  } else {
    console.log(`Database already has ${catCount} categories. Skipping seed to prevent overwrite.`)
  }

  // Idempotent content migrations (insert-if-missing only; never overwrite admin edits).
  const migrationsDir = resolve(process.cwd(), "supabase/migrations")
  if (existsSync(migrationsDir)) {
    for (const file of readdirSync(migrationsDir).filter((name) => name.endsWith(".sql")).sort()) {
      console.log(`Applying content migration ${file}...`)
      await client.query(readFileSync(resolve(migrationsDir, file), "utf-8"))
    }
  }

  await client.end()
  console.log("Migration and database setup finished!")
}

run().catch((err) => {
  console.error("Migration failed:", err)
  client.end()
  process.exit(1)
})
