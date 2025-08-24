"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Clock, Star } from "lucide-react"

const stats = [
  {
    icon: Award,
    value: 20,
    suffix: "+",
    label: "Years Experience",
    description: "Serving customers with excellence",
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "Happy Clients",
    description: "Satisfied customers across Maharashtra",
  },
  {
    icon: Clock,
    value: 100,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful installations delivered",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Customer Rating",
    description: "Based on customer reviews on Justdial",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
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
  }, [value])

  return (
    <span className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-2 mb-1">{stat.label}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
