import type { MetadataRoute } from "next"
import { contentStore } from "@/lib/supabase"
import { siteUrl } from "@/lib/company"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = siteUrl
  const now = new Date()
  const [services, projects, posts] = await Promise.all([contentStore.services(), contentStore.projects(), contentStore.posts()])
  return [
    { url: site, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/roofing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site}/slimline-partitions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site}/catalog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...services.map((item) => ({ url: `${site}/catalog/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((item) => ({
      url: `${site}/projects/${item.slug}`,
      lastModified: item.completedAt ? new Date(item.completedAt) : now,
      changeFrequency: "monthly" as const,
      priority: item.featured ? 0.8 : 0.7,
    })),
    ...posts.map((item) => ({ url: `${site}/insights/${item.slug}`, lastModified: item.publishedAt ? new Date(item.publishedAt) : now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${site}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ]
}
