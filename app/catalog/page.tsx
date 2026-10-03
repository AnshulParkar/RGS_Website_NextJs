import type { Metadata } from "next"
import Link from "next/link"
import { CatalogBrowser } from "@/components/catalog-browser"
import { contentStore } from "@/lib/supabase"
import { breadcrumbs, jsonLd } from "@/lib/schema"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Glazing, Facade, Cladding & Roofing Services",
  description: "Structural glazing, curtain walls, ACP & stone cladding, glass railings, partitions, glass flooring, polycarbonate domes and metal roofing by Roop Glass Solutions.",
  alternates: { canonical: "/catalog" },
}

export default async function CatalogPage({ searchParams }: { searchParams?: { category?: string } }) {
  const [categories, services] = await Promise.all([
    contentStore.categories(),
    contentStore.services(),
  ])

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbs([{ name: "Home", path: "/" }, { name: "Services catalog", path: "/catalog" }]))} />
      <header className="py-20 px-4 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-600 font-medium">Services catalog</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Glazing, facade, cladding and roofing services</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
            Everything Roop Glass Solutions designs, fabricates and installs — from structural glazing and curtain walls to ACP cladding, glass railings, glass flooring, polycarbonate domes and metal roofing. Each requirement is reviewed for the individual project.
          </p>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-4 pt-14 grid md:grid-cols-2 gap-5">
        {[
          { href: "/roofing", label: "Roofing systems", text: "Polycarbonate domes, skylights, metal roofing sheets, glass canopies and roof frameworks.", image: "/assets/projects/arh-airoli/arh-skylight-dome.jpg" },
          { href: "/slimline-partitions", label: "Aluminium glass slimline partitions", text: "18 mm sightlines, panels up to 4 m, sliding doors, windows and casements — with full specifications.", image: "/assets/slimline/slimline-a38-panoramic.webp" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="group relative overflow-hidden rounded-2xl min-h-[180px] flex items-end">
            <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
            <span className="relative p-6 text-white">
              <span className="block text-xl font-bold">{item.label} →</span>
              <span className="mt-1 block text-sm text-white/80">{item.text}</span>
            </span>
          </Link>
        ))}
      </section>
      <section className="max-w-7xl mx-auto px-4 py-14">
        <CatalogBrowser categories={categories} services={services} initialCategory={searchParams?.category} />
      </section>
    </div>
  )
}
