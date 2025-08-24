"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ContactForm } from "@/components/contact-form"
import { QuoteForm } from "@/components/quote-form"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, MapPin, Clock, MessageCircle, Calculator } from "lucide-react"

function ContactTabs() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("contact")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "quote") {
      setActiveTab("quote")
    }
  }, [searchParams])

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
        <TabsTrigger value="contact" className="flex items-center space-x-2">
          <MessageCircle className="w-4 h-4" />
          <span>Contact Us</span>
        </TabsTrigger>
        <TabsTrigger value="quote" className="flex items-center space-x-2">
          <Calculator className="w-4 h-4" />
          <span>Get Quote</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="contact">
        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send us a Message</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Have a question or need assistance? We'd love to hear from you.
              </p>
            </div>
            <ContactForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="quote">
        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request a Quote</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Get a detailed quote for your glass project. Include as much detail as possible for an accurate
                estimate.
              </p>
            </div>
            <QuoteForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Get in touch with our glass experts for consultations, quotes, or any questions about our services.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Phone</h3>
                <p className="text-slate-600 dark:text-slate-400">+91 9320008279</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">24/7 Immediate Support</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Email</h3>
                <p className="text-slate-600 dark:text-slate-400">roopglass@gmail.com</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Address</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">A1 Business Center, 2nd Floor, Sundar Kapoor Compound,</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Opp Thakur Mall, Dahisar Check Nakka, Mumbai-401107.</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Hours</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Mon-Sat: 9AM-7PM</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Sun: 10AM-5PM</p>
              </CardContent>
            </Card>
          </div>

          {/* Forms Section */}
          <div className="max-w-6xl mx-auto">
            <ContactTabs />
          </div>
        </div>
      </section>
    </div>
  )
}
