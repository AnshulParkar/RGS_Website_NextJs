import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    image: "/assets/Structural_Glazing.png",
    title: "Structural Glazing",
    description: "Advanced structural glazing for sleek and seamless building exteriors.",
    features: ["Spider glazing", "Glass facades", "Point-fixed systems", "High-rise applications"],
  },
  {
    image: "/assets/Aluminium_Cladding.png",
    title: "Aluminium Cladding",
    description: "Premium aluminum cladding for modern and durable architectural finishes.",
    features: ["ACP panels", "Weather resistance", "Fire retardant options", "Low maintenance"],
  },
  {
    image: "/assets/Frameless_Glazing.png",
    title: "Frameless Glazing",
    description: "Minimalist frameless glazing for a clean, modern aesthetic.",
    features: ["Glass walls", "Sliding doors", "Flush fittings", "Clear views"],
  },
  {
    image: "/assets/Polycarbonate_Roofing.png",
    title: "Polycarbonate Roofing",
    description: "Lightweight and UV-resistant roofing for a variety of outdoor spaces.",
    features: ["Translucent sheets", "UV protection", "Impact resistance", "Thermal insulation"],
  },
  {
    image: "/assets/Glass_Roofing.png",
    title: "Glass Roofing",
    description: "Elegant glass roofing solutions that maximize natural lighting.",
    features: ["Laminated panels", "Skylights", "Weather-sealed systems", "Framed and frameless options"],
  },
  {
    image: "/assets/Metal_Roofing.png",
    title: "Metal Roofing",
    description: "Strong and stylish metal roofing for long-lasting protection.",
    features: ["Galvanized sheets", "Color-coated panels", "Heat reflectivity", "Leak-proof joints"],
  },
  {
    image: "/assets/DryStone_Cladding.png",
    title: "Dry Stone Cladding",
    description: "Natural stone finishes for timeless beauty and structural integrity.",
    features: ["Granite and slate", "Rustic texture", "Weather resistance", "Low maintenance"],
  },
  {
    image: "/assets/MS&SSframeWorks.png",
    title: "MS & SS Frame Works",
    description: "Robust frameworks made of mild steel and stainless steel.",
    features: ["Custom fabrication", "Rust resistance", "Powder coating", "Architectural support"],
  },
  {
    image: "/assets/CurtainWall.png",
    title: "Curtain Wall System",
    description: "Elegant curtain wall systems that enhance building aesthetics and efficiency.",
    features: ["Aluminium frames", "Glass infill panels", "Thermal performance", "Seamless exteriors"],
  },
  {
  image: "/assets/unitizedsystem.png",
  title: "Unitized Glazing System",
  description: "Pre-fabricated unitized glazing systems for faster installation and superior quality.",
  features: ["Factory-assembled panels", "Quick on-site installation", "Enhanced thermal insulation", "Minimal joint lines"],
  },
  {
  image: "/images/glassRailing.png",
  title: "Glass Railing",
  description: "Modern glass railing systems offering safety without compromising aesthetics.",
  features: ["Frameless and framed options", "Tempered safety glass", "Stainless steel fittings", "Indoor & outdoor use"],
},
{
    image: "/images/glassPartition.png",
    title: "Glass Partition",
    description: "Elegant glass partitions for offices and homes, enhancing space without barriers.",
    features: ["Sliding and fixed options", "Frosted and clear glass", "Soundproofing options", "Custom designs"],
},
{
    image: "/assets/curvedglass.png",
    title: "Curved Glass",
    description: "Specialized curved glass solutions for unique architectural designs.",
    features: ["Custom shapes", "High precision", "Thermal performance", "Architectural flexibility"],
},

]

export function ServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive glass solutions for every need, from residential to commercial projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 hover:border-blue-500/30"
            >
              <CardHeader className="p-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover mx-auto group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">{service.title}</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300 mt-2">{service.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0 px-6 pb-6">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
