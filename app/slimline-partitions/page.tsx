import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Phone } from "lucide-react"
import { company } from "@/lib/company"
import { abs, breadcrumbs, faqSchema, jsonLd, orgId } from "@/lib/schema"
import { SLIMLINE_CATEGORY, slimlineFamilies, slimlineSeries } from "@/lib/slimline"
import { SlimlineSeriesCard } from "@/components/slimline-series-card"
import { FaqList } from "@/components/faq-section"

export const metadata: Metadata = {
  title: { absolute: "Aluminium Glass Slimline Partitions in Mumbai | Roop Glass Solutions" },
  description: "Slimline aluminium glass partitions, minimal sliding systems (A38, A28), slim sliding doors & windows and casements — 18 mm sightlines, panels up to 4 m. Supplied & installed in Mumbai.",
  alternates: { canonical: "/slimline-partitions" },
  openGraph: {
    title: "Aluminium Glass Slimline Partitions | Roop Glass Solutions",
    description: "Minimal aluminium glass partitions, sliding systems, doors and windows with 18–20 mm sightlines.",
    url: "/slimline-partitions",
    images: [{ url: "/assets/slimline/slimline-a38-panoramic.webp", alt: "A38 slimline floor-to-ceiling aluminium glass sliding system" }],
  },
}

const BLOG_SLUG = "aluminium-glass-slimline-partitions-guide"

const faqs = [
  {
    q: "What is an aluminium glass slimline partition?",
    a: "It is a glass wall or sliding system held in very narrow aluminium profiles, so the visible frame between panels is only about 18–20 mm. It divides a space while keeping light and views, and can combine fixed panels, sliding panels and slim aluminium doors.",
  },
  {
    q: "How tall can a slimline glass panel be?",
    a: "In the series we supply, the A28 family goes up to 3,400 mm per shutter and the A38 up to 4,000 mm, with up to 6 m² of glass per sash. The final size is confirmed after checking wind load, glass thickness and site access.",
  },
  {
    q: "Can the track or frame be hidden?",
    a: "Yes. The A28S lets the surrounding frame be concealed in flooring or wall finishes, and the A28C uses a fully hidden bottom track. Both also allow corner openings without a corner post.",
  },
  {
    q: "Which series should I choose for a high-rise apartment?",
    a: "For large balcony doors on high-rise buildings, the A3500 is designed for high wind resistance; for floor-to-ceiling panoramic glazing, the double-glazed A38 handles heavy wind loads. We review the floor height, exposure and opening size before recommending a series.",
  },
  {
    q: "Do slimline systems support mosquito mesh?",
    a: "Mosquito mesh is possible on the A2200 budget sliding series. The minimal A38 and A28 slimline systems do not take a mesh, so we suggest a separate screen solution where insects are a concern.",
  },
]

export default function SlimlinePage() {
  const schema = [
    breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/catalog" }, { name: "Slimline partitions", path: "/slimline-partitions" }]),
    faqSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Aluminium glass slimline partitions and systems",
      serviceType: "Aluminium glass partitions, sliding doors and windows",
      url: abs("/slimline-partitions"),
      provider: { "@id": orgId },
      areaServed: company.areaServed,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Slimline aluminium series",
        itemListElement: slimlineSeries.map((series) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name: series.name, description: series.summary, category: series.type, image: abs(series.image) } })),
      },
    },
  ]

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src="/assets/slimline/slimline-a38-panoramic.webp" alt="Floor-to-ceiling A38 slimline aluminium glass sliding system" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-white">
          <p className="text-teal-300 font-semibold uppercase tracking-wider text-sm">Aluminium glass slimline systems</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">Slimline glass partitions with 18 mm sightlines</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
            Floor-to-ceiling aluminium glass partitions, minimal sliding systems, slim sliding doors and casement windows — panels up to 4 m high, hidden tracks and corner openings. Supplied and installed by {company.name} across Mumbai, Navi Mumbai, Thane and Pune.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 px-7 py-4 font-semibold text-slate-950 hover:shadow-xl">Discuss your partition <ArrowRight className="h-4 w-4" /></Link>
            <a href={`tel:${company.phoneE164}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-semibold backdrop-blur hover:bg-white/10"><Phone className="h-4 w-4" /> {company.phone}</a>
          </div>
        </div>
      </section>

      {/* Key numbers */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <dl className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["18 mm", "Narrowest sightline at interlock"], ["4,000 mm", "Max panel height (A38)"], ["500 kg", "Max shutter weight"], ["10", "Aluminium series to choose from"]].map(([value, label]) => (
            <div key={label}><dt className="sr-only">{label}</dt><dd className="text-3xl md:text-4xl font-extrabold text-teal-600 dark:text-teal-400">{value}</dd><p className="mt-1 text-sm text-slate-500">{label}</p></div>
          ))}
        </dl>
      </section>

      {/* Families */}
      {slimlineFamilies.map((family) => (
        <section key={family.key} className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{family.title}</h2>
              <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{family.intro}</p>
            </div>
            <Link href={`/catalog/${family.serviceSlug}`} className="inline-flex items-center gap-2 font-semibold text-blue-600 shrink-0">Service details <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slimlineSeries.filter((series) => series.family === family.key).map((series) => <SlimlineSeriesCard key={series.code} series={series} />)}
          </div>
        </section>
      ))}

      {/* Comparison */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Compare sliding series</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/60 text-left">
                <tr>{["Series", "Type", "Glass (mm)", "Max height", "Max weight", "Sightline"].map((h) => <th key={h} scope="col" className="p-3 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {slimlineSeries.filter((series) => series.family !== "casement").map((series) => {
                  const get = (label: string) => series.specs.find((spec) => spec.label === label)?.value ?? "—"
                  return (
                    <tr key={series.code}>
                      <th scope="row" className="p-3 text-left"><a href={`#${series.code.toLowerCase()}`} className="font-semibold text-blue-600">{series.name}</a></th>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{series.type}</td>
                      <td className="p-3">{get("Glass thickness").replace(" mm", "")}</td>
                      <td className="p-3">{get("Max shutter height")}</td>
                      <td className="p-3">{get("Max shutter weight")}</td>
                      <td className="p-3">{get("Sightline at interlock")}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">Values are catalogue limits for each series. Final glass, size and hardware are confirmed for each opening after a site review.</p>
        </div>
      </section>

      {/* Guide + experience */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-10 items-center">
        <img src="/assets/slimline/slimline-experience-centre.webp" alt="Slimline aluminium partitions, sliding doors and casement windows on display" loading="lazy" className="w-full rounded-2xl object-cover" />
        <div>
          <p className="text-teal-600 font-semibold uppercase tracking-wider text-sm">Buying guide</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">How to choose a slimline glass partition</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7">Our guide explains sightlines, glass options, panel sizes, hidden tracks, locking and where each series fits — from office cabins to high-rise balconies.</p>
          <Link href={`/insights/${BLOG_SLUG}`} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 font-semibold hover:border-teal-500"><BookOpen className="h-4 w-4" /> Read the guide</Link>
          <Link href={`/catalog?category=${SLIMLINE_CATEGORY}`} className="mt-3 ml-0 sm:ml-3 inline-flex items-center gap-2 px-5 py-3 font-semibold text-blue-600">All slimline services <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold tracking-tight">Slimline partition FAQs</h2>
        <FaqList faqs={faqs} />
      </section>
    </div>
  )
}
