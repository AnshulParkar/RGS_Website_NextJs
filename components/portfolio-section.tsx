"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { Project } from "@/lib/content"
import { LightDecor } from "@/components/light-decor"

const defaultProjects = [
  {
    id: "3",
    title: "Magic Square Malad",
    location: "Malad, Mumbai",
    image: "/assets/MagicSquareMalad.png",
    slug: "magic-square-malad",
    service: "Glass Facade",
  },
  {
    id: "12",
    title: "AJL Project — Bandra",
    location: "Bandra, Mumbai",
    image: "/assets/AJLprojectBandra.png",
    slug: "ajl-project-bandra",
    service: "Facade Work",
  },
  {
    id: "1",
    title: "Amanora Mall Pune",
    location: "Pune",
    image: "/assets/AmanoraMallPune.png",
    slug: "amanora-mall-pune",
    service: "Glass Facade",
  },
  {
    id: "2",
    title: "Income Tax Building",
    location: "Mumbai",
    image: "/assets/IncomeTaxBuilding.png",
    slug: "income-tax-building",
    service: "Glass Facade",
  },
  {
    id: "9",
    title: "Tania Horizon",
    location: "Thane",
    image: "/assets/TaniaHorizon.png",
    slug: "tania-horizon-thane",
    service: "Commercial Glazing",
  },
  {
    id: "11",
    title: "VVMC",
    location: "Vasai-Virar",
    image: "/assets/VVMC.png",
    slug: "vvmc",
    service: "ACP Cladding",
  },
]

interface PortfolioSectionProps {
  projects?: Project[]
}

export function PortfolioSection({ projects: initialProjects }: PortfolioSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.05 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const displayProjects = initialProjects && initialProjects.length > 0
    ? initialProjects.slice(0, 6).map((project) => ({
        id: project.id,
        title: project.name,
        location: project.location,
        image: project.imageUrl || "/placeholder.jpg",
        slug: project.slug,
        service: (project.serviceSlugs && project.serviceSlugs.length > 0
          ? project.serviceSlugs[0].replace(/-/g, " ")
          : "") || project.categorySlug?.replace(/-/g, " ") || "Commercial Project",
      }))
    : defaultProjects

  return (
    <section ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50/80 dark:bg-slate-900/50">
      {/* Decorative bg */}
      <LightDecor />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/[0.02] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className={cn(
          "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div>
            <div className="light-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">Our Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              Commercial glass and facade projects completed across Mumbai, Navi Mumbai, Thane and Pune.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="group shrink-0 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 rounded-xl">
            <Link href="/projects">
              View all projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => (
            <Link
              key={project.id || project.slug || index}
              href={`/projects/${project.slug}`}
              className={cn(
                "light-lift group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800/60",
                "hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-500 ease-out",
                visible ? "animate-fadeInUp" : "opacity-0"
              )}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Service badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-white border border-white/20 capitalize">
                    {project.service}
                  </span>
                </div>

                {/* Location */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm font-medium">{project.location}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-sm font-medium text-blue-600 group-hover:gap-3 transition-all">
                  View project <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
