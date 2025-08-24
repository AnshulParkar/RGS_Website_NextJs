"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = 
  [
    {
      id: 1,
      name: "Architect Mr. Garg",
      role: "Architect",
      location: "Navi Mumbai",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "RoopGlass successfully executed ACP facade and glass work for our Navi Mumbai Maha Nagar Palika projects. Highly professional and reliable!",
      project: "ACP Facade & Glass Work",
    },
    {
      id: 2,
      name: "R.K. Agrawal",
      role: "Admin Head",
      location: "Gorai, Mumbai",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "RoopGlass delivered exceptional interior glass work for the Global Pagoda Vipassana Gallery. Truly enhanced the spiritual ambiance of the space.",
      project: "Tourist Attraction & Meditation Center",
    },
    {
      id: 3,
      name: "Mr. Uday Metkar – Delta Tect Engineering",
      role: "Admin Head",
      location: "Mumbai",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "Glass facade work for high-rise buildings is challenging, but RoopGlass handled it with precision and expertise. The quality and finish exceeded expectations.",
      project: "Glass Facade",
    },
    {
      id: 4,
      name: "Dilip Mewada & Associates",
      role: "Owner",
      location: "Mumbai",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "The glass partitions installed by RoopGlass gave our restaurant a modern, open, and welcoming atmosphere. Our customers love the new vibe!",
      project: "Glass Facade Work",
    }
    
    // {
    //   id: 5,
    //   name: "Vikram Singh",
    //   role: "Architect",
    //   location: "Mumbai",
    //   avatar: "/placeholder.svg?height=60&width=60",
    //   rating: 5,
    //   text: "RoopGlass brings architectural visions to life with precision. Their innovative glass solutions and technical expertise make them an invaluable partner in our projects.",
    //   project: "Luxury Villa Design",
    // },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <Quote className="w-12 h-12 text-blue-500 opacity-50" />
              </div>

              <blockquote className="text-lg md:text-xl text-center text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                "{currentTestimonial.text}"
              </blockquote>

              <div className="flex items-center justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={currentTestimonial.avatar || "/placeholder.svg"} alt={currentTestimonial.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    {currentTestimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{currentTestimonial.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {currentTestimonial.role} • {currentTestimonial.location}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{currentTestimonial.project}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-white/30 hover:bg-white/80 dark:hover:bg-slate-800/80"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    index === currentIndex
                      ? "bg-blue-500 w-8 shadow-md"
                      : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 w-3"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-white/30 hover:bg-white/80 dark:hover:bg-slate-800/80"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* All testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  "{testimonial.text.substring(0, 120)}..."
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="font-medium text-slate-900 dark:text-white text-sm">{testimonial.name}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
