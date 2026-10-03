import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { capabilities, company, fullAddress, notableProjects, profiles } from "@/lib/company"
import { abs, breadcrumbs, jsonLd, orgId } from "@/lib/schema"

export const metadata: Metadata = {
  title: { absolute: "About Roop Glass Solutions – 20+ Years in Facades & Glazing" },
  description: "Led by proprietor Shridhar Parkar, Roop Glass Solutions is a Mumbai glazing, facade, cladding and roofing contractor with 20+ years and 100+ clients in Maharashtra.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  const schema = [
    breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
    { "@context": "https://schema.org", "@type": "AboutPage", url: abs("/about"), name: `About ${company.name}`, about: { "@id": orgId }, mainEntity: { "@id": orgId } },
  ]

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <header className="py-20 px-4 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-600 font-medium">About us</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">About Roop Glass Solutions</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300 max-w-3xl">{company.description}</p>
        </div>
      </header>

      {/* Key facts — short, extractable statements */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold">Company at a glance</h2>
        <dl className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["Business", "Architectural glazing, facade engineering, cladding & roofing contractor"],
            ["Proprietor", company.proprietor],
            ["Experience", `${company.yearsExperience} years of operational history in Maharashtra`],
            ["Clients", `${company.clientsServed} corporate, public sector and institutional clients`],
            ["Service area", company.areaServed.join(", ")],
            ["Working hours", company.hoursText],
            ["Phone", company.phone],
            ["Email", company.email],
            ["Office", fullAddress],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
              <dt className="text-sm text-slate-500">{label}</dt>
              <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Capabilities */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold">What we design, fabricate and install</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-white dark:bg-slate-900">
                <tr><th scope="col" className="p-4 font-semibold">Service category</th><th scope="col" className="p-4 font-semibold">Work we deliver</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {capabilities.map((group) => (
                  <tr key={group.category}>
                    <th scope="row" className="p-4 font-medium align-top whitespace-nowrap">{group.category}</th>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{group.items.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Notable projects */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold">Notable projects</h2>
        <ul className="mt-6 grid md:grid-cols-2 gap-4">
          {notableProjects.map((project) => (
            <li key={project.name}>
              <Link href={`/projects/${project.slug}`} className="group block h-full rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-500 transition-colors">
                <p className="font-semibold group-hover:text-blue-600">{project.name}</p>
                <p className="text-sm text-slate-500">{project.location}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.scope}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/projects" className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">See all projects <ArrowRight className="h-4 w-4" /></Link>
      </section>

      {/* Third-party profiles */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold">Find Roop Glass Solutions online</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Our verified business listings and project video channel.</p>
        <ul className="mt-5 grid sm:grid-cols-2 gap-3">
          {profiles.map((profile) => (
            <li key={profile.name}>
              <a href={profile.url} target="_blank" rel="noopener" className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-blue-500 transition-colors">
                <span><span className="font-semibold">{profile.name}</span><span className="block text-sm text-slate-500">{profile.label}</span></span>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-2xl bg-blue-50 dark:bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Work with us</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Tell us about your building and the glazing, facade, cladding or roofing work you need.</p>
          <Link href="/contact" className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-600">Send an inquiry <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  )
}
