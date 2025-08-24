import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Building, Wrench, Palette, Shield, Zap, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    image: "/assets/Structural_Glazing.png",
    title: "Structural Glazing",
    description: "Advanced structural glazing for sleek and seamless building exteriors.",
    features: ["Spider glazing", "Glass facades", "Point-fixed systems", "High-rise applications"],
    pricing: "",
    popular: false,
  },
  {
    image: "/assets/Aluminium_Cladding.png",
    title: "Aluminium Cladding",
    description: "Premium aluminum cladding for modern and durable architectural finishes.",
    features: ["ACP panels", "Weather resistance", "Fire retardant options", "Low maintenance"],
    pricing: "",
    popular: false,
  },
  {
    image: "/assets/Frameless_Glazing.png",
    title: "Frameless Glazing",
    description: "Minimalist frameless glazing for a clean, modern aesthetic.",
    features: ["Glass walls", "Sliding doors", "Flush fittings", "Clear views"],
    pricing: "",
    popular: false,
  },
  {
    image: "/assets/Polycarbonate_Roofing.png",
    title: "Polycarbonate Roofing",
    description: "Lightweight and UV-resistant roofing for a variety of outdoor spaces.",
    features: ["Translucent sheets", "UV protection", "Impact resistance", "Thermal insulation"],
    pricing: "",
    popular: false,
  },
  {
    image: "/assets/Glass_Roofing.png",
    title: "Glass Roofing",
    description: "Elegant glass roofing solutions that maximize natural lighting.",
    features: ["Laminated panels", "Skylights", "Weather-sealed systems", "Framed and frameless options"],
    pricing: "",
    popular: false,
  },
  {
    image: "/assets/Metal_Roofing.png",
    title: "Metal Roofing",
    description: "Strong and stylish metal roofing for long-lasting protection.",
    features: ["Galvanized sheets", "Color-coated panels", "Heat reflectivity", "Leak-proof joints"],
    pricing: "",
    popular: false,
  },
  {
    image: "/assets/DryStone_Cladding.png",
    title: "Dry Stone Cladding",
    description: "Natural stone finishes for timeless beauty and structural integrity.",
    features: ["Granite and slate", "Rustic texture", "Weather resistance", "Low maintenance"],
    pricing: "",
    popular: false,
  },
  {
    image: "/assets/MS&SSframeWorks.png",
    title: "MS & SS Frame Works",
    description: "Robust frameworks made of mild steel and stainless steel.",
    features: ["Custom fabrication", "Rust resistance", "Powder coating", "Architectural support"],
    pricing: "",
    popular: false,
  },
  {
    image: "/assets/CurtainWall.png",
    title: "Curtain Wall System",
    description: "Elegant curtain wall systems that enhance building aesthetics and efficiency.",
    features: ["Aluminium frames", "Glass infill panels", "Thermal performance", "Seamless exteriors"],
    pricing: "",
    popular: false,
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Comprehensive glass solutions for every need, from residential installations to commercial projects and
            custom designs.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            <Link href="/contact?tab=quote">
              Get Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative group hover:shadow-xl transition-all duration-300 ${
                  service.popular
                    ? "ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                    : "bg-white/60 dark:bg-slate-800/60"
                } backdrop-blur-sm border border-white/30`}
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    Most Popular
                  </Badge>
                )}

                <CardHeader>
                  {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-500o-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img src={service.image} alt={service.title} className="w-12 h-12 object-cover rounded-lg" />
                  </div> */}
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                    <div className="w-full flex justify-center mb-4">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain rounded-xl shadow-md bg-white dark:bg-slate-900"
                      />
                    </div>
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{service.pricing}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    asChild
                    className={`w-full ${
                      service.popular
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                        : "bg-white/80 dark:bg-slate-700/80 hover:bg-blue-500 hover:text-white"
                    } transition-colors duration-300`}
                  >
                    <Link href="/contact?tab=quote">Get Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
                Our Process
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              From consultation to installation, we ensure a smooth and professional experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", description: "Free on-site consultation and measurement" },
              { step: "02", title: "Design", description: "Custom design and material selection" },
              { step: "03", title: "Manufacturing", description: "Precision manufacturing in our facility" },
              { step: "04", title: "Installation", description: "Professional installation and cleanup" },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{process.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
