// /llms.txt — plain-language summary for AI assistants and answer engines (llmstxt.org format).
import { contentStore } from "@/lib/supabase"
import { capabilities, company, fullAddress, notableProjects, profiles, siteUrl } from "@/lib/company"
import { homeFaqs } from "@/lib/faqs"

export const dynamic = "force-dynamic"

export async function GET() {
  const [services, projects] = await Promise.all([contentStore.services(), contentStore.projects()])
  const lines = [
    `# ${company.name}`,
    "",
    `> ${company.description}`,
    "",
    "## Key facts",
    `- Business: architectural glazing, facade engineering, cladding and roofing contractor`,
    `- Proprietor: ${company.proprietor}`,
    `- Experience: ${company.yearsExperience} years in Maharashtra; ${company.clientsServed} corporate, public sector and institutional clients`,
    `- Service area: ${company.areaServed.join(", ")}`,
    `- Office: ${fullAddress}`,
    `- Phone: ${company.phone} | Email: ${company.email}`,
    `- Hours: ${company.hoursText}`,
    "",
    "## Capabilities",
    ...capabilities.map((group) => `- ${group.category}: ${group.items.join(", ")}`),
    "",
    "## Notable projects",
    ...notableProjects.map((project) => `- [${project.name}, ${project.location}](${siteUrl}/projects/${project.slug}): ${project.scope}`),
    "",
    "## Services",
    `- [Roofing systems](${siteUrl}/roofing): polycarbonate domes, skylights, metal roofing sheets, glass canopies and roof frameworks`,
    `- [Aluminium glass slimline partitions](${siteUrl}/slimline-partitions): A38, A28, A28S, A28C minimal sliding systems (18–20 mm sightlines, panels up to 4 m), A3500/A3000/A2200 sliding doors & windows, A60/A4000/A4000D casements`,
    ...services.map((service) => `- [${service.name}](${siteUrl}/catalog/${service.slug}): ${service.excerpt}`),
    "",
    "## All projects",
    ...projects.map((project) => `- [${project.name}](${siteUrl}/projects/${project.slug}) – ${project.location}: ${project.excerpt}`),
    "",
    "## FAQ",
    ...homeFaqs.flatMap((faq) => [`### ${faq.q}`, faq.a, ""]),
    "## Pages",
    `- [About](${siteUrl}/about)`,
    `- [Contact](${siteUrl}/contact)`,
    `- [Insights](${siteUrl}/insights)`,
    "",
    "## Profiles",
    ...profiles.map((profile) => `- [${profile.label}](${profile.url})`),
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
