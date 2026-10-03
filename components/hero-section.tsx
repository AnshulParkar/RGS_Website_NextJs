"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Slide = {
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  cta: string
  href: string
  accent: string
  accentBg: string
}

const slides: Slide[] = [
  {
    title: "Glass Facade Systems",
    subtitle: "Structural Glazing · Curtain Walls · Unitized Facades",
    description: "Mumbai-based facade contractor with 20+ years of work across Maharashtra. Structural glazing, curtain wall and unitized systems designed, fabricated and installed for commercial, civic and institutional buildings.",
    image: "/assets/hero/hero-glass-facade.webp",
    imageAlt: "Commercial glass facade with structural glazing",
    cta: "Explore Facade Systems",
    href: "/catalog?category=glass-facade-systems",
    accent: "from-blue-500 to-cyan-400",
    accentBg: "bg-blue-500/20",
  },
  {
    title: "Roofing Systems",
    subtitle: "Polycarbonate Domes · Skylights · Metal Roofing",
    description: "Architectural skylight domes, polycarbonate and metal roofing sheets, glass canopies and the MS/SS frameworks that carry them — planned, fabricated and installed by one team.",
    image: "/assets/hero/hero-roofing.webp",
    imageAlt: "Glass roofing canopy over a commercial building entrance",
    cta: "Explore Roofing Work",
    href: "/roofing",
    accent: "from-amber-400 to-orange-500",
    accentBg: "bg-amber-500/20",
  },
  {
    title: "ACP & Stone Cladding",
    subtitle: "Premium Exterior Finishes",
    description: "ACP, aluminium and dry stone cladding that protects and transforms the exteriors of commercial, civic and institutional buildings.",
    image: "/assets/hero/hero-acp-cladding.webp",
    imageAlt: "ACP aluminium cladding on a commercial building exterior",
    cta: "View Cladding Work",
    href: "/catalog?category=acp-aluminium-cladding",
    accent: "from-indigo-500 to-violet-400",
    accentBg: "bg-indigo-500/20",
  },
  {
    title: "Glass & SS Railing",
    subtitle: "Toughened Glass · Stainless Steel · Balustrades",
    description: "Toughened glass balconies, stainless steel and MS railings and profile balustrades — safety and clear views for staircases, balconies, terraces and atriums.",
    image: "/assets/hero/hero-glass-railing.webp",
    imageAlt: "Toughened glass railing with stainless steel fittings",
    cta: "View Railing Work",
    href: "/catalog/glass-railing",
    accent: "from-sky-500 to-blue-400",
    accentBg: "bg-sky-500/20",
  },
  {
    title: "Slimline Glass Partitions",
    subtitle: "18 mm Sightlines · Up to 4 m Panels · Hidden Tracks",
    description: "Aluminium glass slimline partitions, minimal sliding systems, slim sliding doors and casement windows that divide space without losing light — for offices, cabins, homes and high-rise balconies.",
    image: "/assets/slimline/slimline-a38-panoramic.webp",
    imageAlt: "Floor-to-ceiling slimline aluminium glass sliding partition",
    cta: "Explore Slimline Systems",
    href: "/slimline-partitions",
    accent: "from-teal-400 to-emerald-500",
    accentBg: "bg-teal-500/20",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setAnimKey((prev) => prev + 1)
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slide = slides[currentSlide]

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background images with crossfade */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-all duration-[1200ms] ease-out",
            i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        >
          <img
            src={s.image}
            alt={i === currentSlide ? s.imageAlt : ""}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Animated accent glow */}
      <div className={cn(
        "absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 transition-colors duration-1000",
        slide.accentBg
      )} />

      {/* Animated progress bar */}
      <div className={cn(
        "absolute bottom-0 left-0 h-[3px] bg-gradient-to-r transition-all duration-700 ease-out",
        slide.accent
      )} style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-2xl">
          {/* Static page H1 (stable for search engines) + slide indicator */}
          <h1 className="mb-6 text-sm sm:text-base font-semibold text-white/80 tracking-wide">
            Roop Glass Solutions — Glass Facade, Cladding &amp; Roofing Contractor in Mumbai
          </h1>
          <div
            key={`indicator-${animKey}`}
            className="flex items-center gap-3 mb-6 animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <div className={cn("h-px w-10 bg-gradient-to-r", slide.accent)} />
            <span className="text-sm font-medium text-white/50 tracking-[0.2em] uppercase">
              {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Slide title */}
          <h2
            key={`title-${animKey}`}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 leading-[1.05] tracking-tight animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            {slide.title}
          </h2>

          {/* Subtitle */}
          <p
            key={`sub-${animKey}`}
            className={cn(
              "text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r bg-clip-text text-transparent animate-fadeInUp",
              slide.accent
            )}
            style={{ animationDelay: "0.35s" }}
          >
            {slide.subtitle}
          </p>

          {/* Description */}
          <p
            key={`desc-${animKey}`}
            className="text-lg text-white/75 mb-10 max-w-xl leading-relaxed animate-fadeInUp"
            style={{ animationDelay: "0.45s" }}
          >
            {slide.description}
          </p>

          {/* CTA Buttons */}
          <div
            key={`cta-${animKey}`}
            className="flex flex-col sm:flex-row gap-4 animate-fadeInUp"
            style={{ animationDelay: "0.55s" }}
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "bg-gradient-to-r text-white px-8 py-6 text-base font-semibold rounded-xl",
                "hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300",
                slide.accent
              )}
            >
              <Link href={slide.href}>
                {slide.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md px-8 py-6 text-base font-semibold rounded-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>

        {/* Right side — slide navigation & service badges */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-4">
          {slides.map((s, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "group flex items-center gap-3 transition-all duration-500",
                index === currentSlide ? "opacity-100" : "opacity-40 hover:opacity-70"
              )}
              aria-label={`Go to slide ${index + 1}: ${s.title}`}
            >
              <span className={cn(
                "text-sm font-medium text-white transition-all duration-300",
                index === currentSlide ? "translate-x-0" : "translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              )}>
                {s.title}
              </span>
              <div className={cn(
                "rounded-full transition-all duration-500",
                index === currentSlide ? "w-12 h-1.5 bg-gradient-to-r " + s.accent : "w-6 h-1 bg-white/40"
              )} />
            </button>
          ))}
        </div>

        {/* Arrow controls */}
        <div className="absolute right-4 sm:right-8 bottom-20 hidden sm:flex gap-3">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-4 sm:left-8 flex gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-500 ease-out",
                index === currentSlide
                  ? "bg-white w-10"
                  : "bg-white/25 w-2 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
