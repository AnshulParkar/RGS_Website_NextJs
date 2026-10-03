"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Star, Quote, ChevronLeft, ChevronRight, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LightDecor } from "@/components/light-decor"
import type { Testimonial } from "@/lib/content"

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (testimonials.length < 2) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  if (testimonials.length === 0) return null
  const current = testimonials[currentIndex % testimonials.length]
  const subtitle = [current.role, current.location].filter(Boolean).join(" · ")

  return (
    <section ref={ref} id="testimonials" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 via-white/60 to-sky-50/70 dark:bg-none dark:bg-slate-950" />
      <LightDecor grid={false} shards />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="light-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our <span className="text-brand-gradient">Clients Say</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-4">
            Feedback from architects, contractors and building owners we have worked with.
          </p>
        </div>

        {/* Main testimonial card */}
        <div className={cn(
          "relative max-w-3xl mx-auto transition-all duration-700 delay-200",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Card className="light-gradient-border bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800/60 shadow-xl shadow-blue-500/[0.03]">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-blue-500/20 mb-6" />

              <blockquote className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-8 leading-relaxed font-medium">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="flex items-center mb-6 gap-1" aria-label={`Rated ${current.rating} out of 5`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < current.rating ? "text-amber-400 fill-current" : "text-slate-300 dark:text-slate-600")} />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{current.name}</h4>
                  {subtitle && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
                  )}
                  {current.project && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">{current.project}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          {testimonials.length > 1 && (
          <div className="flex items-center justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    index === currentIndex
                      ? "bg-blue-500 w-8"
                      : "bg-slate-200 dark:bg-slate-700 w-2 hover:bg-slate-300"
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-xl"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/review"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <PenLine className="w-4 h-4" />
              Worked with us? Share your experience
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
