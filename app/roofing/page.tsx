import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { contentStore } from "@/lib/supabase"
import { company } from "@/lib/company"
import { abs, breadcrumbs, faqSchema, jsonLd, orgId } from "@/lib/schema"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { FaqList } from "@/components/faq-section"

export const dynamic = "force-dynamic"
export const revalidate = 0

const ROOFING = "roofing-frameworks"
const ARH_SLUG = "association-for-research-in-homoeopathy-airoli"

export const metadata: Metadata = {
  title: { absolute: "Roofing Contractor in Mumbai – Domes, Skylights & Metal Roofing | RGS" },
  description: "Polycarbonate domes, skylights, metal roofing sheets, glass canopies and MS/SS roof frameworks — designed, fabricated and installed by Roop Glass Solutions, Mumbai.",
  alternates: { canonical: "/roofing" },
  openGraph: {
    title: "Roofing Systems by Roop Glass Solutions, Mumbai",
    description: "Polycarbonate domes, skylights, metal roofing sheets, glass canopies and roof frameworks for commercial and institutional buildings.",
    url: "/roofing",
    images: [{ url: "/assets/projects/arh-airoli/arh-skylight-dome.jpg", alt: "Skylight dome by Roop Glass Solutions at ARH, Airoli" }],
  },
}

const roofingFaqs = [
  {
    q: "What roofing work does Roop Glass Solutions do?",
    a: "Roop Glass Solutions designs, fabricates and installs polycarbonate domes and skylights, metal roofing sheets, glass roofing and entrance canopies, and the MS/SS frameworks and overhead protective frames that support them, for commercial, public sector and institutional buildings in Mumbai and across Maharashtra.",
  },
  {
    q: "Polycarbonate or glass — which is better for a skylight dome?",
    a: "Polycarbonate is lighter, impact-resistant and easier to form into curved and dome shapes, which keeps the supporting framework lighter. Glass offers higher clarity and scratch resistance but is heavier and needs a stronger frame. The right choice depends on the span, shape, daylight and maintenance needs of the building; we review these with you for each project.",
  },
  {
    q: "Do you also build the steel structure for the roof?",
    a: "Yes. We fabricate and install MS (mild steel) and SS (stainless steel) frameworks for domes, skylights, canopies and metal roofing, so the roofing material and its support structure are delivered by one team.",
  },
  {
    q: "Where have you installed a skylight dome?",
    a: "One recent example is the Association for Research in Homoeopathy (ARH) clinic and hospital in Airoli, Navi Mumbai, where Roop Glass Solutions executed the glass facade and a large circular skylight dome over the central atrium.",
  },
  {
    q: "How do I get a roofing project assessed?",
    a: `Call ${company.phone} (${company.hoursText}) or send your requirement through the Contact page with the site location, roof area or drawings, the roofing type you are considering and your timeline.`,
  },
]

const steps = [
  { title: "Site survey", text: "Measurements, existing structure and access are checked on site." },
  { title: "Design & detailing", text: "Roofing type, sheet or glass build-up, drainage and framework are detailed for the span." },
  { title: "Fabrication", text: "MS/SS frameworks, dome ribs and fixings are fabricated to the approved design." },
  { title: "Installation & handover", text: "Framework erection, sheeting or glazing, sealing and final inspection." },
]

export default async function RoofingPage() {
  const [services, projects] = await Promise.all([contentStore.services(), contentStore.projects()])
  // Roofing products first, supporting frameworks last
  const roofingServices = services
    .filter((service) => service.categorySlug === ROOFING)
    .sort((a, b) => Number(a.slug === "ms-ss-framework") - Number(b.slug === "ms-ss-framework"))
  const arh = projects.find((project) => project.slug === ARH_SLUG)
  const otherRoofingProjects = projects.filter(
    (project) => project.slug !== ARH_SLUG && (project.categorySlug === ROOFING || project.serviceSlugs.some((slug) => roofingServices.some((service) => service.slug === slug)))
  )

  const schema = [
    breadcrumbs([{ name: "Home", path: "/" }, { name: "Roofing", path: "/roofing" }]),
    faqSchema(roofingFaqs),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Roofing systems – polycarbonate domes, skylights and metal roofing",
      serviceType: "Roofing contractor",
      url: abs("/roofing"),
      provider: { "@id": orgId },
      areaServed: company.areaServed,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Roofing services",
        itemListElement: roofingServices.map((service) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.name, url: abs(`/catalog/${service.slug}`) } })),
      },
    },
  ]

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src="/assets/hero/hero-roofing.webp" alt="Glass roofing canopy over a commercial entrance" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-white">
          <p className="text-amber-400 font-semibold uppercase tracking-wider text-sm">Roofing systems</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">Roofing contractor in Mumbai for domes, skylights &amp; metal roofing</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
            {company.name} designs, fabricates and installs polycarbonate domes and skylights, metal roofing sheets, glass canopies and the MS/SS frameworks that carry them — for commercial, public sector and institutional buildings across Mumbai, Navi Mumbai, Thane and Pune.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-4 font-semibold text-slate-950 hover:shadow-xl">Discuss a roofing project <ArrowRight className="h-4 w-4" /></Link>
            <a href={`tel:${company.phoneE164}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-semibold backdrop-blur hover:bg-white/10"><Phone className="h-4 w-4" /> {company.phone}</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight">Roofing services</h2>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">Each roof is detailed for its span, exposure and use. Choose a system to see what it involves.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roofingServices.map((service) => (
            <Link key={service.id} href={`/catalog/${service.slug}`} className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-shadow">
              <img src={service.imageUrl || "/placeholder.jpg"} alt={service.name} loading="lazy" className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="font-semibold text-lg group-hover:text-orange-600">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{service.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured roofing project */}
      {arh && (
        <section className="bg-slate-50 dark:bg-slate-900/60 py-16">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-orange-600 font-semibold uppercase tracking-wider text-sm">Featured roofing project</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Skylight dome at {arh.name}</h2>
              <p className="mt-2 text-slate-500">{arh.location}</p>
              <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">{arh.description}</p>
              <Link href={`/projects/${arh.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 hover:gap-3 transition-all">View the full project <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-4">
              <YouTubeEmbed id="LDPYjVCv57Y" title="Glass facade & dome work by RGS at ARH, Airoli" poster="/assets/projects/arh-airoli/arh-skylight-dome.jpg" />
              <div className="grid grid-cols-2 gap-4">
                <img src="/assets/projects/arh-airoli/arh-skylight-dome-underside.jpg" alt="Underside of the skylight dome at ARH, Airoli" loading="lazy" className="h-40 w-full rounded-xl object-cover" />
                <img src="/assets/projects/arh-airoli/arh-entrance-glass-facade.jpg" alt="Glass entrance facade at ARH, Airoli" loading="lazy" className="h-40 w-full rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight">How a roofing project runs</h2>
        <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <span className="text-sm font-bold text-orange-600">Step {index + 1}</span>
              <h3 className="mt-2 font-semibold text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {otherRoofingProjects.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-4">
          <h2 className="text-2xl font-bold">More roofing and framework projects</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {otherRoofingProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium hover:border-orange-500 hover:text-orange-600">{project.name} · {project.location}</Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight">Roofing FAQs</h2>
        <FaqList faqs={roofingFaqs} />
      </section>
    </div>
  )
}
