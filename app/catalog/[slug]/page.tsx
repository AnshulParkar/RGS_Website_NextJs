import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { contentStore } from "@/lib/supabase"
import { company } from "@/lib/company"
import { abs, breadcrumbs, jsonLd, orgId } from "@/lib/schema"
import { seriesByService, slimlineSeries } from "@/lib/slimline"
import { SlimlineSeriesCard } from "@/components/slimline-series-card"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = (await contentStore.services()).find((item) => item.slug === params.slug)
  if (!service) return {}
  const title = `${service.name} in Mumbai`
  const description = `${service.excerpt} Delivered by Roop Glass Solutions across Mumbai, Navi Mumbai, Thane and Pune.`.slice(0, 200)
  return {
    title,
    description,
    alternates: { canonical: `/catalog/${service.slug}` },
    openGraph: { title, description: service.excerpt, url: `/catalog/${service.slug}`, images: service.imageUrl ? [{ url: service.imageUrl, alt: service.name }] : undefined },
    twitter: { card: "summary_large_image", title, description: service.excerpt, images: service.imageUrl ? [service.imageUrl] : undefined },
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const [services, categories, projects] = await Promise.all([contentStore.services(), contentStore.categories(), contentStore.projects()])
  const service = services.find((item) => item.slug === params.slug)
  if (!service) notFound()
  const category = categories.find((item) => item.slug === service.categorySlug)
  const usedOn = projects.filter((project) => project.serviceSlugs.includes(service.slug)).slice(0, 6)
  const siblings = services.filter((item) => item.categorySlug === service.categorySlug && item.slug !== service.slug)
  const seriesCards = (seriesByService[service.slug] || []).map((code) => slimlineSeries.find((series) => series.code === code)).filter((series): series is NonNullable<typeof series> => Boolean(series))

  const schema = [
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Services catalog", path: "/catalog" },
      { name: service.name, path: `/catalog/${service.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      category: category?.name,
      description: service.description,
      url: abs(`/catalog/${service.slug}`),
      image: service.imageUrl ? abs(service.imageUrl) : undefined,
      provider: { "@id": orgId },
      areaServed: company.areaServed.map((name) => ({ "@type": name === "Maharashtra" ? "State" : "City", name })),
    },
  ]

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <article className="max-w-5xl mx-auto px-4 py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/catalog" className="hover:text-blue-600">Services</Link></li>
            <li aria-hidden>/</li>
            <li className="text-slate-700 dark:text-slate-200 font-medium" aria-current="page">{service.name}</li>
          </ol>
        </nav>
        <p className="mt-8 text-blue-600 font-medium">{category?.name}</p>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">{service.name}</h1>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">{service.excerpt}</p>
        {service.imageUrl && <img src={service.imageUrl} alt={`${service.name} by ${company.name}`} className="w-full max-h-[440px] object-cover rounded-xl my-8" />}
        <p className="text-lg leading-8 text-slate-700 dark:text-slate-200">{service.description}</p>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Project considerations</h2>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-300">
            {service.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </section>

        {seriesCards.length > 0 && (
          <section className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-bold">Series &amp; specifications</h2>
              <Link href="/slimline-partitions" className="text-sm font-semibold text-blue-600">Compare all slimline series →</Link>
            </div>
            <div className="mt-5 grid md:grid-cols-2 gap-6">
              {seriesCards.map((series) => <SlimlineSeriesCard key={series.code} series={series} />)}
            </div>
          </section>
        )}

        {usedOn.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold">Projects featuring {service.name.toLowerCase()}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {usedOn.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  {project.imageUrl && <img src={project.imageUrl} alt={`${project.name}, ${project.location}`} loading="lazy" className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <div className="p-4"><p className="font-semibold group-hover:text-blue-600">{project.name}</p><p className="text-sm text-slate-500">{project.location}</p></div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {siblings.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold">Related {category?.name?.toLowerCase() || "services"}</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {siblings.map((item) => (
                <Link key={item.id} href={`/catalog/${item.slug}`} className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-colors">{item.name}</Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 p-6 rounded-xl bg-blue-50 dark:bg-slate-900">
          <h2 className="text-2xl font-bold">Have a {service.name.toLowerCase()} requirement?</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Share your project location and requirement so we can discuss the appropriate scope. Call <a href={`tel:${company.phoneE164}`} className="font-medium text-blue-600">{company.phone}</a> ({company.hoursText}).</p>
          <Link href="/contact" className="inline-block mt-4 font-medium text-blue-600">Contact Roop Glass Solutions →</Link>
        </div>
      </article>
    </div>
  )
}
