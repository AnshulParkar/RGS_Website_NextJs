import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Clock, Phone } from "lucide-react"
import { contentStore } from "@/lib/supabase"
import { company } from "@/lib/company"
import { abs, breadcrumbs, faqSchema, jsonLd, orgId } from "@/lib/schema"
import { Markdown, extractHeadings } from "@/components/markdown"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = (await contentStore.posts()).find((item) => item.slug === params.slug)
  if (!post) return {}
  return {
    title: { absolute: `${post.title} | Roop Glass Solutions` },
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/insights/${post.slug}`, publishedTime: post.publishedAt || undefined, images: post.coverImage ? [post.coverImage] : undefined },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: post.coverImage ? [post.coverImage] : undefined },
  }
}

/** Pull "### question" + answer pairs from a "## Frequently asked questions" section for FAQPage schema. */
function extractFaqs(markdown: string) {
  const section = markdown.split(/\n(?=## )/).find((part) => /^## (frequently asked questions|faqs?)\b/i.test(part.trim()))
  if (!section) return []
  return section.split(/\n(?=### )/).slice(1).map((block) => {
    const [q, ...rest] = block.replace(/^###\s+/, "").split("\n")
    return { q: q.trim(), a: rest.join(" ").replace(/\s+/g, " ").replace(/\*\*|`/g, "").trim() }
  }).filter((faq) => faq.q && faq.a)
}

const relatedFor = (slug: string) =>
  slug.includes("slimline")
    ? { href: "/slimline-partitions", label: "Compare all slimline series and specifications" }
    : { href: "/catalog", label: "Browse all glazing, facade, cladding and roofing services" }

export default async function InsightPage({ params }: { params: { slug: string } }) {
  const posts = await contentStore.posts()
  const post = posts.find((item) => item.slug === params.slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const faqs = extractFaqs(post.content)
  const words = post.content.split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 220))
  const date = post.publishedAt ? new Date(post.publishedAt) : null
  const related = relatedFor(post.slug)
  const others = posts.filter((item) => item.slug !== post.slug).slice(0, 2)

  const schema = [
    breadcrumbs([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: post.title, path: `/insights/${post.slug}` }]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage ? [abs(post.coverImage)] : undefined,
      datePublished: post.publishedAt || undefined,
      dateModified: post.publishedAt || undefined,
      wordCount: words,
      mainEntityOfPage: abs(`/insights/${post.slug}`),
      author: { "@id": orgId },
      publisher: { "@id": orgId },
    },
    ...(faqs.length ? [faqSchema(faqs)] : []),
  ]

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <article>
        <header className="bg-slate-100 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 pt-12 pb-10">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600">Home</Link> / <Link href="/insights" className="hover:text-blue-600">Insights</Link>
            </nav>
            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">{post.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="font-medium text-slate-700 dark:text-slate-200">{company.name}</span>
              {date && <time dateTime={date.toISOString()}>{date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</time>}
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {minutes} min read</span>
            </p>
          </div>
        </header>

        {post.coverImage && (
          <div className="max-w-5xl mx-auto px-4 -mt-2">
            <img src={post.coverImage} alt={post.title} className="mt-8 w-full max-h-[480px] rounded-2xl object-cover" />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-[1fr_260px] gap-12">
          <div className="min-w-0 max-w-3xl">
            <Markdown content={post.content} />

            <div className="mt-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-blue-100 dark:border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Planning a project?</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Share your drawings or opening sizes and our team will recommend the right system for your site.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Send an inquiry <ArrowRight className="h-4 w-4" /></Link>
                <a href={`tel:${company.phoneE164}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 px-5 py-3 font-semibold"><Phone className="h-4 w-4" /> {company.phone}</a>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {headings.length > 2 && (
                <nav aria-label="On this page">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">On this page</p>
                  <ul className="mt-3 space-y-2 border-l border-slate-200 dark:border-slate-800">
                    {headings.map((heading) => (
                      <li key={heading.id}><a href={`#${heading.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600">{heading.text}</a></li>
                    ))}
                  </ul>
                </nav>
              )}
              <Link href={related.href} className="block rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-sm font-semibold text-blue-600 hover:border-blue-500">{related.label} →</Link>
            </div>
          </aside>
        </div>
      </article>

      {others.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold">More insights</h2>
          <div className="mt-5 grid md:grid-cols-2 gap-6">
            {others.map((item) => (
              <Link key={item.id} href={`/insights/${item.slug}`} className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:border-blue-500">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
