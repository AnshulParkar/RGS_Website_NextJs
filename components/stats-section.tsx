"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { Building2, MapPin, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { LightDecor } from "@/components/light-decor"

const stats = [
  {
    icon: Briefcase,
    value: 20,
    suffix: "+",
    label: "Years in Business",
    accent: "linear-gradient(135deg, #2563eb, #06b6d4)",
    shadow: "rgba(37, 99, 235, 0.55)",
    description: "Glazing, facade, cladding and roofing work in Maharashtra",
  },
  {
    icon: Building2,
    value: 100,
    suffix: "+",
    label: "Clients Served",
    accent: "linear-gradient(135deg, #6366f1, #a855f7)",
    shadow: "rgba(124, 58, 237, 0.5)",
    description: "Corporate, public sector and institutional clients",
  },
  {
    icon: MapPin,
    value: 5,
    suffix: "+",
    label: "Cities Served",
    accent: "linear-gradient(135deg, #f59e0b, #f97316)",
    shadow: "rgba(245, 158, 11, 0.55)",
    description: "Mumbai, Navi Mumbai, Thane, Pune and beyond",
  },
]

function AnimatedCounter({ value, suffix, started }: { value: number; suffix: string; started: boolean }) {
  // Start at the real value so server-rendered HTML (crawlers, no-JS) shows "20+", not "0+".
  const [count, setCount] = useState(value)

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)
    return () => clearInterval(timer)
  }, [value, started])

  return (
    <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300 bg-clip-text text-transparent tracking-tight">
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white/40 to-indigo-50/70 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />

      <LightDecor />

      {/* Subtle decorative circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-slate-100 dark:border-slate-800/30 opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-slate-100 dark:border-slate-800/20 opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "light-stat-card relative rounded-3xl px-6 py-9 text-center group transition-all duration-700",
                started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: `${index * 200}ms`, "--accent-gradient": stat.accent, "--accent-shadow": stat.shadow } as CSSProperties}
            >
              <div className="flex justify-center mb-6">
                <div className="light-icon-tile w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300">
                  <stat.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} started={started} />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-3 mb-1.5">{stat.label}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
