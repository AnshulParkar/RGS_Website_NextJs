import { ProjectBrowser } from "@/components/project-browser"
import { contentStore } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Projects – Facade, Cladding & Roofing Work",
  description: "Projects by Roop Glass Solutions including ARH Airoli, Global Vipassana Pagoda, NMMC Vashi & Airoli, the Income Tax Building Mumbai and Amanora Mall Pune.",
  alternates: { canonical: "/projects" },
}

export default async function ProjectsPage() {
  const [categories, projects] = await Promise.all([
    contentStore.categories(),
    contentStore.projects(),
  ])

  return (
    <div className="pt-16">
      <header className="py-20 px-4 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-600 font-medium">Project portfolio</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Commercial projects</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
            Explore a selection of commercial work by Roop Glass Solutions. Open a project to view its approved information and images.
          </p>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-4 py-14">
        <ProjectBrowser categories={categories} projects={projects} />
      </section>
    </div>
  )
}
