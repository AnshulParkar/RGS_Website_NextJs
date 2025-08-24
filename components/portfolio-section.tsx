"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, MapPin } from "lucide-react"

const projects =[
  {
    id: 3,
    title: "Magic Square Malad",
    category: "Commercial",
    location: "Malad, Mumbai",
    date: "2024-01-15",
    image: "/assets/MagicSquareMalad.png",
    description: "Project details here",
    tags: ["glass facade", "commercial", "malad"]
  },
  {
    id: 12,
    title: "AJL Project - Bandra",
    category: "Commercial",
    location: "Bandra, Mumbai",
    date: "2023-11-20",
    image: "/assets/AJLprojectBandra.png",
    description: "Project details here",
    tags: ["facade work", "bandra", "corporate"]
  },
  {
    id: 1,
    title: "Amanora Mall Pune",
    category: "Commercial",
    location: "Pune",
    date: "2022-09-10",
    image: "/assets/AmanoraMallPune.png",
    description: "Project details here",
    tags: ["mall", "retail", "pune"]
  },
  {
    id: 2,
    title: "Income Tax Building",
    category: "Commercial",
    location: "Mumbai",
    date: "2023-02-28",
    image: "/assets/IncomeTaxBuilding.png",
    description: "Project details here",
    tags: ["government", "public building", "mumbai"]
  },
  {
    id: 9,
    title: "Tania Horizon",
    category: "Commercial",
    location: "Thane",
    date: "2024-03-05",
    image: "/assets/TaniaHorizon.png",
    description: "Project details here",
    tags: ["Commercial", "thane", "high-rise"]
  },
  {
    id: 11,
    title: "VVMC",
    category: "Commercial",
    location: "Vasai-Virar",
    date: "2023-05-12",
    image: "/assets/VVMC.png",
    description: "Project details here",
    tags: ["municipal", "vasai-virar", "commercial"]
  },
  {
    id: 4,
    title: "MTDC Kharghar",
    category: "Commercial",
    location: "Kharghar, Navi Mumbai",
    date: "2023-08-18",
    image: "/assets/MTDCkharghar.png",
    description: "Project details here",
    tags: ["tourism", "kharghar", "glass structure"]
  },
  {
    id: 7,
    title: "NMMC Vashi",
    category: "Commercial",
    location: "Vashi, Navi Mumbai",
    date: "2023-04-22",
    image: "/assets/NMMCVashi.png",
    description: "Project details here",
    tags: ["municipal", "vashi", "nmmc"]
  },
  {
    id: 5,
    title: "NMMC Airoli",
    category: "Commercial",
    location: "Airoli, Navi Mumbai",
    date: "2023-06-15",
    image: "/assets/NMMCAiroli.png",
    description: "Project details here",
    tags: ["airoli", "navi mumbai", "facade"]
  },
  {
    id: 10,
    title: "Trupati Balaji",
    category: "Commercial",
    location: "Maharashtra",
    date: "2022-12-01",
    image: "/assets/TrupatiBalaji.png",
    description: "Project details here",
    tags: ["temple", "decorative", "balaji"]
  },
  {
    id: 13,
    title: "SB Chavan Memorial trust - Nanded",
    category: "Commercial",
    location: "Nanded",
    date: "2024-02-10",
    image: "/assets/SBchavanMemorialTrust.png",
    description: "Project details here",
    tags: ["memorial", "nanded", "institution"]
  },
  {
    id: 14,
    title: "Sawant Bunglow - Airoli",
    category: "Commercial",
    location: "Airoli, Navi Mumbai",
    date: "2023-10-05",
    image: "/assets/SawantBunglow.png",
    description: "Project details here",
    tags: ["bungalow", "airoli", "home project"]
  },
  {
    id: 15,
    title: "Global Vipassana Pagoda",
    category: "Commercial",
    location: "Gorai, Mumbai",
    date: "2022-11-11",
    image: "/assets/Pagoda.png",
    description: "Project details here",
    tags: ["spiritual", "pagoda", "glass structure"]
  },
  {
    id: 16,
    title: "Landmark - Borivali",
    category: "Commercial",
    location: "Borivali, Mumbai",
    date: "2024-04-02",
    image: "/assets/Landmark.png",
    description: "Project details here",
    tags: ["borivali", "Commercial", "glass"]
  },
  {
    id: 17,
    title: "TrueEarth - Vikhroli",
    category: "Commercial",
    location: "Vikhroli, Mumbai",
    date: "2024-05-01",
    image: "/assets/TrueEarth.png",
    description: "Project details here",
    tags: ["vikhroli", "eco-friendly", "commercial"]
  }

]


const categories = ["All", "Commercial"]

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Explore our recent projects showcasing innovative glass solutions and exceptional craftsmanship
          </p>

          {/* Category Filter */}
          <div className="flex justify-center space-x-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    : "bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-white/30 hover:bg-white/80 dark:hover:bg-slate-800/80"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 hover:border-blue-500/30"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
                <Badge className="absolute top-4 right-4 bg-blue-500/80 backdrop-blur-sm">{project.category}</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{project.description}</p>

                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.date}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
