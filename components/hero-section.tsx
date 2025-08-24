"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star, Award, Users, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const slides = [
  {
    title: "Glass Facade",
    subtitle: "Transforming Spaces with Modern Elegance",
    description: "We specialize in high-performance glass facade systems that enhance aesthetics, maximize natural light, etc. From Commercial to Residential, our facade work are engineered for durability, style, and functionality.",
    image: "/images/glassFacade.png?height=600&width=800", // replace with actual image path
    cta: "View Our Services"

  },
  {
    title: "Glass Railings",
    subtitle: "Sleek, Safe, and Stylish",
    description: "Our premium glass railings offer a seamless blend of safety and sophistication. Designed for both indoor and outdoor spaces, they provide unobstructed views while maintaining structural strength and elegance. Ideal for balconies, staircases, terraces, and pool areas.",
    image: "/images/glassRailing.png?height=600&width=800", // Replace with actual image path
    cta: "View Our Portfolio"

  },
  {
    title: "Glass Partitions",
    subtitle: "Elegant & Modern Space Dividers",
    description: "Transform your interiors with sleek glass partitions — ideal for offices, homes, and commercial spaces. Stylish, durable, and customized to your needs.",
    image: "/images/glassPartition.png?height=800&width=800", // Replace with actual image path if available
    cta: "Get Quote",

  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 mb-6">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium">Trusted by 100+ customers</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
                {slides[currentSlide].title}
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              {slides[currentSlide].subtitle}
            </h2>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 text-lg"
              >
                <Link href="/services">
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-blue-500/30 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-slate-800/30 px-8 py-4 text-lg"
              >
                <Link href="/portfolio">
                  {/* <Play className="mr-2 w-5 h-5" /> */}
                  Our Portfolio
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">20+</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">100+</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">24/7</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Support</p>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 p-8">
              <img
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt={slides[currentSlide].title}
                className="w-full h-96 object-cover rounded-xl"
              />

              {/* Glassmorphism overlay */}
              <div className="absolute inset-8 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentSlide ? "bg-blue-500 w-8" : "bg-white/40 hover:bg-white/60",
                  )}
                  title={`Go to slide ${index + 1}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
