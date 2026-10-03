import Link from "next/link"
import type { Metadata } from "next"
import { contentStore } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Sitemap",
  description: "All pages on the Roop Glass Solutions website: services, roofing, projects, insights and contact.",
  alternates: { canonical: "/sitemap" },
}

const pages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/catalog", label: "Services catalog" },
  { href: "/roofing", label: "Roofing systems" },
  { href: "/slimline-partitions", label: "Aluminium glass slimline partitions" },
  { href: "/projects", label: "Projects" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms and Conditions" },
]

export default async function SitemapPage() {
  const [services, projects] = await Promise.all([contentStore.services(), contentStore.projects()])
  const groups = [
    { title: "Pages", links: pages },
    { title: "Services", links: services.map((service) => ({ href: `/catalog/${service.slug}`, label: service.name })) },
    { title: "Projects", links: projects.map((project) => ({ href: `/projects/${project.slug}`, label: `${project.name} – ${project.location}` })) },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Sitemap</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-10">Browse all pages on the Roop Glass Solutions website.</p>
      <div className="grid md:grid-cols-3 gap-10">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="font-semibold text-lg mb-4">{group.title}</h2>
            <ul className="space-y-2.5">
              {group.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
