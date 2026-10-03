"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Layers, Shield, Grid3X3 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { Service } from "@/lib/content"
import { LightDecor } from "@/components/light-decor"

const cardStyles = [
  {
    gradient: "from-blue-600 to-cyan-500",
    iconBg: "from-blue-500/20 to-cyan-500/20",
    icon: Layers,
  },
  {
    gradient: "from-indigo-600 to-violet-500",
    iconBg: "from-indigo-500/20 to-violet-500/20",
    icon: Shield,
  },
  {
    gradient: "from-sky-600 to-blue-500",
    iconBg: "from-sky-500/20 to-blue-500/20",
    icon: Grid3X3,
  },
]

const defaultFeaturedServices = [
  {
    title: "Glass Facade Systems",
    description: "Structural glazing, curtain wall and unitized facade systems engineered for commercial and high-rise buildings. We assess each project for the appropriate facade solution.",
    features: ["Structural glazing", "Curtain wall systems", "Unitized glazing", "Spider glazing"],
    image: "/assets/Structural_Glazing.png",
    gradient: "from-blue-600 to-cyan-500",
    iconBg: "from-blue-500/20 to-cyan-500/20",
    icon: Layers,
    href: "/catalog/structural-glazing",
  },
  {
    title: "ACP & Aluminium Cladding",
    description: "Premium ACP panels and aluminium cladding for commercial building exteriors. Weather-resistant, fire-retardant options with modern architectural finishes.",
    features: ["ACP facade panels", "Aluminium composite", "Weather resistance", "Modern finishes"],
    image: "/assets/Aluminium_Cladding.png",
    gradient: "from-indigo-600 to-violet-500",
    iconBg: "from-indigo-500/20 to-violet-500/20",
    icon: Shield,
    href: "/catalog/acp-aluminium-cladding",
  },
  {
    title: "Glass Railing & Partitions",
    description: "Frameless and framed glass railings for commercial sites. Glass partitions that create open, light-filled interiors for offices and commercial spaces.",
    features: ["Frameless railings", "Framed glass systems", "Office partitions", "Safety glass"],
    image: "/assets/office_glass_partition.jpg",
    gradient: "from-sky-600 to-blue-500",
    iconBg: "from-sky-500/20 to-blue-500/20",
    icon: Grid3X3,
    href: "/catalog/commercial-glass-partitions",
  },
]

const defaultAdditionalServices = [
  { title: "Frameless Glazing", description: "Minimal glass walls for modern commercial applications.", href: "/catalog/frameless-glazing" },
  { title: "Roofing Systems", description: "Polycarbonate domes, skylights, glass and metal roofing.", href: "/roofing" },
  { title: "MS & SS Frameworks", description: "Supporting metalwork for facade and glazing projects.", href: "/catalog/ms-ss-framework" },
]

interface ServicesSectionProps {
  services?: Service[]
}


/** Light-mode accent colours cycled across the compact service tiles. */
const tileAccents = ["#2563eb", "#0891b2", "#7c3aed", "#d97706", "#059669", "#db2777"]

export function ServicesSection({ services }: ServicesSectionProps) {
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

  const hasDynamicServices = Boolean(services && services.length > 0)

  const featured = hasDynamicServices
    ? services!.slice(0, 3).map((service, index) => {
        const style = cardStyles[index % cardStyles.length]
        return {
          title: service.name,
          description: service.excerpt || service.description,
          features: service.features && service.features.length > 0
            ? service.features.slice(0, 4)
            : ["Commercial facade work", "Glass facade systems", "Site-specific scope"],
          image: service.imageUrl || "/assets/Structural_Glazing.png",
          gradient: style.gradient,
          iconBg: style.iconBg,
          icon: style.icon,
          href: `/catalog/${service.slug}`,
        }
      })
    : defaultFeaturedServices

  const additional = hasDynamicServices
    ? services!.slice(3).map((service) => ({
        title: service.name,
        description: service.excerpt || service.description,
        href: `/catalog/${service.slug}`,
      }))
    : defaultAdditionalServices

  return (
    <section ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-sky-50/60 to-indigo-50/50 dark:bg-none dark:bg-slate-950" />
      <LightDecor shards beam />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className={cn(
          "text-center mb-20 transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="light-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">What We Do</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight">
            Our <span className="text-brand-gradient">Core Services</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Glass facade, cladding, railing and roofing solutions — designed, fabricated and installed by one team.
          </p>
        </div>

        {/* Featured services - large cards */}
        <div className="grid lg:grid-cols-3 gap-7 mb-14">
          {featured.map((service, index) => (
            <div
              key={service.href || index}
              className={cn("h-full", visible ? "animate-fadeInUp" : "opacity-0")}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Link
                href={service.href}
                className={cn(
                  "light-lift group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800/80",
                  "hover:-translate-y-2 hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/15 dark:hover:shadow-blue-500/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
                  "transition-[transform,box-shadow,border-color] duration-500 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                )}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40",
                    service.gradient
                  )} />
                  <div aria-hidden="true" className="service-card-shine" />

                  {/* Index */}
                  <span className="absolute top-5 left-5 text-xs font-semibold tracking-[0.25em] text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon badge */}
                  <div className={cn(
                    "absolute top-4 right-4 w-11 h-11 rounded-xl bg-gradient-to-br backdrop-blur-md flex items-center justify-center",
                    "border border-white/20 shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110",
                    service.iconBg
                  )}>
                    <service.icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-2xl font-bold text-white tracking-tight transition-transform duration-500 group-hover:-translate-y-1">
                      {service.title}
                    </h3>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
                          View service details <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-slate-500 dark:text-slate-400 mb-5 leading-relaxed text-[0.95rem] transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className={cn(
                          "inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-300",
                          "bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700/50",
                          "group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200",
                          "dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-200 dark:group-hover:border-blue-500/30"
                        )}
                        style={{ transitionDelay: `${i * 60}ms` }}
                      >
                        <Check className="w-3 h-3 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className={cn(
                    "mt-auto flex items-center gap-2 font-semibold bg-gradient-to-r bg-clip-text text-transparent",
                    "group-hover:gap-3 transition-all duration-300",
                    service.gradient
                  )}>
                    Learn more <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className={cn(
                  "absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 ease-out group-hover:scale-x-100",
                  service.gradient
                )} />

                {/* Gradient border on hover */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "service-card-border bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    service.gradient
                  )}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Additional services - compact row */}
        {additional.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {additional.map((service, index) => (
              <Link
                key={service.href || index}
                href={service.href}
                className={cn(
                  "light-tile group flex items-center gap-4 p-5 rounded-xl",
                  "bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60",
                  "hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 hover:shadow-md",
                  "transition-all duration-300",
                  visible ? "animate-fadeInUp opacity-100" : "opacity-0"
                )}
                style={{ animationDelay: `${(index + 3) * 0.1}s`, animationFillMode: "forwards", "--accent": tileAccents[index % tileAccents.length] } as CSSProperties}
              >
                <div className="light-tile-icon shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="light-tile-dot w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{service.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{service.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 shrink-0 ml-auto transition-all" />
              </Link>
            ))}
          </div>
        )}

        {/* View all CTA */}
        <div className={cn(
          "text-center mt-16 transition-all duration-700 delay-500",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button asChild variant="outline" size="lg" className="group border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 rounded-xl px-8 py-5 text-base">
            <Link href="/catalog">
              View full catalog
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
