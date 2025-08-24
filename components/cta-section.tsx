import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 border-0 shadow-2xl overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

          <CardContent className="relative z-10 p-8 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Get a free consultation and quote for your glass project. Our experts are ready to bring your vision to
              life with premium glass solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <a href="tel:+919320008279" className="flex items-center">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now: +91 9320008279
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
              >
                <Link href="/contact?tab=quote">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="opacity-90">+91 9320008279</p>
                <p className="text-sm opacity-75">Available 24/7</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="opacity-90">roopglass@gmail.com</p>
                <p className="text-sm opacity-75">Quick response guaranteed</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="opacity-90">Instant Support</p>
                <p className="text-sm opacity-75">Chat with our experts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
