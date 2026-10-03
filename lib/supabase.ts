import { fallbackCategories, fallbackProjects, fallbackServices, fallbackTestimonials, type Category, type Post, type Project, type Service, type Testimonial } from "@/lib/content"
import { fallbackPosts } from "@/lib/insights.generated"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const isConfigured = Boolean(supabaseUrl && serviceRoleKey)

type Row = Record<string, unknown>
export type AdminResource = "categories" | "services" | "projects" | "posts" | "inquiries" | "testimonials"

async function rest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!isConfigured) throw new Error("Supabase is not configured")
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey!,
      Authorization: `Bearer ${serviceRoleKey!}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status}`)
  if (response.status === 204) return [] as unknown as T
  const text = await response.text()
  return (text ? JSON.parse(text) : []) as T
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []
}

function mapCategory(row: Row): Category {
  return { id: String(row.id), name: String(row.name), slug: String(row.slug), description: String(row.description || ""), imageUrl: row.image_url as string | null, sortOrder: Number(row.sort_order || 0) }
}
function mapService(row: Row): Service {
  return { id: String(row.id), name: String(row.name), slug: String(row.slug), excerpt: String(row.excerpt || ""), description: String(row.description || ""), categorySlug: String(row.category_slug), imageUrl: row.image_url as string | null, features: asStringArray(row.features), sortOrder: Number(row.sort_order || 0), published: Boolean(row.published) }
}
function mapProject(row: Row): Project {
  return { id: String(row.id), name: String(row.name), slug: String(row.slug), excerpt: String(row.excerpt || ""), description: String(row.description || ""), location: String(row.location || ""), completedAt: row.completed_at as string | null, categorySlug: String(row.category_slug), serviceSlugs: asStringArray(row.service_slugs), imageUrl: row.image_url as string | null, gallery: asStringArray(row.gallery), videoUrl: (row.video_url as string | null) || null, videos: asStringArray(row.videos), featured: Boolean(row.featured), sortOrder: Number(row.sort_order || 0), published: Boolean(row.published) }
}
function mapPost(row: Row): Post {
  return { id: String(row.id), title: String(row.title), slug: String(row.slug), excerpt: String(row.excerpt || ""), content: String(row.content || ""), coverImage: row.cover_image as string | null, publishedAt: row.published_at as string | null, sortOrder: Number(row.sort_order || 0), published: Boolean(row.published) }
}

function mapTestimonial(row: Row): Testimonial {
  return { id: String(row.id), name: String(row.name), role: String(row.role || ""), location: String(row.location || ""), project: String(row.project || ""), quote: String(row.quote || ""), rating: Math.min(5, Math.max(1, Number(row.rating) || 5)), sortOrder: Number(row.sort_order || 0), published: Boolean(row.published) }
}

export const contentStore = {
  configured: isConfigured,
  async categories(): Promise<Category[]> { try { return (await rest<Row[]>("categories?select=*&published=eq.true&order=sort_order.asc,created_at.desc")).map(mapCategory) } catch { return fallbackCategories } },
  async services(): Promise<Service[]> { try { return (await rest<Row[]>("services?select=*&published=eq.true&order=sort_order.asc,created_at.desc")).map(mapService) } catch { return fallbackServices } },
  async projects(): Promise<Project[]> { try { return (await rest<Row[]>("projects?select=*&published=eq.true&order=sort_order.asc,created_at.desc")).map(mapProject) } catch { return fallbackProjects } },
  async posts(): Promise<Post[]> { try { return (await rest<Row[]>("posts?select=*&published=eq.true&order=sort_order.asc,created_at.desc")).map(mapPost) } catch { return fallbackPosts } },
  async testimonials(): Promise<Testimonial[]> { try { return (await rest<Row[]>("testimonials?select=*&published=eq.true&order=sort_order.asc,created_at.desc")).map(mapTestimonial) } catch { return fallbackTestimonials } },
  /** Stores a visitor-submitted testimonial at the end of the current order. */
  async submitTestimonial(data: Row) {
    const [last] = await rest<Row[]>("testimonials?select=sort_order&order=sort_order.desc&limit=1")
    return rest<Row[]>("testimonials", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ ...data, source: "visitor", sort_order: Number(last?.sort_order || 0) + 1 }) })
  },
  async adminList(resource: AdminResource): Promise<Row[]> { return rest<Row[]>(`${resource}?select=*&order=${resource === 'inquiries' ? 'created_at.desc' : 'sort_order.asc,created_at.desc'}`) },
  async adminCreate(resource: AdminResource, data: Row) { return rest<Row[]>(resource, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(data) }) },
  async adminUpdate(resource: AdminResource, id: string, data: Row) { return rest<Row[]>(`${resource}?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(data) }) },
  async adminDelete(resource: AdminResource, id: string) { return rest<Row[]>(`${resource}?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", headers: { Prefer: "return=representation" } }) },
}

export async function uploadToSupabase(file: File, path: string): Promise<string> {
  if (!isConfigured) throw new Error("Supabase is not configured")
  const response = await fetch(`${supabaseUrl}/storage/v1/object/media/${path}`, {
    method: "POST",
    headers: { apikey: serviceRoleKey!, Authorization: `Bearer ${serviceRoleKey!}`, "Content-Type": file.type, "x-upsert": "false" },
    body: file,
  })
  if (!response.ok) throw new Error("Image upload failed")
  return `${supabaseUrl}/storage/v1/object/public/media/${path}`
}
