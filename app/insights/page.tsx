import Link from "next/link"
import { contentStore } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Insights – Glass Facade, Cladding & Roofing Guides",
  alternates: { canonical: "/insights" },
  description: "Practical guides on glass facades, structural glazing, cladding and roofing for commercial and institutional buildings, from Roop Glass Solutions, Mumbai.",
}

export default async function InsightsPage() {
  const posts = await contentStore.posts()

  return (
    <div className="pt-16">
      <header className="py-20 px-4 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-600 font-medium">Insights</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Commercial glass and facade guidance</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
            Project-focused information published by Roop Glass Solutions.
          </p>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-4 py-14">
        {posts.length ? (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                href={`/insights/${post.slug}`}
                key={post.id}
                className="rounded-xl border overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-slate-900"
              >
                {post.coverImage && (
                  <img src={post.coverImage} alt={post.title} className="w-full h-52 object-cover" />
                )}
                <div className="p-6">
                  <p className="text-sm text-slate-500">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </p>
                  <h2 className="text-2xl font-bold mt-2">{post.title}</h2>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border p-8 text-center bg-white dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Articles are being prepared</h2>
            <p className="text-slate-600 mt-2">For project-specific questions, please contact our team.</p>
            <Link href="/contact" className="inline-block mt-4 text-blue-600 font-medium">
              Send an inquiry →
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
