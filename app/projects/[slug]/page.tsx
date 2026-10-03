import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { contentStore } from "@/lib/supabase"
import { company } from "@/lib/company"
import { abs, breadcrumbs, jsonLd, orgId } from "@/lib/schema"
import { knownYouTubeVideos, toProjectVideo } from "@/lib/video"
import { YouTubeEmbed } from "@/components/youtube-embed"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = (await contentStore.projects()).find((item) => item.slug === params.slug)
  if (!project) return {}
  const title = `${project.name}, ${project.location}`
  const image = project.imageUrl || project.gallery[0]
  const description = project.excerpt.length < 110 ? `${project.excerpt} A ${company.name} project — glazing, facade, cladding and roofing contractor, Mumbai.` : project.excerpt
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { type: "article", title, description: project.excerpt, url: `/projects/${project.slug}`, images: image ? [{ url: image, alt: project.name }] : undefined },
    twitter: { card: "summary_large_image", title, description: project.excerpt, images: image ? [image] : undefined },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [projects, categories, services] = await Promise.all([
    contentStore.projects(),
    contentStore.categories(),
    contentStore.services(),
  ])
  const project = projects.find((item) => item.slug === params.slug)
  if (!project) notFound()

  const category = categories.find((item) => item.slug === project.categorySlug)
  const related = services.filter((service) => project.serviceSlugs.includes(service.slug))
  const images = Array.from(
    new Set([project.imageUrl, ...project.gallery].filter((item): item is string => Boolean(item)))
  )
  const videos = Array.from(
    new Set([project.videoUrl, ...project.videos].filter((item): item is string => Boolean(item)))
  ).map(toProjectVideo)
  const otherProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3)
  const videoTitle = (index: number) => {
    const video = videos[index]
    if (video?.kind === "youtube" && knownYouTubeVideos[video.id]) return knownYouTubeVideos[video.id].title
    return `${project.name} – ${company.name} project video${videos.length > 1 ? ` ${index + 1}` : ""}`
  }

  const schema = [
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.name, path: `/projects/${project.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      headline: `${project.name} – ${category?.name || "Commercial project"} by ${company.name}`,
      description: project.description,
      url: abs(`/projects/${project.slug}`),
      image: images.map(abs),
      locationCreated: { "@type": "Place", name: project.location, address: { "@type": "PostalAddress", addressLocality: project.location, addressRegion: "Maharashtra", addressCountry: "IN" } },
      creator: { "@id": orgId },
      about: related.map((service) => ({ "@type": "Service", name: service.name, url: abs(`/catalog/${service.slug}`) })),
      ...(project.completedAt ? { dateCreated: project.completedAt } : {}),
      video: videos.map((video, index) =>
        video.kind === "youtube"
          ? { "@type": "VideoObject", name: videoTitle(index), description: project.excerpt, thumbnailUrl: [abs(images[index] || images[0] || video.thumbnailUrl), video.thumbnailUrl], embedUrl: video.embedUrl, contentUrl: video.watchUrl, uploadDate: knownYouTubeVideos[video.id]?.uploadDate, duration: knownYouTubeVideos[video.id]?.duration }
          : { "@type": "VideoObject", name: videoTitle(index), description: project.excerpt, thumbnailUrl: images[0] ? abs(images[0]) : undefined, contentUrl: abs(video.url) }
      ),
    },
  ]

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <article className="max-w-6xl mx-auto px-4 py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/projects" className="hover:text-blue-600">Projects</Link></li>
            <li aria-hidden>/</li>
            <li className="text-slate-700 dark:text-slate-200 font-medium" aria-current="page">{project.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mt-8">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            {category?.name || "Commercial project"}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight text-slate-900 dark:text-white">
            {project.name}
          </h1>
          <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
            {project.location}
            {project.completedAt ? ` · Completed ${new Date(project.completedAt).getFullYear()}` : ""}
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">{project.excerpt}</p>
        </header>

        {/* Image gallery */}
        {images.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {images.map((image, index) => (
              <img
                src={image}
                key={`${image}-${index}`}
                alt={`${project.name}, ${project.location} – ${category?.name || "project"} photo ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`w-full object-cover rounded-xl ${index === 0 && images.length > 1 ? "md:col-span-2 h-[26rem]" : index === images.length - 1 && images.length % 2 === 0 ? "md:col-span-2 h-80" : "h-72"}`}
              />
            ))}
          </div>
        )}

        {/* Video gallery */}
        {videos.length > 0 && (
          <section className="mt-12" aria-labelledby="project-videos">
            <h2 id="project-videos" className="text-2xl font-bold text-slate-900 dark:text-white mb-5">
              Project videos
            </h2>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {videos.map((video, index) =>
                video.kind === "youtube" ? (
                  <figure key={video.id}>
                    <YouTubeEmbed id={video.id} vertical={video.vertical} title={videoTitle(index)} poster={images[index] || images[0]} />
                    <figcaption className="mt-2 text-sm text-slate-500 dark:text-slate-400 text-center">
                      <a href={video.watchUrl} target="_blank" rel="noopener" className="hover:text-blue-600">Watch on YouTube ↗</a>
                    </figcaption>
                  </figure>
                ) : (
                  <div key={`video-${index}`} className="rounded-xl overflow-hidden bg-black">
                    <video src={video.url} controls preload="metadata" playsInline className="w-full h-72 object-contain bg-black" poster={images[0] || undefined}>
                      Your browser does not support video playback.
                    </video>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* Project overview */}
        <section className="max-w-3xl mt-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project overview</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{project.description}</p>
          <dl className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4"><dt className="text-slate-500">Location</dt><dd className="mt-1 font-semibold">{project.location}</dd></div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4"><dt className="text-slate-500">Category</dt><dd className="mt-1 font-semibold">{category?.name || "Commercial project"}</dd></div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4"><dt className="text-slate-500">Contractor</dt><dd className="mt-1 font-semibold">{company.name}</dd></div>
          </dl>
        </section>

        {/* Related services */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Services used on this project</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {related.map((service) => (
                <Link
                  key={service.id}
                  href={`/catalog/${service.slug}`}
                  className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* More projects */}
        {otherProjects.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">More projects</h2>
            <div className="grid sm:grid-cols-3 gap-5 mt-5">
              {otherProjects.map((item) => (
                <Link key={item.id} href={`/projects/${item.slug}`} className="group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  {item.imageUrl && <img src={item.imageUrl} alt={`${item.name}, ${item.location}`} loading="lazy" className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <div className="p-4">
                    <p className="font-semibold group-hover:text-blue-600">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-blue-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Planning a similar project?</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Discuss your requirement with our team — we can review the scope for your site.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 mt-5 font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Send an inquiry →
          </Link>
        </div>
      </article>
    </div>
  )
}
