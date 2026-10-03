import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, ArrowRight } from "lucide-react"
import { LightDecor } from "@/components/light-decor"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 animate-gradient" />
          <LightDecor grid={false} orbs={false} beam className="opacity-60" />
          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">Let&apos;s Work Together</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
              Discuss your commercial project
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-blue-100/80 mb-10 leading-relaxed">
              Share your facade, cladding, glass, railing or roofing requirement with Roop Glass Solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-xl px-8 py-6 text-base shadow-xl shadow-black/10 hover:-translate-y-0.5 transition-all">
                <a href="tel:+919320008279">
                  <Phone className="mr-2 w-5 h-5" />
                  Call +91 9320008279
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white font-semibold rounded-xl px-8 py-6 text-base hover:-translate-y-0.5 transition-all">
                <Link href="/contact">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Send an inquiry
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
